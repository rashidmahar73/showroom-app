"use client";

import {
  Button,
  TableWrapper,
  ConditionalRenderer,
  InputGrid,
} from "@/app/components";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { headTitles } from "./helpers";
import { inputTypes, toastTypesKeys } from "@/app/utils/constants";
import { UseLazyApiCall } from "@/app/hooks";
import { UpdateExtraExpense } from "./updateExtraExpense";
import { hasEmptyString, toastHandler } from "@/app/utils/helpers";
import { ToastContainer } from "react-toastify";

function AddOrUpdateExtraExpense() {
  const [extraExpenseList, setExtraExpenseList] = useState<any>([]);
  const [extraExpenseData, setExtraExpenseData] = useState({
    purchase_id: 0,
    workshop_name: "",
    date_modified: "",
    total_expense: "",
    detail: "",
    other_expense: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();
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

  const [getData, { data: extraExpenseAdded }] = UseLazyApiCall({
    url: "users/investors/addExtraExpense",
    method: "POST",
  }) as any;

  function onClickHandler(type: any, elem: any) {
    return () => {
      setExtraExpenseData(elem);
      setIsEdit(true);
    };
  }

  function onClickPurchaseAction() {
    if (isEdit) {
      const updatedPurchaseList = extraExpenseList.map((elem: any) =>
        elem.purchase_id === extraExpenseData.purchase_id
          ? { ...extraExpenseData }
          : elem
      );
      setExtraExpenseList(updatedPurchaseList);
      setExtraExpenseData({
        purchase_id: 0,
        workshop_name: "",
        date_modified: "",
        total_expense: "",
        detail: "",
        other_expense: "",
      });
      setIsEdit(false);
      return;
    }

    setExtraExpenseList([extraExpenseData]);
    setExtraExpenseData({
      purchase_id: 0,
      workshop_name: "",
      date_modified: "",
      total_expense: "",
      detail: "",
      other_expense: "",
    });
  }

  const extraExpenseInputItems = [
    {
      type: "text",
      label: "Workshop Name",
      name: "workshop_name",
      value: extraExpenseData.workshop_name,
    },
    {
      type: "date",
      label: "Date Modified",
      name: "date_modified",
      value: extraExpenseData.date_modified,
    },
    {
      type: "number",
      label: "Total Expense",
      name: "total_expense",
      value: extraExpenseData.total_expense,
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
      name: "other_expense",
      value: extraExpenseData.other_expense,
    },
  ];

  function onSubmit() {
    const extraExpenseObj = extraExpenseList?.find((item: any) => item);
    const modifiedExtraExpenseObj = {
      date_modified: extraExpenseObj?.date_modified,
      detail: extraExpenseObj?.detail,
      other_expense: extraExpenseObj?.other_expense,
      purchase_id: parsedData?.purchase_id,
      total_expense: extraExpenseObj?.total_expense,
      workshop_name: extraExpenseObj?.workshop_name,
    };
    getData({ params: modifiedExtraExpenseObj });
  }

  useEffect(() => {
    if (extraExpenseAdded?.status === 200) {
      toastHandler(extraExpenseAdded.message, toastTypesKeys.success);
      setTimeout(() => {
        router.push(`/investor`);
        return;
      }, 3000);
      return;
    }
  }, [extraExpenseAdded]);

  if (isUpdateExtraExpense) {
    return (
      <UpdateExtraExpense
        extraExpenseInputItems={extraExpenseInputItems}
        setExtraExpenseData={setExtraExpenseData}
        extraExpenseData={extraExpenseData}
      />
    );
  }

  const isEmptyFields = hasEmptyString(extraExpenseData);

  return (
    <div className="mx-20">
      <ToastContainer />
      <h1 className="font-bold text-center text-[20px] my-5">
        Enter Extra Repense
      </h1>
      <InputGrid
        items={extraExpenseInputItems}
        setState={setExtraExpenseData}
        state={extraExpenseData}
      />
      <div className="flex justify-end mt-5">
        <Button
          className={`h-[40px] ${
            isEmptyFields
              ? "opacity-40 cursor-default"
              : "opacity-100 cursor-pointer"
          } text-white px-3 rounded-[5px] bg-[#2182b0]`}
          onClick={isEmptyFields ? () => {} : onClickPurchaseAction}
        >
          {isEdit ? "Update" : "Add"}
        </Button>
      </div>
      <ConditionalRenderer condition={extraExpenseList?.length > 0}>
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
        "even:bg-[#ECEDED] text-center text-[15px] w-full text-black"
      }
    >
      <td className="px-2 py-4">{elem?.workshop_name}</td>
      <td className="px-2 py-4">{elem?.date_modified}</td>
      <td className="px-2 py-4">{elem?.total_expense}</td>
      <td className="px-2 py-4">{elem?.detail}</td>
      <td className="px-2 py-4">{elem?.other_expense}</td>
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

export { AddOrUpdateExtraExpense };
