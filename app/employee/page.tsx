"use client";

import { ToastContainer } from "react-toastify";
import withAuth from "../withAuth";
import Link from "next/link";
import { UseApiCall } from "../hooks";
import { headTitles } from "./helpers";
import { Button, ConditionalRenderer, Modal, TableWrapper } from "../components";
import { useUser } from "../providers";
import { useState } from "react";
import { AccountDetails } from "./accountDetails";

function Employee() {
  const [isShowDetails, setIsShowDetails] = useState({
    status: false,
    detail: {},
  });
  const { userData } = useUser();
  const { user } = userData || {};

  const {
    data: employeeDetailsData = {
      data: [],
      message: "",
      status: 0,
      pagination: { totalPages: 0 },
    },
    isLoading,
    error,
    refetch,
  } = UseApiCall({
    url: `users/employee/${user?.id}/employeeList?page=1`,
    method: "GET",
  });

  function onTableClickHandler(type: string, elem: any) {
    return () => {
      if(type==="accountDetails"){
        setIsShowDetails({ status: true, detail: elem });
        return;
      }
    };
  }

  function handleModalClose(){
    setIsShowDetails({ status: false, detail: {} });
  }

  return (
    <div className="mx-10">
      <ToastContainer />
      <Modal isShow={isShowDetails?.status} className="flex items-center justify-center">
        <Modal.Header title="Account Details" onclickHandler={handleModalClose} />
        <div className="w-[120dvh]">
          <AccountDetails elem={isShowDetails?.detail}/>
        </div>
      </Modal>
      <h1 className="text-[20px] text-center font-bold my-5">Employee</h1>
      <div className="flex justify-end">
        <Link
          href={`/employee/addEmployee`}
          className="h-[40px] bg-[#2182b0] text-[13px] text-white rounded-[5px] px-3 flex items-center"
        >
          Add Employee
        </Link>
      </div>
      <ConditionalRenderer condition={employeeDetailsData?.status === 404}>
        <h1 className="text-[20px] font-bold text-center">
          {employeeDetailsData?.message}
        </h1>
      </ConditionalRenderer>
      <ConditionalRenderer condition={employeeDetailsData?.status === 200}>
        <div className="rounded-sm mt-5">
          <TableWrapper
            headerList={headTitles}
            items={employeeDetailsData?.data || []}
            TableRow={TableRow}
            onClickHandler={onTableClickHandler}
          />
        </div>
      </ConditionalRenderer>
    </div>
  );
}

function TableRow({ elem, className = "", onClickHandler }: any) {
  const hire_date = elem?.hire_date?.split("T")?.[0];
  const modifiedObj = {
    ...elem,
    hire_date: hire_date,
  };
  return (
    <>
      <tr
        className={
          className ||
          "even:bg-[#ECEDED] text-center border-b-[2px] border-b-[#686868] text-[14px] w-full text-black"
        }
      >
        <td className=" py-4">{elem?.tracking_id}</td>
        <td className=" py-4">{elem?.employee_name}</td>
        <td className=" py-4">{elem?.employee_email}</td>
        <td className=" py-4">{elem?.department}</td>
        <td className=" py-4">{elem?.designation}</td>
        <td className=" py-4">{elem?.phone_number}</td>
        <td className=" py-4">
          <Button
            className="h-[40px] py-2 bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
            onClick={onClickHandler("accountDetails", elem)}
          >
            Details
          </Button>
        </td>
        <td className=" py-4">
          <Link
            className="h-[40px] py-3 px-2 bg-[#2182b0] text-[13px] text-white  rounded-[5px]"
            href={`employee/salary?data=${encodeURIComponent(
              JSON.stringify(modifiedObj)
            )}`}
          >
            Salary
          </Link>
        </td>
        <td className="px-2 py-4">
          <Link
            className="h-[40px] py-3 bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
            href={`employee/updateEmployee?data=${encodeURIComponent(
              JSON.stringify(modifiedObj)
            )}`}
          >
            Update
          </Link>
        </td>
      </tr>
      {/* <ConditionalRenderer condition={isShowDetails?.status}>
        <tr className="text-[15px] font-bold my-2 bg-[#ECEDED]">
          <td className="py-2">Hire Date</td>
          <td className=" py-2">Salary/Month</td>
          <td className=" py-2">Account No</td>
          <td className=" py-2">Account Name</td>
          <td className=" py-2">Branch Code</td>
          <td className=" py-2">Branch City</td>
        </tr>
        <tr className="my-2  text-[14px] text-black">
          <td className=" py-2">{hire_date}</td>
          <td className=" py-2">{elem?.per_month_salary}</td>
          <td className=" py-2">{elem?.account_no}</td>
          <td className=" py-2">{elem?.bank_account_name}</td>
          <td className=" py-2">{elem?.branch_code}</td>
          <td className=" py-2">{elem?.branch_city}</td>
        </tr>
      </ConditionalRenderer> */}
    </>
  );
}

export default withAuth(Employee);
