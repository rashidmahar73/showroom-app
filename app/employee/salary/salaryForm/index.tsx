import { Button, InputGrid } from "@/app/components";
import { UseLazyApiCall } from "@/app/hooks";
import { toastTypesKeys } from "@/app/utils/constants";
import { toastHandler } from "@/app/utils/helpers";
import { useEffect, useState } from "react";

function SalaryForm({ parsedData, setIsShow }: any) {
  const [data, setData] = useState({
    paid_on: "",
    leave: "",
  });

  const inputItems = [
    {
      type: "date",
      label: "Paid On",
      name: "paid_on",
      value: data.paid_on,
    },
    {
      type: "number",
      label: "Leave",
      name: "leave",
      value: data.leave,
    },
  ];

  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthName = monthNames[date.getMonth()];
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const daysInMonth = (monthIndex: any, year: any) =>
    new Date(year, monthIndex + 1, 0).getDate();

  const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);

  const perDay = parsedData?.per_month_salary / daysInCurrentMonth;
  const leaveAmountDeduct = Number(data?.leave) * perDay;
  const totalPaid = Math.round(
    parsedData?.per_month_salary - leaveAmountDeduct
  );

  const [getData, { data: addSalaryData }] = UseLazyApiCall({
    url: "users/employee/addSalary",
    method: "POST",
  }) as any;

  async function onClickHandler() {
    const salaryObj = {
      per_month_salary: parsedData?.per_month_salary,
      month_name: currentMonthName,
      total_days: daysInCurrentMonth,
      paid_on: data?.paid_on,
      leave: data?.leave === "" ? 0 : data?.leave,
      total_paid: totalPaid,
      employee_id: parsedData?.id,
      employee_tracking_id: parsedData?.tracking_id,
      year:currentYear
    };

    await getData({ params: salaryObj });
  }

  useEffect(() => {
    if (addSalaryData?.status === 200) {
      toastHandler(addSalaryData?.message, toastTypesKeys.success);
      setTimeout(() => {
        setIsShow(false);
      }, 3000);
    }
  }, [addSalaryData]);

  const isEmpty =
    !parsedData?.per_month_salary ||
    !currentMonthName ||
    !daysInCurrentMonth ||
    !data?.paid_on ||
    !totalPaid;

  return (
    <div>
      <div className="flex justify-between my-5">
        <h1 className="font-bold text-[18px]">Month : {currentMonthName}</h1>
        <h1 className="font-bold text-[18px]">Days : {daysInCurrentMonth}</h1>
        <h1 className="font-bold text-[18px]">Year : {currentYear}</h1>
        <h1 className="font-bold text-[18px]">
          Basic Salary : {parsedData?.per_month_salary}
        </h1>
      </div>
      <div className="my-5">
        <InputGrid items={inputItems} setState={setData} state={data} />
      </div>
      <div className="flex justify-end">
        <h1 className="font-bold text-[18px]">Total Paid : {totalPaid}</h1>
      </div>
      <div className="mx-20">
        <h1 className="font-bold text-center text-[20px]">Detail</h1>
        <div className="flex justify-between mt-3">
          <h1 className="font-bold">Basic Salary</h1>
          <h1 className="font-bold">Month</h1>
          <h1 className="font-bold">Days</h1>
          <h1 className="font-bold">Paid On</h1>
          <h1 className="font-bold">Leave</h1>
          <h1 className="font-bold">Total Paid</h1>
        </div>
        <div className="flex justify-between mt-5">
          <h1>{parsedData?.per_month_salary}</h1>
          <h1>{currentMonthName}</h1>
          <h1>{daysInCurrentMonth}</h1>
          <h1>{data?.paid_on}</h1>
          <h1>{data?.leave || 0}</h1>
          <h1>{totalPaid}</h1>
        </div>
      </div>
      <div className="flex justify-end my-5">
        <Button
          className={`h-[40px] ${
            isEmpty ? "opacity-40 cursor-default" : "opacity-100 cursor-pointer"
          } bg-[#006ab3] px-3 text-white rounded-md`}
          onClick={isEmpty ? () => {} : onClickHandler}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

export { SalaryForm };
