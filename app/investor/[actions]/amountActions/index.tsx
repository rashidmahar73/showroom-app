"use client";

import { Button, TableWrapper, ConditionalRenderer } from "@/app/components";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { headTitles } from "./helpers";
import { InputGrid } from "../../components";
import { InvestorDetails, UpdateAmount } from "./components";
import { UseLazyApiCall } from "@/app/hooks";
import { toastHandler } from "@/app/utils/helpers";
import { toastTypesKeys } from "@/app/utils/constants";

function AddOrUpdateAmount() {
  const [currentAmountData, setCurrentAmountData] = useState<any>({});
  const [investorAmountData, setInvestorAmountData] = useState({
    investor_amount: "",
    investor_amount_type: "",
    investor_amount_date: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isUpdate = pathname?.includes("updateAmount");

  const encodedData = searchParams.get("data");
  const parsedData = encodedData
    ? JSON.parse(decodeURIComponent(encodedData))
    : null;

  useEffect(() => {
    if (parsedData && isUpdate) return setInvestorAmountData(parsedData);
  }, []);

  const [getData, { data: addAmount, isLoadingAdd }] = UseLazyApiCall({
    url: "users/investors/addAmount",
    method: "POST",
  }) as any;

  useEffect(() => {
    if (addAmount?.status === 200) {
      setInvestorAmountData({
        investor_amount: "",
        investor_amount_type: "",
        investor_amount_date: "",
      });
    }
  }, [addAmount]);

  function onClickHandler(type: any, elem: any) {
    return () => {
      if (type === "edit") {
        setIsEdit(true);
        setInvestorAmountData(elem);
        return;
      }
    };
  }

  function onClickAmountAction() {
    if (isEdit) {
      setIsEdit(false);
    }

    setCurrentAmountData(investorAmountData);
    setInvestorAmountData({
      investor_amount: "",
      investor_amount_type: "",
      investor_amount_date: "",
    });
  }

  const amountInputItems = [
    {
      type: "number",
      label: "Investor Amount",
      name: "investor_amount",
      value: investorAmountData.investor_amount,
    },
    {
      type: "text",
      label: "Investor Amount Type",
      name: "investor_amount_type",
      value: investorAmountData.investor_amount_type,
    },
    {
      type: "date",
      label: "Investor Amount Date",
      name: "investor_amount_date",
      value: investorAmountData.investor_amount_date,
    },
  ];

  function onSubmit() {
    const amountData = {
      investor_id: 42,
      ...currentAmountData,
    };
    getData({ params: amountData });
  }

  useEffect(() => {
    if (addAmount?.status === 200) {
      toastHandler(addAmount.message, toastTypesKeys.success);
      setTimeout(() => {
        setInvestorAmountData({
          investor_amount: "",
          investor_amount_type: "",
          investor_amount_date: "",
        });
      }, 3000);
      return;
    }
  }, [addAmount]);

  if (isUpdate) {
    return (
      <UpdateAmount
        onClickAmountAction={onClickAmountAction}
        investorAmountData={investorAmountData}
        setInvestorAmountData={setInvestorAmountData}
        amountInputItems={amountInputItems}
      />
    );
  }

  const addHeadTitles = headTitles?.filter((elem, index) => index !== 0);
  const modifiedHeadTitle = isUpdate ? headTitles : addHeadTitles;

  //for add below is jsx
  return (
    <div className="mx-20">
      <h1 className="font-bold text-center text-[20px] my-10">
        Investor Details
      </h1>
      <InvestorDetails parsedData={parsedData} />
      <h1 className="font-bold text-center text-[20px] my-5">Add Amount</h1>
      <InputGrid
        items={amountInputItems}
        setState={setInvestorAmountData}
        state={investorAmountData}
      />
      <div className="flex justify-end my-5">
        <Button
          className="h-[40px] text-white text-[13px] px-3 rounded-[5px] bg-[#2182b0]"
          onClick={onClickAmountAction}
        >
          {isEdit ? "Update" : "Add"} Amount
        </Button>
      </div>
      <ConditionalRenderer
        condition={Object.keys(currentAmountData)?.length !== 0}
      >
        <div className="rounded-sm mt-5">
          <TableWrapper
            headerList={modifiedHeadTitle}
            items={[currentAmountData] || []}
            TableRow={TableRow}
            onClickHandler={onClickHandler}
          />
        </div>
        <div className="flex w-full my-5">
          <Button
            className={`${isLoadingAdd ? "opacity-40" : "opacity-100"
              } h-[40px] text-white px-3 text-[13px] w-full rounded-[5px] bg-[#2182b0]`}
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
        "even:bg-[#ECEDED] text-center border-b-[2px] border-b-[#686868] text-[15px] table-fixed table w-full text-black"
      }
    >
      <ConditionalRenderer condition={!!elem?.amount_id}>
        <td className="px-2 py-4">{elem?.amount_id}</td>
      </ConditionalRenderer>
      <td className="px-2 py-4">{elem?.investor_amount}</td>
      <td className="px-2 py-4">{elem?.investor_amount_type}</td>
      <td className="px-2 py-4">{elem?.investor_amount_date}</td>
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

export { AddOrUpdateAmount };
