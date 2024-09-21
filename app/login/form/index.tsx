"use client";

import { Button, InputField } from "@/app/components";
import { useState } from "react";

function Form({ dataCarrier }: any) {
  const [userData, setUserData] = useState({
    email: "",
    phonenumber: "",
    password: "",
  });

  function handleOnChange(e: { target: { name: string; value: string } }) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const loginInputItems = [
    {
      type: "email",
      label: "Email",
      name: "email",
      value: userData.email,
    },
    {
      type: "password",
      label: "Password",
      name: "password",
      value: userData.password,
    },
    // {
    //   type: "number",
    //   label: "Phonenumber",
    //   name: "phonenumber",
    //   value: userData.phonenumber,
    // },
  ];
  function onSubmit() {
    dataCarrier(userData);
  }
  return (
    <>
    <div className="h-[70dvh] flex items-center justify-center">
      <div className="mx-auto justify-center">
        <h1 className="text-[20px] font-bold text-center">Login</h1>
          {loginInputItems?.map(({ type, label, name, value }, index) => (
            <div key={`user-registration-${index}`} className="w-[400px]">
              <InputField
                className="h-[40px] border-[1px] w-full border-black rounded-[5px]"
                type={type}
                label={label}
                labelStyling=""
                name={name}
                onChange={handleOnChange}
                value={value}
              />
            </div>
          ))}
        <div className="flex w-full mt-5">
          <Button
            className="h-[40px] w-full text-white px-3 rounded-[5px] bg-[#2182b0]"
            onClick={onSubmit}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}

export { Form };
