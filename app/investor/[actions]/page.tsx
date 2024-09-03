"use client";

import { ConditionalRenderer } from "@/app/components";
import { AddOrUpdateInvestor } from "./investorActions";
import { usePathname } from "next/navigation";
import { AddOrUpdateAmount } from "./amountActions";
import { AddOrUpdatePurchase } from "./purchaseActions";
import { AddOrUpdateSell } from "./sellActions";
import { AddOrUpdateExtraExpense } from "./extraResponseActions";


function Actions() {
  const pathname = usePathname();
  const isAddAmount = pathname?.includes("addAmount");
  const isAddSell = pathname?.includes("addSell");
  const isAddPurchase = pathname?.includes("addPurchase");
  const isUpdateAmount = pathname?.includes("updateAmount");
  const isupdatePurchase = pathname?.includes("updatePurchase");
  const isUpdateSell=pathname?.includes("updateSell");
  const isAddExtraExpense=pathname?.includes("extraExpense");
  const isUpdateExtraExpense=pathname?.includes("updateExtraExpense");

  return (
    <div>
        <ConditionalRenderer
        condition={
          !isAddAmount &&
          !isAddPurchase &&
          !isUpdateAmount &&
          !isupdatePurchase &&
          !isAddSell && !isUpdateSell && !isAddExtraExpense && !isUpdateExtraExpense
        }
      >
        <AddOrUpdateInvestor />
      </ConditionalRenderer>
      <ConditionalRenderer condition={isAddAmount || isUpdateAmount}>
        <AddOrUpdateAmount />
      </ConditionalRenderer>
    
      <ConditionalRenderer condition={isAddPurchase || isupdatePurchase}>
        <AddOrUpdatePurchase />
      </ConditionalRenderer>
      <ConditionalRenderer condition={isAddSell || isUpdateSell}>
        <AddOrUpdateSell />
      </ConditionalRenderer>
      <ConditionalRenderer condition={isAddExtraExpense || isUpdateExtraExpense}>
        <AddOrUpdateExtraExpense/>
      </ConditionalRenderer>
    </div>
  );
}

export default Actions;
