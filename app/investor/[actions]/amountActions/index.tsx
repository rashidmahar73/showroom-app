"use client";

import { Button, TableWrapper, ConditionalRenderer } from "@/app/components";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { headTitles } from "./helpers";
import { InputGrid } from "../../components";
import { InvestorDetails, UpdateAmount } from "./components";

function AddOrUpdateAmount() {
  const [amountList, setAmountList] = useState<any>([]);
  const [investorAmountData, setInvestorAmountData] = useState({
    amountID: 0,
    investorAmount: "",
    investorAmountType: "",
    investorAmountDate: "",
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
      const updatedAmountList = amountList.map((elem: any) =>
        elem.amountID === investorAmountData.amountID
          ? { ...investorAmountData }
          : elem
      );
      setAmountList(updatedAmountList);
      setInvestorAmountData({
        amountID: 0,
        investorAmount: "",
        investorAmountType: "",
        investorAmountDate: "",
      });
      setIsEdit(false);
      return;
    }

    const newAmountData = {
      ...investorAmountData,
      amountID: Date.now(),
    };
    setAmountList([newAmountData]);
    setInvestorAmountData({
      amountID: 0,
      investorAmount: "",
      investorAmountType: "",
      investorAmountDate: "",
    });
  }

  const amountInputItems = [
    {
      type: "number",
      label: "Investor Amount",
      name: "investorAmount",
      value: investorAmountData.investorAmount,
    },
    {
      type: "text",
      label: "Investor Amount Type",
      name: "investorAmountType",
      value: investorAmountData.investorAmountType,
    },
    {
      type: "date",
      label: "Investor Amount Date",
      name: "investorAmountDate",
      value: investorAmountData.investorAmountDate,
    },
  ];

  function onSubmit() {}

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
      <ConditionalRenderer condition={amountList?.length !== 0}>
        <div className="rounded-sm mt-5">
          <TableWrapper
            headerList={headTitles}
            items={amountList || []}
            TableRow={TableRow}
            onClickHandler={onClickHandler}
          />
        </div>
        <div className="flex w-full mt-5">
          <Button
            className="h-[40px] text-white px-3 text-[13px] w-full rounded-[5px] bg-[#2182b0]"
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
      <td className="px-2 py-4">{elem?.amountID}</td>
      <td className="px-2 py-4">{elem?.investorAmount}</td>
      <td className="px-2 py-4">{elem?.investorAmountType}</td>
      <td className="px-2 py-4">{elem?.investorAmountDate}</td>
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
