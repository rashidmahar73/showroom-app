"use client";

import { useEffect, useState } from "react";
import { UseLazyApiCall } from "../hooks";
import { Form } from "./form";
import { toastHandler } from "../utils/helpers";
import { toastTypesKeys } from "../utils/constants";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";

function Login() {
  const router = useRouter();
  const [getData, { data: loginData }] = UseLazyApiCall({
    url: "login",
    method: "POST",
  }) as any;

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(true);
      return;
    }
    if (token) {
      router.push("/dashboard");
      return;
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  async function dataCarrier(userData: any) {
    const userDataDetails = {
      email: userData.email,
      // phonenumber:Number(userData.phonenumber),
      password: userData.password,
    };

    getData({ params: userDataDetails });
  }

  useEffect(() => {
    if (loginData?.status === 200) {
      toastHandler(loginData.message, toastTypesKeys.success);
      setTimeout(() => {
        localStorage.setItem("token", loginData?.token);
        router.push(`/dashboard`);
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
