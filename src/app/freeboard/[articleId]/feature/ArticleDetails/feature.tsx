import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import { CircularProgress, Stack } from "@mui/material";
import {
  useDeleteArticle,
  useGetArticleDetail,
} from "../../core/hooks/useArticleDetailQuery";
import { EditEllipsis } from "@/shared/components/EditEllipsis";
import { formatDate } from "@/shared/utils/getFormattedDate";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const ArticleDetails = ({ articleId }: { articleId: string }) => {
  const router = useRouter();
  const { data, isLoading } = useGetArticleDetail(articleId);
  const { mutate: deleteArticle } = useDeleteArticle();

  if (isLoading || !data) {
    return (
      <Stack
        sx={{
          width: "100%",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={30} />
      </Stack>
    );
  }

  const { title, content, favoritesCount, createdAt } = data;
  //FIXME: 아직 user 정보가 없어서 임시 닉네임, 프로필 이미지 디폴트로 설정
  const nickname = "총명한판다";
  const profileImg = "/assets/default_profile.png";
  const formattedDate = formatDate(createdAt);

  const handleUpdate = () => {
    router.push(`/freeboard/${articleId}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteArticle({ articleId });
      router.push("/freeboard");
    }
  };

  return (
    <Stack sx={articleDetailsSx}>
      <Stack sx={articleHeaderSx}>
        <Stack sx={articleTitleSx}>
          <Typo
            className="text20Bold"
            content={title}
            color={colorChips.gray800}
          />
          <EditEllipsis onUpdate={handleUpdate} onDelete={handleDelete} />
        </Stack>
        <Stack sx={userInfoSx}>
          <Stack
            sx={{ flexDirection: "row", alignItems: "center", gap: "16px" }}
          >
            <Image src={profileImg} alt="profile" width={40} height={40} />
            <Stack
              sx={{ flexDirection: "row", alignItems: "center", gap: "8px" }}
            >
              <Typo
                className="text14Medium"
                content={nickname}
                color={colorChips.gray600}
                customStyle={{ whiteSpace: "nowrap" }}
              />
              <Typo
                className="text14Regular"
                content={formattedDate}
                color={colorChips.gray400}
              />
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: { xs: "16px", md: "32px" },
              height: "40px",
              marginRight: { xs: "16px", md: "32px" },
              borderRight: `1px solid ${colorChips.gray200}`,
            }}
          />
          <Stack sx={favoriteCountSx}>
            <Image
              src="/assets/ic_heart_gray5.svg"
              alt="favorite"
              width={32}
              height={32}
              style={{ cursor: "pointer" }}
            />
            <Typo
              className="text16Medium"
              content={favoritesCount.toString()}
              color={colorChips.gray500}
            />
          </Stack>
        </Stack>
      </Stack>
      <Typo
        className="text18Regular"
        content={content}
        color={colorChips.gray900}
      />
    </Stack>
  );
};

const articleDetailsSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "24px",
};

const articleHeaderSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "16px",
  paddingBottom: "16px",
  borderBottom: `1px solid ${colorChips.gray200}`,
};

const articleTitleSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px",
};

const userInfoSx = {
  width: "100%",
  height: "40px",
  flexDirection: "row",
  alignItems: "center",
};

const favoriteCountSx = {
  width: "fit-content",
  height: "40px",
  borderRadius: "35px",
  border: `1px solid ${colorChips.gray200}`,
  padding: "4px 12px",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};
