import { useSnackbarStore } from "@/shared/store/useSnackbarStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useGetCodeitProductDetail,
  useUpdateCodeitProduct,
} from "../../../core/hooks/useProductDetailQuery";
import { validRules } from "@/app/registration/hooks/regItemHook";

type ValidFieldType = "name" | "description" | "price" | "tagInput";

export const usePatchCodeitProduct = ({ id }: { id: string }) => {
  const router = useRouter();
  const { openSnackbar } = useSnackbarStore();
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    price: number | string;
    tags: string[];
    image: string[];
  }>({
    name: "",
    description: "",
    price: 0,
    tags: [],
    image: [],
  });

  const [errors, setErrors] = useState({
    name: { isError: false, message: "" },
    description: { isError: false, message: "" },
    price: { isError: false, message: "" },
    tags: { isError: false, message: "" },
  });

  // 폼 초기화 상태를 추적하기 위한 새로운 상태 추가
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  // 태그 입력을 위한 별도의 state
  const [tagInput, setTagInput] = useState("");

  // 기존 상품 데이터 조회
  const { data: productData, isLoading } = useGetCodeitProductDetail(id);
  const { mutateAsync: updateProduct } = useUpdateCodeitProduct();

  // 기존 데이터로 폼 초기화 - 딱 한번만 초기화하도록 수정
  useEffect(() => {
    if (productData && !isFormInitialized) {
      setFormData({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        tags: productData.tags,
        image: productData.images,
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

  const handleClickUpdateProduct = async () => {
    if (isFormDisabled()) return;

    try {
      await updateProduct(
        {
          productId: id,
          name: formData.name.trim(),
          description: formData.description?.trim() || "",
          price: Number(formData.price || 0),
          tags: formData.tags,
          images: productData?.images || [],
        },
        {
          onSuccess: () => {
            openSnackbar("상품이 수정되었습니다.", "success");
            router.push(`/items/${id}`);
          },
        }
      );
    } catch (error: any) {
      console.log("error", error);
      const errorMessage =
        error?.response?.data?.message || "상품 수정에 실패했습니다.";
      openSnackbar(errorMessage, "error"); // 본인 상품만 수정할 수 있습니다. 에러 메시지 그대로 표시
      router.push(`/items/${id}`);
    }
  };

  return {
    formData,
    tagInput,
    errors,
    isLoading,
    isFormDisabled,
    handleChange,
    handleBlur,
    handleKeyDown,
    handleTagInput,
    handleTagAdd,
    handleDeleteTag,
    handleClickUpdateProduct,
  };
};
