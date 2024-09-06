"use client";

import { Button, ConditionalRenderer, TableWrapper } from "@/app/components";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { headTitles } from "./helpers";
import { DownArrowIcon } from "@/app/icons";
import { SellDetails } from "../sellDetails";
import { ExtraExpenseDetails } from "../extraExpenseDetails";

function PurchaseDetails({ amountID }: any) {
  const router = useRouter();

  // onBasis of AmountID API Call happen

  const purchaseDetails = [
    {
      purchaseID: 0,
      vehicleCompany: "Honda",
      vehicleType: "Car",
      vehicleRegistrationNo: 12312312,
      vehicleChasesNo: 87787,
      vehicleModel: 877887,
      vehicleMeterReading: 877887,
      purchaseDate: "2023-10-10",
    },
  ];

  function onClickHandler(type: any, elem: any) {
    return () => {
      if (type === "addPurchase") {
        const serializedObject = encodeURIComponent(JSON.stringify(elem));
        router.push(`investor/addPurchase?data=${serializedObject}`);
        return;
      }
      if (type === "updatePurchase") {
        const serializedObject = encodeURIComponent(JSON.stringify(elem));
        router.push(`investor/updatePurchase?data=${serializedObject}`);
        return;
      }
      if (type === "addSell") {
        const serializedObject = encodeURIComponent(JSON.stringify(elem));
        router.push(`investor/addSell?data=${serializedObject}`);
        return;
      }
      if(type==="extraExpense"){
        const serializedObject = encodeURIComponent(JSON.stringify(elem));
        router.push(`investor/extraExpense?data=${serializedObject}`);
        return;
      }
    };
  }
  return (
    <div className="border-[#008000] border-[2px]">
      <TableWrapper
        headerList={headTitles}
        items={purchaseDetails}
        TableRow={TableRow}
        onClickHandler={onClickHandler}
      />
    </div>
  );
}

function TableRow({ elem, className = "", onClickHandler }: any) {
  const [isOpen, setIsOpen] = useState({
    status: false,
    data: {},
  });
  const [isOpenExtraExpense, setIsOpenExtraExpense] = useState({
    status: false,
    data: {},
  });

  function onClickSellDetails() {
    setIsOpen({
      status: !isOpen.status,
      data: elem.purchaseID,
    });
  }
  function onClickExtraExpense(){
    setIsOpenExtraExpense({
      status: !isOpenExtraExpense.status,
      data: elem.purchaseID,
    });
  }

  const sell = {
    isSell: true,
  };
  const extraExpense = {
    isExtraExpense: false,
  };
  return (
    <>
      <tr
        className={
          className ||
          "even:bg-[#ECEDED] text-center text-[15px] table-fixed table w-full text-black"
        }
      >
        <td className="px-2 py-4">{elem?.purchaseID}</td>
        <td className="px-2 py-4">{elem?.vehicleCompany}</td>
        <td className="px-2 py-4">{elem?.vehicleType}</td>
        <td className="px-2 py-4">{elem?.vehicleRegistrationNo}</td>
        <td className="px-2 py-4">{elem?.vehicleChasesNo}</td>
        <td className="px-2 py-4">{elem?.vehicleModel}</td>
        <td className="px-2 py-4">{elem?.vehicleMeterReading}</td>
        <td className="px-2 py-4">{elem?.purchaseDate}</td>
        <td className="px-2 py-4">
        <ConditionalRenderer condition={extraExpense.isExtraExpense}>
            <Button
              className="h-[40px] text-[15px] text-white px-2 rounded-[5px]"
              onClick={onClickExtraExpense}
            >
              <div className={`${
            isOpen.status
              ? "rotate-180 transition ease-in-out delay-200"
              : "rotate-0 transition ease-in-out delay-200"
          } flex items-center justify-center cursor-pointer`}>
            <DownArrowIcon />
          </div>
            </Button>
          </ConditionalRenderer>
          <ConditionalRenderer condition={!extraExpense.isExtraExpense}>
          <Button
            className="h-[40px] bg-[#2182b0] text-[13px] w-[100px] text-white rounded-[5px]"
            onClick={onClickHandler("extraExpense", elem)}
          >
            Extra Expense
          </Button>
          </ConditionalRenderer>
        </td>
        <td className="px-2 py-4">
          <ConditionalRenderer condition={sell.isSell}>
            <Button
              className="h-[40px] text-[15px] text-white px-2 rounded-[5px]"
              onClick={onClickSellDetails}
            >
              <div className={`${
            isOpen.status
              ? "rotate-180 transition ease-in-out delay-200"
              : "rotate-0 transition ease-in-out delay-200"
          } flex items-center justify-center cursor-pointer`}>
            <DownArrowIcon />
          </div>
            </Button>
          </ConditionalRenderer>
          <ConditionalRenderer condition={!sell.isSell}>
            <Button
              className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
              onClick={onClickHandler("addSell", elem)}
            >
              Add Sell
            </Button>
          </ConditionalRenderer>
        </td>
        <td className="px-2 py-4">
          <Button
            className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
            onClick={onClickHandler("updatePurchase", elem)}
          >
            Update
          </Button>
        </td>
        <td className="px-2 py-4">
          <Button
            className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
            onClick={onClickHandler("remove", elem)}
          >
            Remove
          </Button>
        </td>
        
      </tr>
      <ConditionalRenderer
        condition={isOpen.status && elem?.purchaseID === isOpen.data}
      >
        <div>
          <SellDetails purchaseID={isOpen.data} />
        </div>
      </ConditionalRenderer>
      <ConditionalRenderer condition={isOpenExtraExpense.status}>
        <ExtraExpenseDetails/>
      </ConditionalRenderer>
    </>
  );
}

export { PurchaseDetails };
