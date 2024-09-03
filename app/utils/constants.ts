import { Bounce } from "react-toastify";

const navPaths = {
  investor: "/investor",
  dealer: "/dealer",
  employee: "/employee",
};

const inputTypes = {
  textarea: "textarea",
  password: "password",
};

const toastKeys: any = {
  position: "top-center",
  autoClose: 1700,
  hideProgressBar: false,
  closeOnClick: false,
  closeButton: false,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  draggable: false,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

const toastTypesKeys = {
  success: "success",
  error: "error",
};

export { inputTypes, navPaths, toastKeys, toastTypesKeys };
