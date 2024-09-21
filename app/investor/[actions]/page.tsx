"use client";

import { ConditionalRenderer, TableWrapper } from "@/app/components";
import { AddOrUpdateInvestor } from "./investorActions";
import { usePathname, useSearchParams } from "next/navigation";
import { MultipleActions } from "./multipleActions";
import {
  investorDetailsheadTitles,
  amountHeadTitles,
  extraExpenseHeadTitles,
  purchaseHeadTitles,
  sellHeadTitles,
} from "../headTitles";
import {
  AmountTableRow,
  ExtraExpenseTableRow,
  InvestorTableRow,
  PurchaseTableRow,
  SellTableRow,
} from "./multipleActions/tableRow";
import {
  defaultObject,
  API,
  purchaseDefaultObject,
  purchaseAPI,
  sellDefaultObject,
  sellAPI,
  extraExpenseDefaultObject,
  extraExpenseAPI,
} from "./multipleActions/helpers";
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

  const searchParams = useSearchParams();
  const encodedData = searchParams.get("data");
  const parsedData = encodedData
    ? JSON.parse(decodeURIComponent(encodedData))
    : null;

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
        <MultipleActions
          heading="Add Amount"
          defaultObject={defaultObject}
          API={API}
          headTitles={amountHeadTitles}
          TableRow={AmountTableRow}
          module="amountModule"
          parsedData={parsedData}
          submitKey={{ investor_id: parsedData?.investor_id }}
          isUpdate={paths?.updateAmount === pathname}
          detailsHeading="Investor Details"
          DetailsTable={
            <TableWrapper
              headerList={investorDetailsheadTitles}
              items={[parsedData] || []}
              TableRow={InvestorTableRow}
              onClickHandler={() => {}}
            />
          }
        />
      </ConditionalRenderer>

      <ConditionalRenderer
        condition={
          paths?.addPurchase === pathname || paths?.updatePurchase === pathname
        }
      >
        <MultipleActions
          heading="Add Purchase"
          defaultObject={purchaseDefaultObject}
          API={purchaseAPI}
          headTitles={purchaseHeadTitles}
          TableRow={PurchaseTableRow}
          module="purchaseModule"
          parsedData={parsedData}
          submitKey={{ amount_id: parsedData?.amount_id }}
          isUpdate={paths?.updatePurchase === pathname}
          detailsHeading="Amount Details"
          DetailsTable={
            <TableWrapper
              headerList={amountHeadTitles?.filter(
                (item, index) => index !== 3
              )}
              items={[parsedData?.amount_details] || []}
              TableRow={AmountTableRow}
              onClickHandler={() => {}}
              isButtons={false}
            />
          }
        />
      </ConditionalRenderer>
      <ConditionalRenderer
        condition={
          paths?.addSell === pathname || paths?.updateSell === pathname
        }
      >
        <MultipleActions
          heading="Add Sell"
          defaultObject={sellDefaultObject}
          API={sellAPI}
          headTitles={sellHeadTitles}
          TableRow={SellTableRow}
          module="sellModule"
          parsedData={parsedData}
          submitKey={{ purchase_id: parsedData?.purchase_id }}
          isUpdate={paths?.updateSell === pathname}
          detailsHeading="Purchase Details"
          DetailsTable={
            <TableWrapper
              headerList={purchaseHeadTitles?.filter(
                (item, index) => index !== 7
              )}
              items={[parsedData] || []}
              TableRow={PurchaseTableRow}
              onClickHandler={() => {}}
              isButtons={false}
            />
          }
        />
      </ConditionalRenderer>

      <ConditionalRenderer
        condition={
          paths?.extraExpense === pathname ||
          paths?.updateExtraExpense === pathname
        }
      >
        <MultipleActions
          heading="Add Extra Expense"
          defaultObject={extraExpenseDefaultObject}
          API={extraExpenseAPI}
          headTitles={extraExpenseHeadTitles}
          TableRow={ExtraExpenseTableRow}
          module="extraExpenseModule"
          parsedData={parsedData}
          submitKey={{ purchase_id: parsedData?.purchase_id }}
          isUpdate={paths?.updateExtraExpense === pathname}
          DetailsTable={<></>}
        />
      </ConditionalRenderer>
    </div>
  );
}

export default withAuth(Actions);
