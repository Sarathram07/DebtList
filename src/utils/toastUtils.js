import { toast } from "react-toastify";

const baseOptions = {
  position: "bottom-center",
};

export const showSuccessToast = (message, options = {}) => {
  toast(message, {
    type: "success",
    ...baseOptions,
    ...options,
  });
};

export const showErrorToast = (message, options = {}) => {
  console.log("Error toast message:", message);
  toast(message, {
    type: "error",
    ...baseOptions,
    ...options,
  });
};

export const showWarningToast = (message, options = {}) => {
  toast(message, {
    type: "warning",
    ...baseOptions,
    ...options,
  });
};
