"use client";

import {
  Button,
  ConditionalRenderer,
  TableWrapper,
  InputGrid,
} from "@/app/components";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { amountHeadTitles, headTitles } from "./helpers";
import { UpdatePurchase } from "./updatePurchase";
import { UseLazyApiCall } from "@/app/hooks";
import { hasEmptyString, toastHandler } from "@/app/utils/helpers";
import { toastTypesKeys } from "@/app/utils/constants";
import { ToastContainer } from "react-toastify";

function AddOrUpdatePurchase() {
  const [purchaseList, setPurchaseList] = useState<any>([]);
  const [purchaseAmountData, setPurchaseAmountData] = useState({
    purchase_id: 0,
    vehicle_company: "",
    vehicle_type: "",
    vehicle_registration_no: "",
    vehicle_chases_no: "",
    vehicle_model: "",
    vehicle_meter_reading: "",
    purchase_date: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const router=useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isUpdatePurchase = pathname?.includes("updatePurchase");

  const encodedData = searchParams.get("data");
  const parsedData = encodedData
    ? JSON.parse(decodeURIComponent(encodedData))
    : null;

  useEffect(() => {
    if (isUpdatePurchase && parsedData)
      return setPurchaseAmountData(parsedData);
  }, []);

  const [getData, { data: addPurchaseData, isLoading: addIsLoading }] =
    UseLazyApiCall({
      url: "users/investors/addPurchase",
      method: "POST",
    }) as any;

  function onClickHandler(type: any, elem: any) {
    return () => {
      setPurchaseAmountData(elem);
      setIsEdit(true);
    };
  }

  function onClickPurchaseAction() {
    if (isEdit) {
      const updatedPurchaseList = purchaseList.map((elem: any) =>
        elem.purchase_id === purchaseAmountData.purchase_id
          ? { ...purchaseAmountData }
          : elem
      );
      setPurchaseList(updatedPurchaseList);
      setPurchaseAmountData({
        purchase_id: 0,
        vehicle_company: "",
        vehicle_type: "",
        vehicle_registration_no: "",
        vehicle_chases_no: "",
        vehicle_model: "",
        vehicle_meter_reading: "",
        purchase_date: "",
      });
      setIsEdit(false);
      return;
    }

    setPurchaseList([purchaseAmountData]);
    setPurchaseAmountData({
      purchase_id: 0,
      vehicle_company: "",
      vehicle_type: "",
      vehicle_registration_no: "",
      vehicle_chases_no: "",
      vehicle_model: "",
      vehicle_meter_reading: "",
      purchase_date: "",
    });
  }

  const purchseInputItems = [
    {
      type: "text",
      label: "Vehicle Company",
      name: "vehicle_company",
      value: purchaseAmountData.vehicle_company,
    },
    {
      type: "text",
      label: "Vehicle Type",
      name: "vehicle_type",
      value: purchaseAmountData.vehicle_type,
    },
    {
      type: "number",
      label: "Vehicle Registration No.",
      name: "vehicle_registration_no",
      value: purchaseAmountData.vehicle_registration_no,
    },
    {
      type: "number",
      label: "Vehicle Chases No.",
      name: "vehicle_chases_no",
      value: purchaseAmountData.vehicle_chases_no,
    },
    {
      type: "text",
      label: "Vehicle Model",
      name: "vehicle_model",
      value: purchaseAmountData.vehicle_model,
    },
    {
      type: "number",
      label: "Vehicle Meter Reading",
      name: "vehicle_meter_reading",
      value: purchaseAmountData.vehicle_meter_reading,
    },
    {
      type: "date",
      label: "Purchase Date",
      name: "purchase_date",
      value: purchaseAmountData.purchase_date,
    },
  ];

  function onSubmit() {
    const purchaseDataObj = purchaseList?.find((item: any) => item);

    const modifiedPurchasedDate = {
      amount_id: parsedData?.amount_id,
      vehicle_company: purchaseDataObj?.vehicle_company,
      vehicle_type: purchaseDataObj?.vehicle_type,
      vehicle_registration_no: purchaseDataObj?.vehicle_registration_no,
      vehicle_chases_no: purchaseDataObj?.vehicle_chases_no,
      vehicle_model: purchaseDataObj?.vehicle_model,
      vehicle_meter_reading: purchaseDataObj?.vehicle_meter_reading,
      purchase_date: purchaseDataObj?.purchase_date,
    };

    getData({ params: modifiedPurchasedDate });
  }

  useEffect(() => {
    if (addPurchaseData?.status === 200) {
      toastHandler(addPurchaseData.message, toastTypesKeys.success);
      setTimeout(() => {
        router.push(`/investor`);
        return;
      }, 3000);
      return;
    }
  }, [addPurchaseData]);

  if (isUpdatePurchase) {
    return (
      <UpdatePurchase
        purchseInputItems={purchseInputItems}
        setPurchaseAmountData={setPurchaseAmountData}
        purchaseAmountData={purchaseAmountData}
        onClickPurchaseAction={onClickPurchaseAction}
      />
    );
  }

  const addHeadTitles = headTitles?.filter(
    (elem, index) => index !== 0 && index !== 1
  );
  const modifiedHeadTitle = isUpdatePurchase ? headTitles : addHeadTitles;

  const isEmptyFields = hasEmptyString(purchaseAmountData);

  return (
    <div className="mx-20">
      <ToastContainer />
      <h1 className="font-bold text-center text-[20px] my-5">Amount Details</h1>
      <div className="border-[1px] border-black rounded-sm mt-5">
        <TableWrapper
          headerList={amountHeadTitles}
          items={[parsedData?.amount_details] || []}
          TableRow={AmountTableRow}
          onClickHandler={() => {}}
        />
      </div>
      <h1 className="font-bold text-center text-[20px] my-7">
        Purchase Details
      </h1>
      <InputGrid
        items={purchseInputItems}
        setState={setPurchaseAmountData}
        state={purchaseAmountData}
      />
      <div className="flex justify-end mt-5">
        <Button
          className={`h-[40px] ${
            isEmptyFields
              ? "opacity-40 cursor-default"
              : "opacity-100 cursor-pointer"
          } text-[14px] text-white px-3 rounded-[5px] bg-[#2182b0]`}
          onClick={isEmptyFields ? () => {} : onClickPurchaseAction}
        >
          {isEdit ? "Update" : "Add"} Purchase
        </Button>
      </div>
      <ConditionalRenderer condition={purchaseList?.length > 0}>
        <div className="border-[1px] border-black rounded-sm mt-5">
          <TableWrapper
            headerList={modifiedHeadTitle}
            items={purchaseList || []}
            TableRow={TableRow}
            onClickHandler={onClickHandler}
          />
        </div>

        <div className="flex w-full my-5">
          <Button
            className={`${
              addIsLoading
                ? "opcaity-40 cursor-default"
                : "opacity-100 cursor-pointer"
            } h-[40px] text-white text-[14px] w-full px-3 rounded-[5px] bg-[#2182b0]`}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </ConditionalRenderer>
    </div>
  );
}
function AmountTableRow({ elem, className = "", onClickHandler }: any) {
  return (
    <tr
      className={
        className ||
        "even:bg-[#ECEDED] text-center text-[14px] w-full text-black"
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
        "even:bg-[#ECEDED] text-center text-[15px] w-full text-black"
      }
    >
      {/* <td className="px-2 py-4">{elem?.amount_id}</td>
      <td className="px-2 py-4">{elem?.purchase_id}</td> */}
      <td className="px-2 py-4">{elem?.vehicle_company}</td>
      <td className="px-2 py-4">{elem?.vehicle_type}</td>
      <td className="px-2 py-4">{elem?.vehicle_registration_no}</td>
      <td className="px-2 py-4">{elem?.vehicle_chases_no}</td>
      <td className="px-2 py-4">{elem?.vehicle_model}</td>
      <td className="px-2 py-4">{elem?.vehicle_meter_reading}</td>
      <td className="px-2 py-4">{elem?.purchase_date}</td>
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
