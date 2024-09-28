"use client";

import { useEffect} from "react";
import { UseLazyApiCall } from "../hooks";
import { Form } from "./form";
import { toastHandler } from "../utils/helpers";
import { toastTypesKeys } from "../utils/constants";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { useUser } from "../providers";

function Login() {
  const router = useRouter();

  const { setUser } = useUser();

  const [getData, { data: loginData }] = UseLazyApiCall({
    url: "users/login",
    method: "POST",
  }) as any;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/users");
      return;
    }
  }, []);

  async function dataCarrier(userData: any) {
    const userDataDetails = {
      // email: userData.email,
      phonenumber: userData.phonenumber,
      password: userData.password,
    };

    await getData({ params: userDataDetails });
  }

  useEffect(() => {
    if (loginData?.status === 200) {
      toastHandler(loginData?.message, toastTypesKeys.success);
      setUser({ userID: loginData?.user?.id });
      setTimeout(() => {
        localStorage.setItem("token", loginData?.token);
        localStorage.setItem("userID", loginData?.user?.id);
        router.push(`/users`);
        return;
      }, 3000);
      return;
    }
    if (loginData?.status === 401) {
      toastHandler(loginData.message, toastTypesKeys.error);
      return;
    }
  }, [loginData]);

  return (
    <>
      <ToastContainer />
      <Form dataCarrier={dataCarrier} />
    </>
  );
}

export default Login;
