import { EditEllipsis } from "@/shared/components/EditEllipsis";
import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import { Stack } from "@mui/material";

interface ProductContentsProps {
  name: string;
  formattedPrice: string;
  handleUpdate: () => void;
  handleDelete: () => void;
}

export const ProductHeader = ({
  name,
  formattedPrice,
  handleUpdate,
  handleDelete,
}: ProductContentsProps) => {
  return (
    <Stack sx={productHeaderSx}>
      <Stack sx={productTitleSx}>
        <Typo
          className="productName"
          content={name}
          color={colorChips.gray800}
        />
        <Typo
          className="productPrice"
          content={formattedPrice}
          color={colorChips.gray800}
        />
      </Stack>
      <EditEllipsis onUpdate={handleUpdate} onDelete={handleDelete} />
    </Stack>
  );
};

const productHeaderSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "16px",
  paddingBottom: "16px",
  borderBottom: `1px solid ${colorChips.gray200}`,
};

const productTitleSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "8px",
};
