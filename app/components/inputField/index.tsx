"use client";

import { useState } from "react";
import { inputTypes } from "@/app/utils/constants";
import { ConditionalRenderer } from "../conditionalRenderer";
import { EyeOpenIcon, EyeCloseIcon } from "@/app/icons";

type InputFieldT = {
  parentClass: string;
  className: string;
  type: string;
  label: string;
  labelStyling: string;
  name:string;
  onChange:(e: { target: { name: string; value: string } })=>void;
  value:any;
};

function InputField({
  parentClass,
  className,
  type,
  label,
  labelStyling,
  name,
  onChange,
  value,
}: InputFieldT) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  if (type === inputTypes.textarea)
    return (
      <TextArea
        parentClass={parentClass}
        className={className}
        labelStyling={labelStyling}
        label={label}
        value={value}
        name={name}
        handleOnChange={onChange}
      />
    );

  const modifiedType =
    type?.toLowerCase() === inputTypes.password
      ? isShowPassword === false
        ? inputTypes.password
        : "text"
      : type;

  function showPasswordHandle() {
    setIsShowPassword(!isShowPassword);
  }

  return (
    <div className={parentClass}>
      <label className={labelStyling}>{label}</label>
      <div className="relative flex items-center">
        <input
          type={modifiedType}
          className={`px-2 ${className}` || "h-[40px]"}
          name={name}
          onChange={onChange}
          value={value}
        />
        <ConditionalRenderer
          condition={type?.toLowerCase() === inputTypes.password}
        >
          <span
            className="cursor-pointer absolute right-3"
            onClick={showPasswordHandle}
          >
            {isShowPassword === true ? <EyeOpenIcon /> : <EyeCloseIcon />}
          </span>
        </ConditionalRenderer>
      </div>
    </div>
  );
}

function TextArea({ parentClass, labelStyling, label, className, value, handleOnChange, name }: any) {
  return (
    <div className={parentClass}>
      <label className={labelStyling}>{label}</label>
      <textarea
        className={className}
        id={name}
        rows={4}
        cols={50}
        value={value}
        name={name}
        onChange={handleOnChange}
      >
        At w3schools.com you will learn how to make a website. They offer free
        tutorials in all web development technologies.
      </textarea>
    </div>
  );
}

export { InputField };
