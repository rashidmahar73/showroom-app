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
  const [view, setView] = useState(null);
  const [extraExpenseView, setExtraExpenseView] = useState(null);
  const [sellView, setSellView] = useState(null);
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
      <AmountDetails setView={setView} />
      <ConditionalRenderer condition={!!view}>
        <PurchaseDetails
          amountDetails={view}
          view={view}
          setView={setExtraExpenseView}
          setSellView={setSellView}
        />
      </ConditionalRenderer>
      <ConditionalRenderer condition={!!extraExpenseView}>
        <ExtraExpense view={extraExpenseView} />
      </ConditionalRenderer>
      <ConditionalRenderer condition={!!sellView}>
      <SellDetails view={sellView} />
      </ConditionalRenderer>
    </div>
  );
}

export default withAuth(Details);
