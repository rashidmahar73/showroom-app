"use client";

import withAuth from "@/app/withAuth";
import {
  SellDetails,
  PurchaseDetails,
  AmountDetails,
  ExtraExpense,
} from "./components";

function Details() {
  return (
    <div className="mx-20">
      <h1 className="text-[20px] text-center font-bold my-5">Details</h1>
      <h1 className="text-[20px] text-center font-bold my-5">InvestorID: 27</h1>
      <AmountDetails />
      <PurchaseDetails />
      <ExtraExpense />
      <SellDetails />
    </div>
  );
}

export default withAuth(Details);
