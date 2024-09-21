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
import { ConditionalRenderer } from "@/app/components";

function Details() {
  const [view, setView] = useState({
    amount_id: [],
    purchase_id: null,
    sell_id: null,
  });

  const searchParams = useSearchParams();

  const encodedData = searchParams.get("data");
  const parsedData = encodedData
    ? JSON.parse(decodeURIComponent(encodedData))
    : null;

  return (
    <div className="mx-20">
      <h1 className="text-[20px] text-center font-bold my-5">Details</h1>
      <h1 className="text-[20px] text-center font-bold my-5">
        InvestorID: {parsedData?.toString()}
      </h1>
      <AmountDetails setView={setView} parsedData={parsedData} />
      <ConditionalRenderer condition={view?.amount_id?.length > 0}>
        <PurchaseDetails view={view} setView={setView} />
      </ConditionalRenderer>
      <ConditionalRenderer condition={!!view?.purchase_id}>
        <ExtraExpense view={view} />
      </ConditionalRenderer>
      <ConditionalRenderer condition={!!view?.sell_id}>
        <SellDetails view={view} />
      </ConditionalRenderer>
    </div>
  );
}

export default withAuth(Details);
