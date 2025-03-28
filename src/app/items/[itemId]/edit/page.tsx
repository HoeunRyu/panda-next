"use client";

import { Typo } from "@/shared/Typo/Typo";
import { colorChips } from "@/shared/styles/colorChips";
import { CommonLayout } from "@/shared/layout/CommonLayout";
import { useParams, useRouter } from "next/navigation";
import {
  CircularProgress,
  InputBase,
  FormControl,
  Stack,
  Button,
  Input,
} from "@mui/material";
import { InputErrorMsg } from "@/shared/components/Input/InputErrorMsg";
import Image from "next/image";
import { usePatchProduct } from "./core/hooks/usePatchProduct";
import { RegImgInput } from "@/app/registration/ui/RegImgInput";

export default function Page() {
  const router = useRouter();
  const { itemId } = useParams();
  const id = Array.isArray(itemId) ? itemId[0] : itemId;

  // id가 없으면 early return
  if (!id) {
    router.push("/items");
    return null;
  }

  const namePlaceholder = "상품명을 입력해주세요";
  const descriptionPlaceholder = "상품 소개를 입력해주세요";
  const pricePlaceholder = "판매 가격을 입력해주세요";
  const tagsPlaceholder = "태그를 입력해주세요";

  const {
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
  } = usePatchProduct({ id });

  if (isLoading) {
    return (
      <Stack
        sx={{
          width: "100%",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={40} />
      </Stack>
    );
  }

  return (
    <CommonLayout>
      <Stack sx={patchProductContainerStyle}>
        <Stack sx={patchProductHeaderStyle}>
          <Typo
            content="상품 수정하기"
            className="text20Bold"
            color={colorChips.gray800}
          />
          <Button
            variant="contained"
            sx={articlePostBtnStyle}
            disabled={isFormDisabled()}
            onClick={handleClickUpdateProduct}
          >
            수정
          </Button>
        </Stack>

        <Stack sx={patchProductFormStyle}>
          <Stack sx={patchProductFormItemStyle}>
            <RegImgInput
              onClickFileInput={handleImageInput}
              images={formData.imageUrls}
              onClickDeleteImg={handleDeleteImage}
              showMaxImageError={showMaxImageError}
            />
          </Stack>
          <Stack sx={patchProductFormItemStyle}>
            <Typo
              content="상품명"
              className="text18Bold"
              color={colorChips.gray800}
            />
            <FormControl
              variant="filled"
              sx={{
                ...InputBoxStyle,
                ...(errors.name.isError && {
                  border: `1px solid ${colorChips.error}`,
                }),
              }}
            >
              <Input
                disableUnderline
                placeholder={namePlaceholder}
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={(e) => handleBlur("name", e)}
                onKeyDown={(e) => handleKeyDown("name", e)}
                sx={placeholderStyle}
                error={errors.name.isError}
              />
            </FormControl>
            {errors.name.isError && (
              <InputErrorMsg message={errors.name.message} />
            )}
          </Stack>
          <Stack sx={patchProductFormItemStyle}>
            <Typo
              content="상품 소개"
              className="text18Bold"
              color={colorChips.gray800}
            />
            <FormControl
              variant="filled"
              sx={{
                ...descriptionInputBoxStyle,
                ...(errors.description.isError && {
                  border: `1px solid ${colorChips.error}`,
                }),
              }}
            >
              <InputBase
                fullWidth
                multiline
                minRows={3}
                maxRows={10}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                onBlur={(e) => handleBlur("description", e)}
                placeholder={descriptionPlaceholder}
                sx={placeholderStyle}
                error={errors.description.isError}
              />
            </FormControl>
            {errors.description.isError && (
              <InputErrorMsg message={errors.description.message} />
            )}
          </Stack>

          <Stack sx={patchProductFormItemStyle}>
            <Typo
              content="판매 가격"
              className="text18Bold"
              color={colorChips.gray800}
            />
            <FormControl
              variant="filled"
              sx={{
                ...InputBoxStyle,
                ...(errors.price.isError && {
                  border: `1px solid ${colorChips.error}`,
                }),
              }}
            >
              <Input
                disableUnderline
                type="number"
                placeholder={pricePlaceholder}
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                onBlur={(e) => handleBlur("price", e)}
                onKeyDown={(e) => handleKeyDown("price", e)}
                sx={placeholderStyle}
                error={errors.price.isError}
              />
            </FormControl>
            {errors.price.isError && (
              <InputErrorMsg message={errors.price.message} />
            )}
          </Stack>

          <Stack sx={patchProductFormItemStyle}>
            <Typo
              content="태그"
              className="text18Bold"
              color={colorChips.gray800}
            />
            <FormControl
              variant="filled"
              sx={{
                ...InputBoxStyle,
                ...(errors.tags.isError && {
                  border: `1px solid ${colorChips.error}`,
                }),
              }}
            >
              <Input
                disableUnderline
                placeholder={tagsPlaceholder}
                value={tagInput}
                onChange={(e) => handleTagInput(e.target.value)}
                onKeyDown={handleTagAdd}
                sx={placeholderStyle}
                error={errors.tags.isError}
              />
            </FormControl>
            {errors.tags.isError && (
              <InputErrorMsg message={errors.tags.message} />
            )}
            {formData.tags.length > 0 && (
              <Stack
                direction="row"
                alignItems="center"
                gap="12px"
                flexWrap="wrap"
                sx={{ mt: 1 }}
              >
                {formData.tags.map((tag) => (
                  <Stack key={tag} sx={tagStyle}>
                    <Typo
                      content={`#${tag}`}
                      className="text16Regular"
                      color={colorChips.gray800}
                    />
                    <Image
                      src="/assets/chip_delete_icon.png"
                      alt="delete tag"
                      width={24}
                      height={24}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteTag(tag)}
                    />
                  </Stack>
                ))}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </CommonLayout>
  );
}

const tagStyle = {
  backgroundColor: colorChips.gray100,
  borderRadius: "26px",
  padding: "6px 12px",
  width: "fit-content",
  height: "36px",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const patchProductContainerStyle = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  paddingX: { xs: "16px", sm: "24px" },
  pt: { xs: "16px", md: "40px" },
  pb: "100px",
  gap: { xs: "24px", sm: "32px" },
};

const patchProductHeaderStyle = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

const articlePostBtnStyle = {
  width: "fit-content",
  height: "42px",
  padding: "12px 23px",
  borderRadius: "8px",
  backgroundColor: colorChips.primary100,
  fontFamily: "Pretendard",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "26px",
  color: colorChips.gray100,
} as const;

const patchProductFormStyle = {
  width: "100%",
  flexDirection: "column",
  gap: { xs: "16px", md: "24px" },
} as const;

const patchProductFormItemStyle = {
  width: "100%",
  flexDirection: "column",
} as const;

const InputBoxStyle = {
  width: "100%",
  height: "56px",
  padding: "16px 24px",
  mt: "12px",
  backgroundColor: colorChips.gray100,
  borderRadius: "12px",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
};

const descriptionInputBoxStyle = {
  width: "100%",
  height: "fit-content",
  minHeight: "282px",
  padding: "16px 24px",
  mt: "12px",
  backgroundColor: colorChips.gray100,
  borderRadius: "12px",
  border: "none",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  "& .MuiInputBase-input": {
    padding: 0,
    margin: 0,
  },
  "& .MuiInputBase-root": {
    borderRadius: "26px",
  },
};

const placeholderStyle = {
  color: colorChips.gray600,
  fontFamily: "Pretendard",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "26px",
  flex: 1,
  wordBreak: "break-word",
  "& .MuiInputBase-input": {
    padding: "10px 0",
    overflowY: "auto",
  },
  border: "none",
  padding: 0,
  margin: 0,
};
