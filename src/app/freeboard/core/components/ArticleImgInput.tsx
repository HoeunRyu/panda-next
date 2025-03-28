import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import { Stack } from "@mui/material";
import Image from "next/image";

interface ArticleImgInputProps {
  onClickFileInput: () => void;
  imageUrl?: string;
  onClickDeleteImg: () => void;
  showMaxImageError: boolean;
}

export const ArticleImgInput: React.FC<ArticleImgInputProps> = ({
  onClickFileInput,
  imageUrl,
  onClickDeleteImg,
  showMaxImageError,
}) => {
  // 이미지 URL 포맷팅 함수
  const formatImageUrl = (url: string) => {
    // 이미 http로 시작하거나 blob으로 시작하는 URL은 그대로 사용
    if (url.startsWith("http") || url.startsWith("blob")) {
      return url;
    }
    // 그 외의 경우 서버 URL 추가
    return `https://panda-prisma.onrender.com${url}`;
  };

  return (
    <Stack sx={{ width: "100%", flexDirection: "column", gap: "12px" }}>
      <Typo
        content="이미지"
        className="text18Bold"
        color={colorChips.gray800}
      />
      <Stack direction="row" gap={"24px"}>
        <Stack sx={regImgInputSx} onClick={onClickFileInput}>
          <Image
            src={"/assets/ic_plus.svg"}
            alt="이미지 등록"
            width={48}
            height={48}
          />
          <Typo
            className="text16Regular"
            color={colorChips.gray400}
            content="이미지 등록"
            customStyle={{ textAlign: "center" }}
          />
        </Stack>
        {imageUrl && (
          <Stack sx={regImgSx}>
            <img
              src={formatImageUrl(imageUrl)}
              alt="게시글 이미지"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px",
              }}
              onError={(e) => {
                e.currentTarget.src = "/assets/default_item.png";
              }}
            />
            <Image
              src={"/assets/ic_delete_circle.svg"}
              alt="이미지 삭제"
              width={24}
              height={24}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                cursor: "pointer",
              }}
              onClick={onClickDeleteImg}
            />
          </Stack>
        )}
      </Stack>
      {showMaxImageError && (
        <Typo
          className="text16Regular"
          color={colorChips.error}
          content="*이미지는 1개만 등록 가능합니다."
        />
      )}
    </Stack>
  );
};

const regImgInputSx = {
  width: { xs: "168px", md: "282px" },
  height: { xs: "168px", md: "282px" },
  borderRadius: "12px",
  backgroundColor: colorChips.gray100,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  cursor: "pointer",
  flexShrink: 0,
};

const regImgSx = {
  position: "relative",
  width: { xs: "168px", md: "282px" },
  height: { xs: "168px", md: "282px" },
  borderRadius: "12px",
  backgroundColor: colorChips.gray100,
  flexShrink: 0,
};
