"use client";

import { Button, InputField } from "@/app/components";
import { hasEmptyString } from "@/app/utils/helpers";
import { useState } from "react";

function Form({ dataCarrier }: any) {
  const [userData, setUserData] = useState({
    // email: "",
    phonenumber: "",
    password: "",
  });

  function handleOnChange(e: { target: { name: string; value: string } }) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const loginInputItems = [
    // {
    //   type: "email",
    //   label: "Email",
    //   name: "email",
    //   value: userData.email,
    // },
    {
      type: "number",
      label: "Phone Number",
      name: "phonenumber",
      value: userData.phonenumber,
    },
    {
      type: "password",
      label: "Password",
      name: "password",
      value: userData.password,
    },
  ];
  function onSubmit() {
    dataCarrier(userData);
  }

  const isEmptyFields = hasEmptyString(userData);

  return (
    <>
      <div className="h-[70dvh] flex items-center justify-center">
        <div className="mx-auto justify-center">
          <h1 className="text-[20px] font-bold text-center">Login</h1>
          {loginInputItems?.map(({ type, label, name, value }, index) => (
            <div key={`user-registration-${index}`} className="w-[400px] my-5">
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
              className={`h-[50px] ${
                isEmptyFields
                  ? "opacity-40 cursor-default"
                  : "opacity-100 cursor-pointer"
              } w-full text-white px-3 rounded-[5px] bg-[#2182b0]`}
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
