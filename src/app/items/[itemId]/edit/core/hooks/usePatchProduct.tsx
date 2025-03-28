import { useSnackbarStore } from "@/shared/store/useSnackbarStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useGetProductDetail,
  useUpdateProduct,
} from "../../../core/hooks/useProductDetailQuery";
import { validRules } from "@/app/registration/hooks/regItemHook";
import { productKeys } from "@/shared/utils/queryKeys";
import { useQueryClient } from "@tanstack/react-query";

type ValidFieldType = "name" | "description" | "price" | "tagInput";

export const usePatchProduct = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { openSnackbar } = useSnackbarStore();
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    price: number | string;
    tags: string[];
    images: File[];
    imageUrls: string[];
  }>({
    name: "",
    description: "",
    price: 0,
    tags: [],
    images: [],
    imageUrls: [],
  });

  const [errors, setErrors] = useState({
    name: { isError: false, message: "" },
    description: { isError: false, message: "" },
    price: { isError: false, message: "" },
    tags: { isError: false, message: "" },
  });

  // 폼 초기화 상태를 추적하기 위한 새로운 상태 추가
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  // 이미지 에러 메시지 표시 상태
  const [showMaxImageError, setShowMaxImageError] = useState(false);

  // 태그 입력을 위한 별도의 state
  const [tagInput, setTagInput] = useState("");

  // 기존 상품 데이터 조회
  const { data: productData, isLoading } = useGetProductDetail(id);
  const { mutateAsync: updateProduct } = useUpdateProduct();

  // 기존 데이터로 폼 초기화 - 딱 한번만 초기화하도록 수정
  useEffect(() => {
    if (productData && !isFormInitialized) {
      setFormData({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        tags: productData.tags?.map((tag) => tag.tag) ?? [],
        images: [],
        imageUrls: productData.images ?? [],
      });
      setIsFormInitialized(true);
    }
  }, [productData, isFormInitialized]);

  const handleBlur = (
    field: "name" | "description" | "price" | "tags",
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value.trim();
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleKeyDown = (
    field: "name" | "description" | "price" | "tags",
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      e.key === "Enter" &&
      (field === "name" || field === "price" || field === "tags")
    ) {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const isFormDisabled = () => {
    return (
      !formData.name.trim() ||
      !formData.description.trim() ||
      formData.price === "" ||
      formData.price === 0
    );
  };

  // 유효성 검사 함수
  const validateField = (field: ValidFieldType, value: string) => {
    if (!validRules[field]) return { isError: false, message: "" };

    const isError = validRules[field].validate(value);
    return {
      isError,
      message: isError ? validRules[field].errMsg : "",
    };
  };

  // 입력값 변경 핸들러
  const handleChange = (field: ValidFieldType, value: string) => {
    // 빈 문자열도 허용하도록 수정
    setFormData((prev) => ({
      ...prev,
      [field]: field === "price" ? (value === "" ? "" : Number(value)) : value,
    }));

    const validationResult = validateField(field, value);
    setErrors((prev) => ({
      ...prev,
      [field]: validationResult,
    }));
  };

  // 태그 관련 함수들
  const handleTagInput = (value: string) => {
    setTagInput(value);
    const validationResult = validateField("tagInput", value);
    setErrors((prev) => ({
      ...prev,
      tags: validationResult,
    }));
  };

  // handleTagAdd 함수 수정 - 유효성 검사 결과 확인 후 태그 추가
  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();

      // 유효성 검사 실행
      const validationResult = validateField("tagInput", tagInput);
      if (validationResult.isError) {
        // 유효성 검사 실패 시 태그 추가하지 않고 에러 표시만 함
        setErrors((prev) => ({
          ...prev,
          tags: validationResult,
        }));
        return;
      }

      // 유효성 검사 통과 시에만 태그 추가
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  // 이미지 파일 입력 처리
  const handleImageInput = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.multiple = true;

    fileInput.onchange = (e: Event) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files) return;

      // 최대 3개까지만 허용
      const remainingSlots = 3 - formData.imageUrls.length;
      if (remainingSlots <= 0) {
        setShowMaxImageError(true);
        setTimeout(() => setShowMaxImageError(false), 3000); // 3초 후 에러 메시지 숨김
        return;
      }

      const newFiles = Array.from(files).slice(0, remainingSlots);

      // 파일 크기 체크 (5MB)
      const validFiles = newFiles.filter((file) => {
        if (file.size > 5 * 1024 * 1024) {
          openSnackbar("이미지 크기는 5MB 이하여야 합니다.", "error");
          return false;
        }
        return true;
      });

      // 이미지 URL 생성 및 상태 업데이트
      const newUrls = validFiles.map((file) => URL.createObjectURL(file));

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...validFiles],
        imageUrls: [...prev.imageUrls, ...newUrls],
      }));
    };

    // 이미지가 이미 3개일 때 클릭 시
    if (formData.imageUrls.length >= 3) {
      setShowMaxImageError(true);
      setTimeout(() => setShowMaxImageError(false), 3000); // 3초 후 에러 메시지 숨김
      return;
    }

    fileInput.click();
  };

  // 이미지 삭제 처리
  const handleDeleteImage = (index: number) => {
    setFormData((prev) => {
      // 새로 추가된 이미지인 경우 URL 해제
      if (index >= (productData?.images?.length || 0)) {
        const newImageIndex = index - (productData?.images?.length || 0);
        if (newImageIndex >= 0 && newImageIndex < prev.images.length) {
          URL.revokeObjectURL(prev.imageUrls[index]);
        }
      }

      const newImages = [...prev.images];
      const newUrls = [...prev.imageUrls];

      // 이미지 배열에서 해당 인덱스 제거
      newUrls.splice(index, 1);

      // 새로 추가된 이미지인 경우에만 images 배열에서도 제거
      if (index >= (productData?.images?.length || 0)) {
        const newImageIndex = index - (productData?.images?.length || 0);
        if (newImageIndex >= 0) {
          newImages.splice(newImageIndex, 1);
        }
      }

      return {
        ...prev,
        images: newImages,
        imageUrls: newUrls,
      };
    });
  };

  const handleClickUpdateProduct = async () => {
    if (isFormDisabled()) return;

    try {
      // FormData 객체 생성
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name.trim());
      formDataObj.append("description", formData.description?.trim() || "");
      formDataObj.append("price", Number(formData.price || 0).toString());

      // 태그 추가
      formData.tags.forEach((tag) => {
        formDataObj.append("tags", tag);
      });

      // 기존 이미지 중 유지할 이미지 URL 찾기
      const existingImages = productData?.images || [];
      const keptImages = existingImages.filter((url) =>
        formData.imageUrls.includes(url)
      );

      // 유지할 기존 이미지 URL을 images 키로 추가
      keptImages.forEach((url) => {
        formDataObj.append("images", url);
      });

      // 새로 추가된 이미지 파일 추가
      formData.images.forEach((image) => {
        formDataObj.append("images", image);
      });

      await updateProduct(
        {
          productId: id,
          name: formData.name.trim(),
          description: formData.description?.trim() || "",
          price: Number(formData.price || 0).toString(),
          tags: formData.tags,
          images:
            formData.images.length > 0 || keptImages.length > 0
              ? [...formData.images, ...keptImages] // 새 이미지와 유지할 기존 이미지 모두 포함
              : productData?.images || [], // 이미지 변경이 없으면 기존 이미지 유지
        },
        {
          onSuccess: () => {
            openSnackbar("상품이 수정되었습니다.", "success");
            queryClient.invalidateQueries({
              queryKey: productKeys.all,
            });
            router.push(`/items/${id}`);
          },
        }
      );
    } catch (error: any) {
      console.log("error", error);
      const errorMessage =
        error?.response?.data?.message || "상품 수정에 실패했습니다.";
      openSnackbar(errorMessage, "error");
      router.push(`/items/${id}`);
    }
  };

  return {
    formData,
    tagInput,
    errors,
    isLoading,
    isFormDisabled,
    showMaxImageError,
    handleChange,
    handleBlur,
    handleKeyDown,
    handleTagInput,
    handleTagAdd,
    handleDeleteTag,
    handleImageInput,
    handleDeleteImage,
    handleClickUpdateProduct,
  };
};
