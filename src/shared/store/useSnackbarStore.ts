import { createStore } from "./zustand/createStore";

interface SnackbarState {
  isSnackbarOpened: boolean;
  snackbarType: "success" | "error";
  SnackbarMessage: string;
  openSnackbar: (message: string, type?: "success" | "error") => void;
  closeSnackbar: () => void;
}

export const useSnackbarStore = createStore<SnackbarState>((set) => ({
  isSnackbarOpened: false,
  snackbarType: "success",
  SnackbarMessage: "",
  openSnackbar: (message: string, type: "success" | "error" = "success") =>
    set({
      isSnackbarOpened: true,
      SnackbarMessage: message,
      snackbarType: type,
    }),
  closeSnackbar: () =>
    set((state) => ({
      isSnackbarOpened: false,
      SnackbarMessage: state.SnackbarMessage,
      snackbarType: state.snackbarType,
    })),
}));
