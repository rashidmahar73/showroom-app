"use client";

import {
  Button,
  ConditionalRenderer,
  TableWrapper,
  InputGrid,
} from "@/app/components";
import { useEffect, useState } from "react";
import { headTitles } from "./helpers";
import { UseLazyApiCall } from "@/app/hooks";
import { hasEmptyString, toastHandler } from "@/app/utils/helpers";
import { ToastContainer } from "react-toastify";
import { toastTypesKeys } from "@/app/utils/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UpdateDeal } from "./updateDeal";

const defaultObject = {
  tracking_id: 0,
  owner_name: "",
  owner_phone_number: "",
  price_demand: "",
  deal_date: "",
  vehicle_company: "",
  vehicle_type: "",
  vehicle_registration_no: "",
  vehicle_chases_no: "",
  vehicle_model: "",
  vehicle_meter_reading: "",
  status: "",
};

function AddOrUpdateDealer() {
  const [currentDealerData, setCurrentDealerData] = useState<any>([]);
  const [dealerData, setDealerData] = useState(defaultObject);
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const encodedData = searchParams?.get("data");
  const parsedData = encodedData
    ? JSON.parse(decodeURIComponent(encodedData))
    : null;

  useEffect(() => {
    if (parsedData) return setDealerData(parsedData);
  }, []);

  const isUpdate = pathname === "/dealer/updateDeals";

  const dealerInputItems = [
    {
      type: "text",
      label: "Owner Name",
      name: "owner_name",
      value: dealerData.owner_name,
    },
    {
      type: "number",
      label: "Owner Phone Number",
      name: "owner_phone_number",
      value: dealerData.owner_phone_number,
    },
    {
      type: "number",
      label: "Price Demand",
      name: "price_demand",
      value: dealerData.price_demand,
    },
    {
      type: "date",
      label: "Deal Date",
      name: "deal_date",
      value: dealerData.deal_date,
    },
    {
      type: "text",
      label: "Vehicle Company",
      name: "vehicle_company",
      value: dealerData.vehicle_company,
    },
    {
      type: "text",
      label: "Vehicle Type",
      name: "vehicle_type",
      value: dealerData.vehicle_type,
    },
    {
      type: "number",
      label: "Vehicle Registration No",
      name: "vehicle_registration_no",
      value: dealerData.vehicle_registration_no,
    },
    {
      type: "number",
      label: "Vehicle Chases No",
      name: "vehicle_chases_no",
      value: dealerData.vehicle_chases_no,
    },
    {
      type: "number",
      label: "Vehicle Model",
      name: "vehicle_model",
      value: dealerData.vehicle_model,
    },
    {
      type: "number",
      label: "Vehicle Meter Reading",
      name: "vehicle_meter_reading",
      value: dealerData.vehicle_meter_reading,
    },
  ];

  const [getUpdateDealData, { data: updateDealData }] = UseLazyApiCall({
    url: "users/dealer/updateDeal",
    method: "PUT",
  }) as any;

  async function onClickHandler(type: string, updatedData: any) {
    if (type === "update" && updatedData) {
      await getUpdateDealData({ params: updatedData });

      return;
    }
    if (isEdit) {
      const updatedDealerList = currentDealerData.map((elem: any) =>
        elem.tracking_id === dealerData?.tracking_id ? { ...dealerData } : elem
      );
      setCurrentDealerData(updatedDealerList);
      setDealerData(defaultObject);
      setIsEdit(false);
      return;
    }

    setCurrentDealerData([
      ...currentDealerData,
      { ...dealerData, tracking_id: Date.now() },
    ]);
    setDealerData(defaultObject);
  }

  
  useEffect(() => {
    if (updateDealData?.status === 200) {
      toastHandler(updateDealData.message, toastTypesKeys.success);
      setTimeout(() => {
        router.push(`/dealer`);
        return;
      }, 3000);
    }
  }, [updateDealData]);

  function onClickTableHandler(type: any, elem: any) {
    return () => {
      if (type === "remove") {
        const updatedDealerList = currentDealerData.filter(
          (listItem: any) => elem.tracking_id !== listItem?.tracking_id
        );
        setCurrentDealerData(updatedDealerList);
        return;
      }

      setDealerData(elem);
      setIsEdit(true);
    };
  }

  const [getData, { data: addDealsData, isLoading }] = UseLazyApiCall({
    url: "users/dealer/addDeals",
    method: "POST",
  }) as any;

  async function onSubmit() {
    const dealsIDList = currentDealerData?.map(
      (item: any) => item?.tracking_id
    );
    const addDealsData = {
      id: 2011,
      showroom_name: "suhaib showroom",
      deals_list: currentDealerData,
      deals_tracking_list: dealsIDList,
    };

    await getData({ params: addDealsData });
  }

  useEffect(() => {
    if (addDealsData?.status === 200) {
      toastHandler(addDealsData.message, toastTypesKeys.success);
      setTimeout(() => {
        router.push(`/dealer`);
        return;
      }, 3000);
    }
  }, [addDealsData]);

  const isEmptyFields = hasEmptyString(dealerData);

  if (isUpdate) {
    return (
      <UpdateDeal
        onClickHandler={() => onClickHandler("update", dealerData)}
        dealerInputItems={dealerInputItems}
        setDealerData={setDealerData}
        dealerData={dealerData}
      />
    );
  }

  //for add below is jsx
  return (
    <div className="mx-20">
      <ToastContainer />
      <h1 className="text-[23px] text-center font-bold my-5">Add Deals</h1>
      <InputGrid
        items={dealerInputItems}
        setState={setDealerData}
        state={dealerData}
        variant={"dealModule"}
      />
      <div className="flex justify-end my-5">
        <Button
          className={`${
            isEmptyFields
              ? "opacity-40 cursor-default"
              : "opacity-100 cursor-pointer"
          } h-[40px] text-white text-[13px] px-3 rounded-[5px] bg-[#2182b0]`}
          onClick={isEmptyFields ? () => {} : () => onClickHandler("", {})}
        >
          {isEdit ? "Update" : "Add"}
        </Button>
      </div>
      <ConditionalRenderer condition={currentDealerData?.length !== 0}>
        <div className="rounded-sm mt-5">
          <TableWrapper
            headerList={headTitles}
            items={currentDealerData || []}
            TableRow={TableRow}
            onClickHandler={onClickTableHandler}
          />
        </div>
        <div className="flex justify-end my-5">
          <Button
            className={`${
              isLoading ? "opacity-40" : "opacity-100"
            } h-[40px] text-white px-5 text-[13px] rounded-[5px] bg-[#2182b0]`}
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
        "even:bg-[#ECEDED] text-center border-b-[2px] border-b-[#686868] text-[15px] w-full text-black"
      }
    >
      <td className="px-2 py-4">{elem?.tracking_id}</td>
      <td className="px-2 py-4">{elem?.owner_name}</td>
      <td className="px-2 py-4">{elem?.owner_phone_number}</td>
      <td className="px-2 py-4">{elem?.price_demand}</td>
      <td className="px-2 py-4">{elem?.deal_date}</td>
      <td className="px-2 py-4">{elem?.vehicle_company}</td>
      <td className="px-2 py-4">{elem?.vehicle_type}</td>
      <td className="px-2 py-4">{elem?.vehicle_registration_no}</td>
      <td className="px-2 py-4">{elem?.vehicle_chases_no}</td>
      <td className="px-2 py-4">{elem?.vehicle_model}</td>
      <td className="px-2 py-4">{elem?.vehicle_meter_reading}</td>
      <td className="px-2 py-4">
        <Button
          className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
          onClick={onClickHandler("edit", elem)}
        >
          Edit
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
  );
}

export { AddOrUpdateDealer };
