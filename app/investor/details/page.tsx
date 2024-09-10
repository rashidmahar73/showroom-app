"use client";

import withAuth from "@/app/withAuth";
import {
  SellDetails,
  PurchaseDetails,
  AmountDetails,
  ExtraExpense,
} from "./components";
import { useSearchParams } from "next/navigation";

function Details() {
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
      <AmountDetails />
      <PurchaseDetails />
      <ExtraExpense />
      <SellDetails />
    </div>
  );
}

export default withAuth(Details);
