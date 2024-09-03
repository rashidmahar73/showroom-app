import { toast } from "react-toastify";
import { toastKeys } from "./constants";

function toastHandler(message: string, type: string) {
  if (message) {
    toast(message, { ...toastKeys, type: type });
  }
}

export { toastHandler };
