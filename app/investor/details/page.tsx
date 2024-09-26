"use client";

import withAuth from "@/app/withAuth";
import {
  SellDetails,
  PurchaseDetails,
  AmountDetails,
  ExtraExpense,
} from "./components";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, ConditionalRenderer, Modal } from "@/app/components";
import { ProfitCalculation } from "./profitCalculation";

function Details() {
  const [view, setView] = useState({
    amount_id: [],
    purchase_id: null,
    sell_id: null,
  });
  const [data, setData] = useState({
    amount_details: {},
    purchase_details: {},
    extra_expense_details: {},
    sell_details: {},
  });

  const [isOpen, setIsOpen] = useState(false);

  const searchParams = useSearchParams();

  const encodedData = searchParams.get("data");
  const parsedData = encodedData
    ? JSON.parse(decodeURIComponent(encodedData))
    : null;

  function onClickHandler() {
    setIsOpen(true);
  }

  function handleModalClose() {
    setIsOpen(false);
  }

  console.log(data, "data");

  return (
    <div className="mx-20">
      <Modal isShow={isOpen} className="flex items-center justify-center">
        <Modal.Header
          title="Profit Calculation"
          onclickHandler={handleModalClose}
        />
        <div className="w-[120dvh]">
          <ProfitCalculation data={data} />
        </div>
      </Modal>
      <h1 className="text-[20px] text-center font-bold my-5">Details</h1>
      <h1 className="text-[20px] text-center font-bold my-5">
        InvestorID: {parsedData?.toString()}
      </h1>
      <AmountDetails
        setView={setView}
        parsedData={parsedData}
        setData={setData}
      />
      <ConditionalRenderer condition={view?.amount_id?.length > 0}>
        <PurchaseDetails
          view={view}
          setView={setView}
          setData={setData}
          data={data}
        />
      </ConditionalRenderer>
      <ConditionalRenderer condition={!!view?.purchase_id}>
        <ExtraExpense view={view} setData={setData} data={data} />
      </ConditionalRenderer>
      <ConditionalRenderer condition={!!view?.sell_id}>
        <SellDetails view={view} setData={setData} data={data} />
      </ConditionalRenderer>
      <ConditionalRenderer
        condition={!!view?.sell_id && !!view?.purchase_id && !!view?.sell_id}
      >
        <div className="flex justify-end my-5">
          <Button
            className="bg-[#006ab3] text-white p-3 rounded-md"
            onClick={onClickHandler}
          >
            Profit
          </Button>
        </div>
      </ConditionalRenderer>
    </div>
  );
}

export default withAuth(Details);
