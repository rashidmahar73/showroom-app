import { InputField, SelectInput, Button } from "@/app/components";
import { useState } from "react";

function Form({ dataCarrier, editableData }: any) {
  const isData =
    Object.keys(editableData).length > 0
      ? editableData
      : {
          name: "",
          email: "",
          phonenumber: "",
          password: "",
          role: "",
          showroom_name: "",
        };

  const [userData, setUserData] = useState(isData);

  function handleOnChange(e: { target: { name: string; value: string } }) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  function onClickHanlder({ name, value }: any) {
    setUserData({ ...userData, [name]: value });
  }

  function onSubmit() {
    dataCarrier(userData);
  }

  const userItems = [
    {
      type: "text",
      label: "Name",
      name: "name",
      value: userData.name,
    },
    {
      type: "email",
      label: "Email",
      name: "email",
      value: userData.email,
    },
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
    {
      type: "text",
      label: "Showroom Name",
      name: "showroom_name",
      value: userData.showroom_name,
    },
  ];

  const isFormFilled =
    !userData?.name ||
    !userData.email ||
    !userData.password ||
    !userData.phonenumber ||
    !userData.role ||
    !userData?.showroom_name ||
    !userData.email?.includes("@");

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {userItems?.map(({ type, label, name, value }, index) => (
          <div key={`user-registration-${index}`}>
            <InputField
              className="h-[40px] border-[1px] w-full border-black rounded-[5px]"
              type={type}
              label={label}
              labelStyling="mb-2 text-[14px] font-bold"
              name={name}
              onChange={handleOnChange}
              value={value}
            />
          </div>
        ))}
        <SelectInput
          key="key"
          className={{
            btnClassName:
              "h-[40px] w-full rounded-[3px] border-[1px] border-black",
            labelClassName: "mb-2 text-[14px] font-bold",
            selectedClassName: "text-[14px] pl-2",
          }}
          listItems={[
            { name: "role", value: "Admin" },
            { name: "role", value: "Employee" },
          ]}
          label="Role"
          selectedValue={userData?.role}
          onClickHanlder={onClickHanlder}
        />
      </div>
      <div className="flex justify-end mt-5">
        <Button
          className={`h-[40px] text-white px-6 text-[13px] rounded-[5px] ${
            isFormFilled ? "bg-[#2182b0] bg-opacity-50" : "bg-[#2182b0]"
          }`}
          onClick={onSubmit}
          disabled={isFormFilled}
        >
          {Object.keys(editableData).length > 0 ? "Update" : "Submit"}
        </Button>
      </div>
    </div>
  );
}

export { Form };
