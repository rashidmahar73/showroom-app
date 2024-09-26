"use client";

import { ToastContainer } from "react-toastify";
import withAuth from "../withAuth";
import Link from "next/link";
import { UseApiCall } from "../hooks";
import { headTitles } from "./helpers";
import { ConditionalRenderer, TableWrapper } from "../components";
import { useUser } from "../providers";

function Employee() {
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
  
  return (
    <div className="mx-20">
      <ToastContainer />
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
            onClickHandler={() => {}}
          />
        </div>
      </ConditionalRenderer>
    </div>
  );
}

function TableRow({ elem, className = "" }: any) {
  const hire_date = elem?.hire_date?.split("T")?.[0];
  const modifiedObj = {
    ...elem,
    hire_date: hire_date,
  };
  return (
    <tr
      className={
        className ||
        "even:bg-[#ECEDED] text-center border-b-[2px] border-b-[#686868] text-[15px] w-full text-black"
      }
    >
      <td className="px-2 py-4">{elem?.tracking_id}</td>
      <td className="px-2 py-4">{elem?.employee_name}</td>
      <td className="px-2 py-4">{elem?.employee_email}</td>
      <td className="px-2 py-4">{hire_date}</td>
      <td className="px-2 py-4">{elem?.per_month_salary}</td>
      <td className="px-2 py-4">{elem?.department}</td>
      <td className="px-2 py-4">{elem?.designation}</td>
      <td className="px-2 py-4">{elem?.phone_number}</td>
      <td className="px-2 py-4">{elem?.account_no}</td>
      <td className="px-2 py-4">{elem?.bank_account_name}</td>
      <td className="px-2 py-4">{elem?.branch_code}</td>
      <td className="px-2 py-4">{elem?.branch_city}</td>
      <td className="px-2 py-4">
        <Link
          className="h-[40px] py-3 bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
          href={`employee/salary?data=${encodeURIComponent(
            JSON.stringify(modifiedObj)
          )}`}
        >
          Salary
        </Link>
      </td>
      <td className="px-2 py-4">
        <Link
          className="h-[40px] py-3 bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
          href={`employee/updateEmployee?data=${encodeURIComponent(
            JSON.stringify(modifiedObj)
          )}`}
        >
          Update
        </Link>
      </td>
    </tr>
  );
}

export default withAuth(Employee);
