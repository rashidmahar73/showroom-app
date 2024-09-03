"use client";

import { Button, TableWrapper, ConditionalRenderer } from "@/app/components";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { headTitles } from "./helpers";
import { InputGrid } from "../../components";
import { inputTypes } from "@/app/utils/constants";

function AddOrUpdateExtraExpense() {
  const [extraExpenseList, setExtraExpenseList] = useState<any>([]);
  const [extraExpenseData, setExtraExpenseData] = useState({
    amountID: 0,
    purchaseID: 0,
    extraExpenseID: 0,
    workshopName: "",
    dateModified: "",
    totalExpense: "",
    detail: "",
    otherExpense: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isUpdateExtraExpense = pathname?.includes("updateExtraExpense");

  const encodedData = searchParams.get("data");
  const parsedData = encodedData
    ? JSON.parse(decodeURIComponent(encodedData))
    : null;

  useEffect(() => {
    if (isUpdateExtraExpense && parsedData)
      return setExtraExpenseData(parsedData);
  }, []);

  function onClickHandler(type: any, elem: any) {
    return () => {
      setExtraExpenseData(elem);
      setIsEdit(true);
    };
  }

  function onClickPurchaseAction() {
    if (isEdit) {
      const updatedPurchaseList = extraExpenseList.map((elem: any) =>
        elem.purchaseID === extraExpenseData.purchaseID
          ? { ...extraExpenseData }
          : elem
      );
      setExtraExpenseList(updatedPurchaseList);
      setExtraExpenseData({
        amountID: 0,
        purchaseID: 0,
        extraExpenseID: 0,
        workshopName: "",
        dateModified: "",
        totalExpense: "",
        detail: "",
        otherExpense: "",
      });
      setIsEdit(false);
      return;
    }

    setExtraExpenseList([extraExpenseData]);
    setExtraExpenseData({
      amountID: 0,
      purchaseID: 0,
      extraExpenseID: 0,
      workshopName: "",
      dateModified: "",
      totalExpense: "",
      detail: "",
      otherExpense: "",
    });
  }

  const purchseInputItems = [
    {
      type: "text",
      label: "Workshop Name",
      name: "workshopName",
      value: extraExpenseData.workshopName,
    },
    {
      type: "date",
      label: "Date Modified",
      name: "dateModified",
      value: extraExpenseData.dateModified,
    },
    {
      type: "number",
      label: "Total Expense",
      name: "totalExpense",
      value: extraExpenseData.totalExpense,
    },
    {
      type: inputTypes.textarea,
      label: "Detail",
      name: "detail",
      value: extraExpenseData.detail,
    },
    {
      type: inputTypes.textarea,
      label: "Other Expense",
      name: "otherExpense",
      value: extraExpenseData.otherExpense,
    },
  ];

  function onSubmit() {}

  return (
    <div className="mx-20">
      <ConditionalRenderer condition={isUpdateExtraExpense}>
        <h1>{extraExpenseData.extraExpenseID}</h1>
      </ConditionalRenderer>
      <h1 className="font-bold text-center text-[20px] my-5">
        {isUpdateExtraExpense ? "Update" : "Enter"} Extra Repense
      </h1>
      <InputGrid
        items={purchseInputItems}
        setState={setExtraExpenseData}
        state={extraExpenseData}
      />
      <div className="flex justify-end mt-5">
        <Button
          className="h-[40px] text-white px-3 rounded-[5px] bg-[#2182b0]"
          onClick={onClickPurchaseAction}
        >
          {isEdit || isUpdateExtraExpense ? "Update" : "Add"}
        </Button>
      </div>
      <ConditionalRenderer condition={!isUpdateExtraExpense}>
        <div className="border-[1px] border-black rounded-sm mt-5">
          <TableWrapper
            headerList={headTitles}
            items={extraExpenseList || []}
            TableRow={TableRow}
            onClickHandler={onClickHandler}
          />
        </div>

        <div className="flex justify-end mt-5">
          <Button
            className="h-[40px] text-white px-3 rounded-[5px] bg-[#2182b0]"
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
        "even:bg-[#ECEDED] text-center text-[15px] table-fixed table w-full text-black"
      }
    >
      <td className="px-6 py-4">{elem?.amountID}</td>
      <td className="px-6 py-4">{elem?.purchaseID}</td>
      <td className="px-6 py-4">{elem?.workshopName}</td>
      <td className="px-6 py-4">{elem?.dateModified}</td>
      <td className="px-6 py-4">{elem?.totalExpense}</td>
      <td className="px-6 py-4">{elem?.detail}</td>
      <td className="px-6 py-4">{elem?.otherExpense}</td>
      <td className="px-6 py-4">
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

export { AddOrUpdateExtraExpense };
