"use client";

import {
  Button,
  ConditionalRenderer,
  Modal,
  TableWrapper,
} from "@/app/components";
import withAuth from "@/app/withAuth";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { SalaryForm } from "./salaryForm";
import { useSearchParams } from "next/navigation";
import { UseApiCall } from "@/app/hooks";
import { useUser } from "@/app/providers";

function Salary() {
  const [isShow, setIsShow] = useState(false);

  const { userData } = useUser();
  const { user } = userData || {};

  const searchParams = useSearchParams();

  const encodedData = searchParams?.get("data");
  const parsedData = encodedData
    ? JSON.parse(decodeURIComponent(encodedData))
    : null;

  function onClickHandler() {
    setIsShow(true);
  }

  function handleModalClose() {
    setIsShow(false);
  }

  const {
    data: salaryDetailsData = {
      data: [],
      message: "",
      status: 0,
    },
    isLoading,
    error,
    refetch,
  } = UseApiCall({
    url: `users/employee/${user?.id}/${parsedData?.tracking_id}/salaryDetails`,
    method: "GET",
  });

  const headTitles = [
    {
      id: 1,
      styling: "w-[8%] text-[15px] text-center",
      title: "Employee TrackingID",
    },
    {
      id: 2,
      styling: "w-[8%] text-[15px] text-center",
      title: "Month",
    },
    {
      id: 3,
      styling: "w-[8%] text-[15px] text-center",
      title: "Year",
    },
    {
      id: 3,
      styling: "w-[8%] text-[15px] text-center",
      title: "Total Days",
    },
    {
      id: 3,
      styling: "w-[8%] text-[15px] text-center",
      title: "Per/Month Salary",
    },
    {
      id: 3,
      styling: "w-[8%] text-[15px] text-center",
      title: "Leave",
    },
    {
      id: 3,
      styling: "w-[8%] text-[15px] text-center",
      title: "Paid On",
    },
    {
      id: 3,
      styling: "w-[8%] text-[15px] text-center",
      title: "Total Paid",
    },
  ];

  console.log(salaryDetailsData, "salaryDetailsData");
  return (
    <div className="mx-20">
      <ToastContainer />
      <Modal isShow={isShow} className="flex items-center justify-center">
        <Modal.Header title="Add Salary" onclickHandler={handleModalClose} />
        <div className="w-[120dvh]">
          <SalaryForm parsedData={parsedData} setIsShow={setIsShow} />
        </div>
      </Modal>
      <h1 className="text-[20px] text-center font-bold my-5">Salary</h1>
      <div className="flex justify-end">
        <Button
          onClick={onClickHandler}
          className="h-[40px] bg-[#2182b0] text-[13px] text-white rounded-[5px] px-3 flex items-center"
        >
          Add Salary
        </Button>
      </div>
      <ConditionalRenderer condition={salaryDetailsData?.status === 404}>
        <h1 className="text-[20px] font-bold text-center my-20">
          {salaryDetailsData?.message}
        </h1>
      </ConditionalRenderer>
      <ConditionalRenderer condition={salaryDetailsData?.status === 200}>
        <div className="rounded-sm mt-5">
          <TableWrapper
            headerList={headTitles}
            items={salaryDetailsData?.data || []}
            TableRow={TableRow}
            onClickHandler={() => {}}
          />
        </div>
      </ConditionalRenderer>
    </div>
  );
}

function TableRow({ elem, className = "", onClickHandler }: any) {
  const paid_on_date=elem?.paid_on?.split("T")?.[0];
  return (
    <tr
      className={
        className ||
        "even:bg-[#ECEDED] text-center border-b-[2px] border-b-[#686868] text-[15px] w-full text-black"
      }
    >
      <td className="px-2 py-4">{elem?.employee_tracking_id}</td>
      <td className="px-2 py-4">{elem?.month_name}</td>
      <td className="px-2 py-4">{elem?.year}</td>
      <td className="px-2 py-4">{elem?.total_days}</td>
      <td className="px-2 py-4">{elem?.per_month_salary}</td>
      <td className="px-2 py-4">{elem?.leave}</td>
      <td className="px-2 py-4">{paid_on_date}</td>
      <td className="px-2 py-4">{elem?.total_paid}</td>
    </tr>
  );
}

export default withAuth(Salary);
