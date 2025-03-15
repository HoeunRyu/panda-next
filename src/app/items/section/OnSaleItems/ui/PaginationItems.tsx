// import arrowLeft from "public/assets/arrow_left.png";
// import arrowRight from "public/assets/arrow_right.png";
import { Button, IconButton, Stack } from "@mui/material";
import { colorChips } from "@/shared/styles/colorChips";
import Image from "next/image";

interface PaginationItemsProps {
  page: number;
  count: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export const PaginationItems: React.FC<PaginationItemsProps> = ({
  page,
  count,
  handleChange,
}) => {
  // 현재 섹션 계산 (1-5, 6-10, 11-15, ...)
  const currentSection = Math.ceil(page / 5);
  const startPage = (currentSection - 1) * 5 + 1;
  const endPage = Math.min(startPage + 4, count);

  // 현재 섹션의 페이지 번호 배열 생성
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  // 이전 섹션으로 이동
  const handlePrevSection = (e: React.ChangeEvent<unknown>) => {
    if (startPage > 1) {
      handleChange(e, startPage - 5);
    }
  };

  // 다음 섹션으로 이동
  const handleNextSection = (e: React.ChangeEvent<unknown>) => {
    if (endPage < count) {
      handleChange(e, startPage + 5);
    }
  };

  return (
    <Stack
      direction="row"
      gap={"4px"}
      justifyContent="center"
      alignItems="center"
    >
      {/* 이전 섹션 버튼 */}
      <IconButton
        onClick={handlePrevSection}
        disabled={startPage <= 1}
        sx={{
          width: "40px",
          height: "40px",
          border: `1px solid ${colorChips.gray200}`,
          borderRadius: "50%",
          backgroundColor: colorChips.white,
          color: colorChips.gray500,
          "&:hover": {
            backgroundColor: colorChips.white,
          },
          "&.Mui-disabled": {
            opacity: 0.5,
          },
        }}
      >
        <Image
          src={"/assets/arrow_left.png"}
          alt="이전 섹션"
          width={16}
          height={16}
        />
      </IconButton>

      {/* 페이지 번호 버튼들 */}
      {visiblePages.map((pageNum) => (
        <Button
          key={pageNum}
          onClick={(e) => handleChange(e, pageNum)}
          variant="outlined"
          sx={{
            width: "40px",
            height: "40px",
            minWidth: "40px",
            padding: 0,
            border: `1px solid ${colorChips.gray200}`,
            borderRadius: "50%",
            backgroundColor:
              pageNum === page ? colorChips.primary100 : colorChips.white,
            color: pageNum === page ? colorChips.white : colorChips.gray500,
            fontFamily: "Pretendard Variable",
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "26px",
            "&:hover": {
              backgroundColor:
                pageNum === page ? colorChips.primary100 : colorChips.white,
              border: `1px solid ${colorChips.gray200}`,
            },
          }}
        >
          {pageNum}
        </Button>
      ))}

      {/* 다음 섹션 버튼 */}
      <IconButton
        onClick={handleNextSection}
        disabled={endPage >= count}
        sx={{
          width: "40px",
          height: "40px",
          border: `1px solid ${colorChips.gray200}`,
          borderRadius: "50%",
          backgroundColor: colorChips.white,
          color: colorChips.gray500,
          "&:hover": {
            backgroundColor: colorChips.white,
          },
          "&.Mui-disabled": {
            opacity: 0.5,
          },
        }}
      >
        <Image
          src={"/assets/arrow_right.png"}
          alt="다음 섹션"
          width={16}
          height={16}
        />
      </IconButton>
    </Stack>
  );
};
