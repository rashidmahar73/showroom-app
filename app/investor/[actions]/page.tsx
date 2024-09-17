"use client";

import { ConditionalRenderer } from "@/app/components";
import { AddOrUpdateInvestor } from "./investorActions";
import { usePathname } from "next/navigation";
import { AddOrUpdateAmount } from "./amountActions";
import { AddOrUpdatePurchase } from "./purchaseActions";
import { AddOrUpdateSell } from "./sellActions";
import { AddOrUpdateExtraExpense } from "./extraResponseActions";
import withAuth from "@/app/withAuth";

const paths = {
  investorAdd: "/investor/add",
  addAmount: "/investor/addAmount",
  updateAmount: "/investor/updateAmount",
  addSell: "/investor/addSell",
  addPurchase: "/investor/addPurchase",
  updatePurchase: "/investor/updatePurchase",
  updateSell: "/investor/updateSell",
  extraExpense: "/investor/extraExpense",
  updateExtraExpense: "/investor/updateExtraExpense",
};

function Actions() {
  const pathname = usePathname();

  return (
    <div>
      <ConditionalRenderer condition={paths?.investorAdd === pathname}>
        <AddOrUpdateInvestor />
      </ConditionalRenderer>

      <ConditionalRenderer
        condition={
          paths?.addAmount === pathname || paths?.updateAmount === pathname
        }
      >
        <AddOrUpdateAmount />
      </ConditionalRenderer>

      <ConditionalRenderer
        condition={
          paths?.addPurchase === pathname || paths?.updatePurchase === pathname
        }
      >
        <AddOrUpdatePurchase />
      </ConditionalRenderer>

      <ConditionalRenderer
        condition={
          paths?.addSell === pathname || paths?.updateSell === pathname
        }
      >
        <AddOrUpdateSell />
      </ConditionalRenderer>

      <ConditionalRenderer
        condition={
          paths?.extraExpense === pathname ||
          paths?.updateExtraExpense === pathname
        }
      >
        <AddOrUpdateExtraExpense />
      </ConditionalRenderer>
    </div>
  );
}

export default withAuth(Actions);
