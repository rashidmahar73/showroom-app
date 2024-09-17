"use client";

import { Button, ConditionalRenderer, TableWrapper, InputGrid } from "@/app/components";
import { useState } from "react";
import { headTitles } from "./helpers";

function AddOrUpdateDealer() {
  const [dealerData, setDealerData] = useState({
    owner_name: "",
    owner_phone_number: "",
    price_demand: "",
    deal_date: "",
    commission_percentage: "",
    vehicle_company: "",
    vehicle_type: "",
    vehicle_registration_no: "",
    vehicle_chases_no: "",
    vehicle_model: "",
    vehicle_meter_reading: "",
  });
  const [currentDealerData, setCurrentDealerData] = useState<any>({});
  const [isEdit, setIsEdit] = useState(false);

  const dealerInputItems = [
    {
      type: "text",
      label: "Owner Name",
      name: "owner_name",
      value: dealerData.owner_name,
    },
    {
      type: "text",
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
      type: "number",
      label: "Commission Percentage",
      name: "commission_percentage",
      value: dealerData.commission_percentage,
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
      type: "text",
      label: "Vehicle Registration No",
      name: "vehicle_registration_no",
      value: dealerData.vehicle_registration_no,
    },
    {
      type: "text",
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

  function onClickDealerAction() {
    if (isEdit) {
      setIsEdit(false);
    }

    setCurrentDealerData(currentDealerData);
    setDealerData({
      owner_name: "",
      owner_phone_number: "",
      price_demand: "",
      deal_date: "",
      commission_percentage: "",
      vehicle_company: "",
      vehicle_type: "",
      vehicle_registration_no: "",
      vehicle_chases_no: "",
      vehicle_model: "",
      vehicle_meter_reading: "",
    });
  }

  function onClickHandler(type:any,elem:any){

  }

  function onSubmit(){

  }

  console.log(dealerData, "dealerData");

  //for add below is jsx
  return (
    <div className="mx-20">
      <h1 className="text-[23px] text-center font-bold my-5">Add Dealer</h1>
      <InputGrid
        items={dealerInputItems}
        setState={setDealerData}
        state={dealerData}
      />
      <div className="flex justify-end my-5">
        <Button
          className="h-[40px] text-white text-[13px] px-3 rounded-[5px] bg-[#2182b0]"
          onClick={onClickDealerAction}
        >
          {isEdit ? "Update" : "Add"} Amount
        </Button>
      </div>
      <ConditionalRenderer
        condition={Object.keys(currentDealerData)?.length !== 0}
      >
        <div className="rounded-sm mt-5">
          <TableWrapper
            headerList={headTitles}
            items={[currentDealerData] || []}
            TableRow={TableRow}
            onClickHandler={onClickHandler}
          />
        </div>
        <div className="flex w-full my-5">
          <Button
            className={`${false ? "opacity-40" : "opacity-100"
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
          "even:bg-[#ECEDED] text-center border-b-[2px] border-b-[#686868] text-[15px] w-full text-black"
        }
      >
         {/* : "",
    : "",
    : "",
    : "",
    : "",
    : "",
    : "",
    : "",
    : "",
    : "",
    : "", */}
        <td className="px-2 py-4">{elem?.owner_name}</td>
        <td className="px-2 py-4">{elem?.owner_phone_number}</td>
        <td className="px-2 py-4">{elem?.price_demand}</td>
        <td className="px-2 py-4">{elem?.deal_date}</td>
        <td className="px-2 py-4">{elem?.commission_percentage}</td>
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
      </tr>
    );
  }

export { AddOrUpdateDealer };
