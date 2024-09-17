"use client";

import {
  Button,
  TableWrapper,
  ConditionalRenderer,
  InputGrid,
} from "@/app/components";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { purchaseHeadTitles, headTitles } from "./helpers";
import { UpdateSell } from "./updateSell";
import { UseLazyApiCall } from "@/app/hooks";
import { hasEmptyString, toastHandler } from "@/app/utils/helpers";
import { toastTypesKeys } from "@/app/utils/constants";
import { ToastContainer } from "react-toastify";

function AddOrUpdateSell() {
  const [sellList, setSellList] = useState<any>([]);
  const [sellData, setSellData] = useState({
    sell_id: 0,
    sell_by: "",
    selling_date: "",
    selling_price: "",
    sell_amount: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isUpdate = pathname?.includes("update");
  const isUpdatePurchase = pathname?.includes("updateSell");

  const encodedData = searchParams.get("data");
  const parsedData = encodedData
    ? JSON.parse(decodeURIComponent(encodedData))
    : null;

  useEffect(() => {
    if (isUpdatePurchase && parsedData) return setSellData(parsedData);
  }, []);

  const [getData, { data: addSellData }] = UseLazyApiCall({
    url: "users/investors/addSell",
    method: "POST",
  }) as any;

  function onClickHandler(type: any, elem: any) {
    return () => {
      setSellData(elem);
      setIsEdit(true);
    };
  }

  function onClickSellAction() {
    if (isEdit) {
      const updatedSellList = sellList.map((elem: any) =>
        elem.sell_id === sellData.sell_id ? { ...sellData } : elem
      );
      setSellList(updatedSellList);
      setSellData({
        sell_id: 0,
        sell_by: "",
        selling_date: "",
        selling_price: "",
        sell_amount: "",
      });
      setIsEdit(false);
      return;
    }

    const newSellData = {
      ...sellData,
    };
    setSellList([newSellData]);
    setSellData({
      sell_id: 0,
      sell_by: "",
      selling_date: "",
      selling_price: "",
      sell_amount: "",
    });
  }

  const sellInputItems = [
    {
      type: "text",
      label: "Sell By",
      name: "sell_by",
      value: sellData.sell_by,
    },
    {
      type: "date",
      label: "Selling Date",
      name: "selling_date",
      value: sellData.selling_date,
    },
    {
      type: "number",
      label: "Selling Price",
      name: "selling_price",
      value: sellData.selling_price,
    },

    {
      type: "number",
      label: "Sell Amount",
      name: "sell_amount",
      value: sellData.sell_amount,
    },
  ];

  function onSubmit() {
    const sellDataObj = sellList?.find((item: any) => item);

    const modifiedSellData = {
      purchase_id: parsedData?.purchase_id,
      sell_by: sellDataObj?.sell_by,
      selling_date: sellDataObj?.selling_date,
      selling_price: sellDataObj?.selling_price,
      sell_amount: sellDataObj?.sell_amount,
    };
    getData({ params: modifiedSellData });
    // sell add api call
  }

  useEffect(() => {
    if (addSellData?.status === 200) {
      toastHandler(addSellData.message, toastTypesKeys.success);
      setTimeout(() => {
        router.push(`/investor`);
        return;
      }, 3000);
      return;
    }
  }, [addSellData]);

  if (isUpdate) {
    return (
      <UpdateSell
        sellInputItems={sellInputItems}
        setSellData={setSellData}
        sellData={sellData}
        onClickSellAction={onClickSellAction}
      />
    );
  }

  const addHeadTitles = headTitles?.filter(
    (elem, index) => index !== 0 && index !== 1
  );
  const modifiedHeadTitle = isUpdate ? headTitles : addHeadTitles;

  const isEmptyFields = hasEmptyString(sellData);

  return (
    <div className="mx-20">
      <ToastContainer />
      <h1 className="font-bold text-center text-[20px] my-5">
        Purchase Details
      </h1>
      <div className="border-[1px] border-black rounded-sm mt-5">
        <TableWrapper
          headerList={purchaseHeadTitles}
          items={[parsedData] || []}
          TableRow={PurchaseTableRow}
          onClickHandler={() => {}}
        />
      </div>
      <h1 className="font-bold text-center text-[20px] my-5">Enter Sell</h1>
      <InputGrid
        items={sellInputItems}
        setState={setSellData}
        state={sellData}
      />
      <div className="flex justify-end mt-5">
        <Button
          className={`h-[40px] text-[15px] ${
            isEmptyFields
              ? "opacity-40 cursor-default"
              : "opacity-100 cursor-pointer"
          } text-white px-3 rounded-[5px] bg-[#2182b0]`}
          onClick={onClickSellAction}
        >
          {isEdit ? "Update" : "Add"} Sell
        </Button>
      </div>

      <ConditionalRenderer condition={sellList?.length > 0}>
        <div className="border-[1px] border-black rounded-sm mt-5">
          <TableWrapper
            headerList={modifiedHeadTitle}
            items={sellList || []}
            TableRow={TableRow}
            onClickHandler={onClickHandler}
          />
        </div>

        <div className="flex w-full my-5">
          <Button
            className="h-[40px] w-full text-white px-3 rounded-[5px] bg-[#2182b0]"
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
        "even:bg-[#ECEDED] text-center text-[15px] w-full text-black"
      }
    >
      <td className="px-2 py-4">{elem?.purchase_id}</td>
      <td className="px-2 py-4">{elem?.vehicle_company}</td>
      <td className="px-2 py-4">{elem?.vehicle_type}</td>
      <td className="px-2 py-4">{elem?.vehicle_registration_no}</td>
      <td className="px-2 py-4">{elem?.vehicle_chases_no}</td>
      <td className="px-2 py-4">{elem?.vehicle_model}</td>
      <td className="px-2 py-4">{elem?.vehicle_meter_reading}</td>
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
      <td className="px-2 py-4">{elem?.sell_amount}</td>
      <td className="px-2 py-4">{elem?.sell_by}</td>
      <td className="px-2 py-4">{elem?.selling_date}</td>
      <td className="px-2 py-4">{elem?.selling_price}</td>
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

export { AddOrUpdateSell };
