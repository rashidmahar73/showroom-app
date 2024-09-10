"use client";

import {
  InputField,
  Button,
  TableWrapper,
  ConditionalRenderer,
} from "@/app/components";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { amountHeadTitles, headTitles } from "./helpers";
import { InputGrid } from "../../components";
import { UpdatePurchase } from "./updatePurchase";

function AddOrUpdatePurchase() {
  const [purchaseList, setPurchaseList] = useState<any>([]);
  const [purchaseAmountData, setPurchaseAmountData] = useState({
    amountID: 0,
    purchaseID: 0,
    vehicleCompany: "",
    vehicleType: "",
    vehicleRegistrationNo: "",
    vehicleChasesNo: "",
    vehicleModel: "",
    vehicleMeterReading: "",
    purchaseDate: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isUpdate = pathname?.includes("update");
  const isUpdatePurchase = pathname?.includes("updatePurchase");

  const encodedData = searchParams.get("data");
  const parsedData = encodedData
    ? JSON.parse(decodeURIComponent(encodedData))
    : null;

  useEffect(() => {
    if (isUpdatePurchase && parsedData)
      return setPurchaseAmountData(parsedData);
  }, []);

  function onClickHandler(type: any, elem: any) {
    return () => {
      setPurchaseAmountData(elem);
      setIsEdit(true);
    };
  }

  function onClickPurchaseAction() {
    if (isEdit) {
      const updatedPurchaseList = purchaseList.map((elem: any) =>
        elem.purchaseID === purchaseAmountData.purchaseID
          ? { ...purchaseAmountData }
          : elem
      );
      setPurchaseList(updatedPurchaseList);
      setPurchaseAmountData({
        amountID: 0,
        purchaseID: 0,
        vehicleCompany: "",
        vehicleType: "",
        vehicleRegistrationNo: "",
        vehicleChasesNo: "",
        vehicleModel: "",
        vehicleMeterReading: "",
        purchaseDate: "",
      });
      setIsEdit(false);
      return;
    }

    setPurchaseList([purchaseAmountData]);
    setPurchaseAmountData({
      amountID: 0,
      purchaseID: 0,
      vehicleCompany: "",
      vehicleType: "",
      vehicleRegistrationNo: "",
      vehicleChasesNo: "",
      vehicleModel: "",
      vehicleMeterReading: "",
      purchaseDate: "",
    });
  }

  const purchseInputItems = [
    {
      type: "text",
      label: "Vehicle Company",
      name: "vehicleCompany",
      value: purchaseAmountData.vehicleCompany,
    },
    {
      type: "text",
      label: "Vehicle Type",
      name: "vehicleType",
      value: purchaseAmountData.vehicleType,
    },
    {
      type: "number",
      label: "Vehicle Registration No.",
      name: "vehicleRegistrationNo",
      value: purchaseAmountData.vehicleRegistrationNo,
    },
    {
      type: "number",
      label: "Vehicle Chases No.",
      name: "vehicleChasesNo",
      value: purchaseAmountData.vehicleChasesNo,
    },
    {
      type: "text",
      label: "Vehicle Model",
      name: "vehicleModel",
      value: purchaseAmountData.vehicleModel,
    },
    {
      type: "number",
      label: "Vehicle Meter Reading",
      name: "vehicleMeterReading",
      value: purchaseAmountData.vehicleMeterReading,
    },
    {
      type: "date",
      label: "Purchase Date",
      name: "purchaseDate",
      value: purchaseAmountData.purchaseDate,
    },
  ];

  function onSubmit() {}

  if (isUpdate) {
    return (
      <UpdatePurchase
        purchseInputItems={purchseInputItems}
        setPurchaseAmountData={setPurchaseAmountData}
        purchaseAmountData={purchaseAmountData}
        onClickPurchaseAction={onClickPurchaseAction}
      />
    );
  }

  console.log(parsedData?.amount_details, "parsedData");

  return (
    <div className="mx-20">
      <h1 className="font-bold text-center text-[20px] my-5">Amount Details</h1>
      <div className="border-[1px] border-black rounded-sm mt-5">
        <TableWrapper
          headerList={amountHeadTitles}
          items={[parsedData?.amount_details] || []}
          TableRow={AmountTableRow}
          onClickHandler={() => {}}
        />
      </div>
      <h1 className="font-bold text-center text-[20px] my-5">
        Purchase Details
      </h1>
      <InputGrid
        items={purchseInputItems}
        setState={setPurchaseAmountData}
        state={purchaseAmountData}
      />
      <div className="flex justify-end mt-5">
        <Button
          className="h-[40px] text-[14px] text-white px-3 rounded-[5px] bg-[#2182b0]"
          onClick={onClickPurchaseAction}
        >
          Add Purchase
        </Button>
      </div>
      <div className="border-[1px] border-black rounded-sm mt-5">
        <TableWrapper
          headerList={headTitles}
          items={purchaseList || []}
          TableRow={TableRow}
          onClickHandler={onClickHandler}
        />
      </div>

      <div className="flex justify-end my-5">
        <Button
          className="h-[40px] text-white text-[14px] px-3 rounded-[5px] bg-[#2182b0]"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
function AmountTableRow({ elem, className = "", onClickHandler }: any) {
  return (
    <tr
      className={
        className ||
        "even:bg-[#ECEDED] text-center text-[14px] table-fixed table w-full text-black"
      }
    >
      <td className="px-2 py-4">{elem?.amount_id}</td>
      <td className="px-2 py-4">{elem?.investor_amount}</td>
      <td className="px-2 py-4">{elem?.investor_amount_type}</td>
      <td className="px-2 py-4">{elem?.investor_amount_date}</td>
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
      <td className="px-2 py-4">{elem?.amountID}</td>
      <td className="px-2 py-4">{elem?.purchaseID}</td>
      <td className="px-2 py-4">{elem?.vehicleCompany}</td>
      <td className="px-2 py-4">{elem?.vehicleType}</td>
      <td className="px-2 py-4">{elem?.vehicleRegistrationNo}</td>
      <td className="px-2 py-4">{elem?.vehicleChasesNo}</td>
      <td className="px-2 py-4">{elem?.vehicleModel}</td>
      <td className="px-2 py-4">{elem?.vehicleMeterReading}</td>
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

export { AddOrUpdatePurchase };
