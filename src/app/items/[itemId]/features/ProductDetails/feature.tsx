import { colorChips } from "@/shared/styles/colorChips";
import { CircularProgress, Stack } from "@mui/material";
import {
  useDeleteCodeitProduct,
  useGetCodeitProductDetail,
} from "../../core/hooks/useProductDetailQuery";
import { formatDate } from "@/shared/utils/getFormattedDate";
import { useRouter } from "next/navigation";
import { ProductImage } from "./core/components/ProductImage";
import { ProductHeader } from "./core/components/ProductHeader";
import { ProductDesc } from "./core/components/ProductDesc";
import { ProductWriterInfo } from "./core/components/ProductWriterInfo";
import { useProductFavoriteHook } from "@/app/items/core/hooks/useProductFavoriteHook";
import { useState } from "react";
import { DeleteItemModal } from "@/shared/components/Modal/DeleteItemModal";
import { useSnackbarStore } from "@/shared/store/useSnackbarStore";

export const ProductDetails = ({ itemId }: { itemId: string }) => {
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { data, isLoading } = useGetCodeitProductDetail(itemId);
  const { mutateAsync: deleteProduct } = useDeleteCodeitProduct();
  const { openSnackbar } = useSnackbarStore();
  const { isFavorite, handleToggleFavorite } = useProductFavoriteHook({
    productId: itemId,
    initialFavorite: data?.isFavorite ?? false,
  });

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

  const {
    name,
    description,
    price,
    images,
    tags,
    favoriteCount,
    ownerNickname,
    createdAt,
  } = data;

  // api에서 상품 작성자 프로필이미지를 안보내고 있어서 디폴트 이미지 사용
  const defaultProfileImg = "/assets/default_profile.png";
  const formattedDate = formatDate(createdAt);
  const formattedPrice = `${new Intl.NumberFormat("ko-KR").format(price)}원`;

  const handleUpdate = () => {
    router.push(`/items/${itemId}/edit`);
  };

  const handleDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct({ productId: itemId });
      openSnackbar("상품이 삭제되었습니다.", "success");
      router.push("/items");
    } catch (error: any) {
      openSnackbar(error.message, "error");
    } finally {
      setOpenDeleteModal(false);
    }
  };

  return (
    <>
      <Stack sx={productDetailsSx}>
        <ProductImage images={images} />
        <Stack sx={productContentSx}>
          <ProductHeader
            name={name}
            formattedPrice={formattedPrice}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
          <ProductDesc description={description} tags={tags} />
          <ProductWriterInfo
            defaultProfileImg={defaultProfileImg}
            ownerNickname={ownerNickname}
            formattedDate={formattedDate}
            favoriteCount={favoriteCount}
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
        </Stack>
      </Stack>
      <DeleteItemModal
        modalTitle="정말로 상품을 삭제하시겠어요?"
        openModal={openDeleteModal}
        handleCloseModal={handleCloseDeleteModal}
        handleClickDelete={handleConfirmDelete}
      />
    </>
  );
};

const productDetailsSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: { xs: "column", sm: "row" },
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: { xs: "16px", md: "24px" },
  paddingBottom: { xs: "24px", sm: "32px", md: "40px" },
  borderBottom: `1px solid ${colorChips.gray200}`,
};

const productContentSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};
