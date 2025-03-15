"use client";

import { useSnackbarStore } from "@/shared/store/useSnackbarStore";
import { Alert, Snackbar, SxProps } from "@mui/material";
import { colorChips } from "../../styles/colorChips";

/**
 * 스낵바 컴포넌트
 * @description 전역 상태로 메시지를 전달받아 상태변경에 따라 스낵바 노출
 * @returns 스낵바 컴포넌트
 */
export const SnackbarAlert = () => {
  const { isSnackbarOpened, snackbarType, SnackbarMessage, closeSnackbar } =
    useSnackbarStore();

  return (
    <Snackbar
      open={isSnackbarOpened}
      autoHideDuration={1500}
      onClose={() => closeSnackbar()}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ zIndex: 10000, mt: "100px" }}
      TransitionProps={{
        onExited: closeSnackbar,
      }}
    >
      <Alert
        severity={snackbarType}
        sx={snackbarType === "success" ? successSnackbarSx : errorSnackbarSx}
      >
        {SnackbarMessage}
      </Alert>
    </Snackbar>
  );
};

const snackbarBaseSx: SxProps = {
  width: "fit-content",
  minWidth: "300px",
  height: "fit-content",
  minHeight: "54px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Pretendard",
  fontSize: "18px",
  fontWeight: 500,
  lineHeight: "150%",
  padding: "15px 10px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.1)",
};

const errorSnackbarSx: SxProps = {
  ...snackbarBaseSx,
  backgroundColor: colorChips.gray50,
  color: colorChips.gray900,
  "& .MuiAlert-icon": {
    color: colorChips.error,
  },
};

const successSnackbarSx: SxProps = {
  ...snackbarBaseSx,
  backgroundColor: colorChips.gray50,
  color: colorChips.gray900,
  "& .MuiAlert-icon": {
    color: colorChips.primary100,
  },
};
