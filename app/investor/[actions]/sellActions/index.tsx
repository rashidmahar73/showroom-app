"use client";

import {
  Button,
  TableWrapper,
  ConditionalRenderer,
} from "@/app/components";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { purchaseHeadTitles, headTitles } from "./helpers";
import { InputGrid } from "../../components";

function AddOrUpdateSell() {
  const [sellList, setSellList] = useState<any>([]);
  const [sellData, setSellData] = useState({
    amountID: 0,
    purchaseID: 0,
    sellID: 0,
    sellBy: "",
    sellingDate: "",
    sellingPrice: "",
    sellAmount: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isUpdate = pathname?.includes("update");
  const isUpdatePurchase = pathname?.includes("updateSell");

  const encodedData = searchParams.get("data");
  const parsedData = encodedData
    ? JSON.parse(decodeURIComponent(encodedData))
    : null;

  useEffect(() => {
    if (isUpdatePurchase && parsedData)
      return setSellData(parsedData);
  }, []);

  function onClickHandler(type: any, elem: any) {
    return () => {
      setSellData(elem);
      setIsEdit(true);
    };
  }

  function onClickPurchaseAction() {
    if (isEdit) {
      const updatedSellList = sellList.map((elem: any) =>
        elem.sellID === sellData.sellID
          ? { ...sellData }
          : elem
      );
      setSellList(updatedSellList);
      setSellData({
        amountID: 0,
        purchaseID: 0,
        sellID:0,
        sellBy: "",
        sellingDate: "",
        sellingPrice: "",
        sellAmount: "",
      });
      setIsEdit(false);
      return;
    }

    const newSellData = {
      ...sellData,
      sellID: Date.now(),
    };
    setSellList([newSellData]);
    setSellData({
      amountID: 0,
      purchaseID: 0,
      sellID:0,
      sellBy: "",
      sellingDate: "",
      sellingPrice: "",
      sellAmount: "",
    });
  }

console.log({sellList})

  const purchseInputItems = [
    {
      type: "text",
      label: "Sell By",
      name: "sellBy",
      value: sellData.sellBy,
    },
    {
      type: "date",
      label: "Selling Date",
      name: "sellingDate",
      value: sellData.sellingDate,
    },
    {
      type: "number",
      label: "Selling Price",
      name: "sellingPrice",
      value: sellData.sellingPrice,
    },

    {
      type: "number",
      label: "Sell Amount",
      name: "sellAmount",
      value: sellData.sellAmount,
    },
  ];

  function onSubmit() {}


  return (
    <div className="mx-20">
      {/* <ConditionalRenderer condition={isUpdate}>
        <h1>{investorAmountData.investorId}</h1>
      </ConditionalRenderer> */}
      <ConditionalRenderer condition={!isUpdate && parsedData}>
        <h1 className="font-bold text-center text-[20px] my-5">
          Amount Details
        </h1>
        <div className="border-[1px] border-black rounded-sm mt-5">
          <TableWrapper
            headerList={purchaseHeadTitles}
            items={[parsedData] || []}
            TableRow={PurchaseTableRow}
            onClickHandler={() => {}}
          />
        </div>
      </ConditionalRenderer>
      <h1 className="font-bold text-center text-[20px] my-5">
        {isUpdatePurchase ? "Update" : "Enter"} Sell
      </h1>
      <InputGrid
        items={purchseInputItems}
        setState={setSellData}
        state={sellData}
      />
      <div className="flex justify-end mt-5">
        <Button
          className="h-[40px] text-white px-3 rounded-[5px] bg-[#2182b0]"
          onClick={onClickPurchaseAction}
        >
          {isEdit || isUpdate ? "Update" : "Add"} Sell
        </Button>
      </div>
      <ConditionalRenderer condition={!isUpdate}>
        <div className="border-[1px] border-black rounded-sm mt-5">
          <TableWrapper
            headerList={headTitles}
            items={sellList || []}
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
function PurchaseTableRow({ elem, className = "" }: any) {
  return (
    <tr
      className={
        className ||
        "even:bg-[#ECEDED] text-center text-[15px] table-fixed table w-full text-black"
      }
    >
     <td className="px-6 py-4">{elem?.amountID}</td>
      <td className="px-6 py-4">{elem?.purchaseID}</td>
      <td className="px-6 py-4">{elem?.vehicleCompany}</td>
      <td className="px-6 py-4">{elem?.vehicleType}</td>
      <td className="px-6 py-4">{elem?.vehicleRegistrationNo}</td>
      <td className="px-6 py-4">{elem?.vehicleChasesNo}</td>
      <td className="px-6 py-4">{elem?.vehicleModel}</td>
      <td className="px-6 py-4">{elem?.vehicleMeterReading}</td>
    </tr>
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
      <td className="px-6 py-4">{elem?.sellID}</td>
      <td className="px-6 py-4">{elem?.sellAmount}</td>
      <td className="px-6 py-4">{elem?.sellBy}</td>
      <td className="px-6 py-4">{elem?.sellingDate}</td>
      <td className="px-6 py-4">{elem?.sellingPrice}</td>
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

export { AddOrUpdateSell };
