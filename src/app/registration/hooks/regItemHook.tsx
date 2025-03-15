import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { RegItemInputFields, ValidKey } from "../type";
import { CodeitProduct } from "@/shared/types/codeitApiType";
import { postCodeitProductAPI } from "../services/createCodeitItemApi";
import { useSnackbarStore } from "@/shared/store/useSnackbarStore";
import { codeitItemKeys } from "@/shared/utils/queryKeys";
import { useQueryClient } from "@tanstack/react-query";

//XXX:
//1. input에서 받은 value를 body에 일단 담는다.
//2. body 업데이트되면 useCallback이 돌면서 리렌더링.
//3. 그때 유효성 검사 함수를 타면서 에러 ui보여주기
//4. 모든 필수 필드에 유효한 값이 있을 떄 등록 버튼 활성화

//input 유효성 검사 규칙
//validate true일때 error
export const validRules: {
  [key in ValidKey]: {
    validate: (value: string) => boolean;
    errMsg: string;
  };
} = {
  name: {
    validate: (name: string) => name.length > 10,
    errMsg: "10자 이내로 입력해주세요",
  },
  description: {
    validate: (desc: string) => {
      if (desc === "") {
        return false; //에러 났다가 다시 지웠을 때 에러 메시지 없애줌
      }
      if (desc.length < 10 || desc.length > 100) {
        return true;
      }
      return false;
    },
    errMsg: "10자 이상, 100자 이내로 입력해주세요",
  },
  price: {
    validate: (price: string) => {
      const numberPrice = Number(price);
      return isNaN(numberPrice) || numberPrice === 0;
    },
    errMsg: "1원 이상 숫자로 입력해주세요",
  },
  tagInput: {
    validate: (tag: string) => tag.length > 5,
    errMsg: "5글자 이내로 입력해주세요",
  },
};

interface UseRegItemState {
  name: string;
  description?: string; //초기값에 ""넣으면 바로 에러 걸리는 조건이라 옵셔널로 줌
  price?: string;
  tagInput: string;
  tags: string[];
}

export const useRegItem = () => {
  const [body, setBody] = useState<UseRegItemState>({
    name: "",
    tagInput: "",
    tags: [],
  });
  const router = useRouter();
  const { openSnackbar } = useSnackbarStore();
  const queryClient = useQueryClient();

  //req보낼 body 업데이트
  const updateBody = useCallback(
    (field: ValidKey, value: string | string[]): void => {
      setBody((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  //body.tags 배열 업데이트
  const updateTags = useCallback(
    (newTag: string): void => {
      if (!newTag || body.tags.includes(newTag)) return; //빈 문자열, 중복태그 저장x

      //업데이트 하기 전에 tagInput field로 유효성 검사해서 통과한 것만 body의 tags 배열에 추가, 태그칩 생성하기
      const isValid = !validRules.tagInput.validate(newTag);
      const updatedTags = isValid ? [...body.tags, newTag] : [...body.tags];

      setBody((prev) => ({
        ...prev,
        tags: updatedTags,
        tagInput: newTag,
      }));
    },
    [body.tags]
  );

  //태그칩 x아이콘 클릭 시 삭제
  const deleteTag = useCallback(
    (clickedTag: string): void => {
      const updatedTags = body.tags.filter((tag) => tag !== clickedTag);
      setBody((prev) => ({ ...prev, tags: updatedTags }));
    },
    [body.tags]
  );

  //input value 유효성 검사
  const isInputValid = (
    fieldName: ValidKey
  ): {
    isError: boolean;
    errMsg: string;
  } => {
    const rule = validRules[fieldName];
    const value = body[fieldName];

    //초기 기본값
    if (value === undefined) {
      return {
        isError: false,
        errMsg: "",
      };
    }

    //현재 업데이트된 body의 value 유효성 검사하여 에러 여부와 메시지 전달, ui 구현에 사용
    return {
      isError: rule.validate(value),
      errMsg: rule.errMsg,
    };
  };

  //최신 body로 post api 요청
  const usePostItem = useCallback(async (): Promise<void> => {
    try {
      const { name, description, price, tags } = body;

      // XXX: 코드잇 상품 등록 api로 수정
      const priceNumber = Number(price);
      const descriptionString = description ?? "";
      const reqBody = {
        name,
        description: descriptionString,
        price: priceNumber,
        tags,
        images: [], // XXX: 추후 이미지 업로드 기능 추가 시 사용. 필수 필드라서 현재는 빈 배열로 전달
      };
      // const response: Product = await createItemAPI(reqBody);
      const response: CodeitProduct = await postCodeitProductAPI(reqBody);
      const itemId = response.id;
      queryClient.invalidateQueries({ queryKey: codeitItemKeys.all });
      router.push(`/items/${itemId}`);
    } catch (error: any) {
      if (error?.response.data.message === "Unauthorized") {
        openSnackbar("로그인 후 이용해주세요.", "error");
        router.push("/login");
      } else {
        openSnackbar("다시 시도해주세요.", "error");
      }
      throw error;
    }
  }, [body]);

  // 등록 버튼 활성화 함수
  const isFormDisabled = useCallback((): boolean => {
    const { name, description, price } = body;
    const {
      name: nameRule,
      description: descRule,
      price: priceRule,
    } = validRules;

    const isNameError = !name || nameRule.validate(name);
    const isDescError = !description || descRule.validate(description);
    const isPriceError = !price || priceRule.validate(price);

    const hasAllRequiredFields = Boolean(name && description && price);
    const isDisabled =
      isNameError || isDescError || isPriceError || !hasAllRequiredFields;

    // console.log("=========================");
    // console.log("모든 필드 유효성 검사: ", isDisabled);
    // console.log("=========================");

    //필수 필드가 모두 유효할 때 true
    return isDisabled;
  }, [body]);

  const inputFields: RegItemInputFields[] = [
    {
      label: "상품명",
      placeholder: "상품명을 입력해주세요",
      type: "text",
      field: "name",
      onInput: (value: string) => updateBody("name", value),
    },
    {
      label: "상품 소개",
      placeholder: "상품 소개를 입력해주세요",
      type: "textarea",
      field: "description",
      onInput: (value: string) => updateBody("description", value),
    },
    {
      label: "판매가격",
      placeholder: "판매 가격을 입력해주세요",
      type: "text",
      field: "price",
      onInput: (value: string) => updateBody("price", value),
    },
    {
      label: "태그",
      placeholder: "태그를 입력해주세요",
      type: "text",
      field: "tagInput",
      onInput: (value: string) => updateTags(value),
    },
  ];

  return {
    body,
    setBody,
    updateTags,
    deleteTag,
    updateBody,
    isInputValid,
    usePostItem,
    isFormDisabled,
    validRules,
    inputFields,
  };
};
