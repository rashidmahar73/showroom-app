import { toast } from "react-toastify";
import { toastKeys } from "./constants";

function toastHandler(message: string, type: string) {
  if (message) {
    toast(message, { ...toastKeys, type: type });
  }
}

function hasEmptyString(obj: any) {
  return Object.values(obj).some((value) => value === "");
}

export { toastHandler, hasEmptyString };
