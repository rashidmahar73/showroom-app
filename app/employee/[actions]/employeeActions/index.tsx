"use client";

import {
  Button,
  ConditionalRenderer,
  TableWrapper,
  InputGrid,
} from "@/app/components";
import { useEffect, useState } from "react";
import { headTitles } from "./helpers";
import { UseLazyApiCall } from "@/app/hooks";
import { hasEmptyString, toastHandler } from "@/app/utils/helpers";
import { ToastContainer } from "react-toastify";
import { toastTypesKeys } from "@/app/utils/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UpdateEmployee } from "./updateEmployee";
import { useUser } from "@/app/providers";

const defaultObject = {
  tracking_id: 0,
  employee_name: "",
  employee_email: "",
  hire_date: "",
  per_month_salary: "",
  department: "",
  designation: "",
  phone_number: "",
  account_no: "",
  bank_account_name: "",
  branch_code: "",
  branch_city: "",
};

function AddOrUpdateEmployee() {
  const [currentEmployeeData, setCurrentEmployeeData] = useState<any>({});
  const [employeeData, setEmployeeData] = useState(defaultObject);
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { userData } = useUser();
  const { user } = userData || {};

  const encodedData = searchParams?.get("data");
  const parsedData = encodedData
    ? JSON.parse(decodeURIComponent(encodedData))
    : null;

  const isUpdate = pathname === "/employee/updateEmployee";

  useEffect(() => {
    if (parsedData && isUpdate) return setEmployeeData(parsedData);
  }, []);

  const inputItems = [
    {
      type: "text",
      label: "Employee Name",
      name: "employee_name",
      value: employeeData.employee_name,
    },
    {
      type: "email",
      label: "Employee Email",
      name: "employee_email",
      value: employeeData.employee_email,
    },
    {
      type: "date",
      label: "Hire Date",
      name: "hire_date",
      value: employeeData.hire_date,
    },
    {
      type: "number",
      label: "Per Month Salary",
      name: "per_month_salary",
      value: employeeData.per_month_salary,
    },
    {
      type: "text",
      label: "Department",
      name: "department",
      value: employeeData.department,
    },
    {
      type: "text",
      label: "Designation",
      name: "designation",
      value: employeeData.designation,
    },
    {
      type: "number",
      label: "Phone Number",
      name: "phone_number",
      value: employeeData.phone_number,
    },
    {
      type: "number",
      label: "Account No",
      name: "account_no",
      value: employeeData.account_no,
    },
    {
      type: "text",
      label: "Bank Account Name",
      name: "bank_account_name",
      value: employeeData.bank_account_name,
    },
    {
      type: "number",
      label: "Branch Code",
      name: "branch_code",
      value: employeeData.branch_code,
    },
    {
      type: "text",
      label: "Branch City",
      name: "branch_city",
      value: employeeData.branch_city,
    },
  ];

  const [getUpdateEmployeeData, { data: updateEMployeeData }] = UseLazyApiCall({
    url: "users/employee/updateEmployee",
    method: "PUT",
  }) as any;

  async function onClickHandler(type: string, updatedData: any) {
    if (type === "update" && updatedData) {
      await getUpdateEmployeeData({ params: updatedData });

      return;
    }
    if (isEdit) {
      setCurrentEmployeeData(employeeData);
      setEmployeeData(defaultObject);
      setIsEdit(false);
      return;
    }

    setCurrentEmployeeData({ ...employeeData, tracking_id: Date.now() });
    setEmployeeData(defaultObject);
  }

  useEffect(() => {
    if (updateEMployeeData?.status === 200) {
      toastHandler(updateEMployeeData.message, toastTypesKeys.success);
      setTimeout(() => {
        router.push(`/employee`);
        return;
      }, 3000);
    }
  }, [updateEMployeeData]);

  function onClickTableHandler(type: any, elem: any) {
    return () => {
      if (type === "remove") {
        return;
      }

      setEmployeeData(elem);
      setIsEdit(true);
    };
  }

  const [getData, { data: addEmployeeData, isLoading }] = UseLazyApiCall({
    url: "users/employee/addEmployee",
    method: "POST",
  }) as any;

  async function onSubmit() {
    await getData({
      params: {
        id: user?.id,
        showroom_name: user?.showroom_name,
        ...currentEmployeeData,
      },
    });
  }

  useEffect(() => {
    if (addEmployeeData?.status === 200) {
      toastHandler(addEmployeeData.message, toastTypesKeys.success);
      setTimeout(() => {
        router.push(`/employee`);
        return;
      }, 3000);
    }
  }, [addEmployeeData]);

  const isEmptyFields =
    hasEmptyString(employeeData) || !employeeData.employee_email?.includes("@");

  if (isUpdate) {
    return (
      <UpdateEmployee
        onClickHandler={() => onClickHandler("update", employeeData)}
        inputItems={inputItems}
        setEmployeeData={setEmployeeData}
        employeeData={employeeData}
      />
    );
  }

  //for add below is jsx
  return (
    <div className="mx-20">
      <ToastContainer />
      <h1 className="text-[23px] text-center font-bold my-5">Add Employee</h1>
      <InputGrid
        items={inputItems}
        setState={setEmployeeData}
        state={employeeData}
      />
      <div className="flex justify-end my-5">
        <Button
          className={`${
            isEmptyFields
              ? "opacity-40 cursor-default"
              : "opacity-100 cursor-pointer"
          } h-[40px] text-white text-[13px] px-3 rounded-[5px] bg-[#2182b0]`}
          onClick={isEmptyFields ? () => {} : () => onClickHandler("", {})}
        >
          {isEdit ? "Update" : "Add"}
        </Button>
      </div>
      <ConditionalRenderer
        condition={Object.keys(currentEmployeeData)?.length > 0}
      >
        <div className="rounded-sm mt-5">
          <TableWrapper
            headerList={headTitles}
            items={[currentEmployeeData] || []}
            TableRow={TableRow}
            onClickHandler={onClickTableHandler}
          />
        </div>
        <div className="flex justify-end my-5">
          <Button
            className={`${
              isLoading ? "opacity-40" : "opacity-100"
            } h-[40px] text-white px-5 text-[13px] rounded-[5px] bg-[#2182b0]`}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </ConditionalRenderer>
    </div>
  );
}

function TableRow({ elem, className = "", onClickHandler }: any) {
  return (
    <tr
      className={
        className ||
        "even:bg-[#ECEDED] text-center border-b-[2px] border-b-[#686868] text-[15px] w-full text-black"
      }
    >
      <td className="px-2 py-4">{elem?.employee_name}</td>
      <td className="px-2 py-4">{elem?.employee_email}</td>
      <td className="px-2 py-4">{elem?.hire_date}</td>
      <td className="px-2 py-4">{elem?.per_month_salary}</td>
      <td className="px-2 py-4">{elem?.department}</td>
      <td className="px-2 py-4">{elem?.designation}</td>
      <td className="px-2 py-4">{elem?.phone_number}</td>
      <td className="px-2 py-4">{elem?.account_no}</td>
      <td className="px-2 py-4">{elem?.bank_account_name}</td>
      <td className="px-2 py-4">{elem?.branch_code}</td>
      <td className="px-2 py-4">{elem?.branch_city}</td>
      <td className="px-2 py-4">
        <Button
          className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
          onClick={onClickHandler("edit", elem)}
        >
          Edit
        </Button>
      </td>
    </tr>
  );
}

export { AddOrUpdateEmployee };
