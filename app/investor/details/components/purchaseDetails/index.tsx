import { Button, TableWrapper } from "@/app/components";
import { headTitles } from "./helpers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UseLazyApiCall } from "@/app/hooks";

function PurchaseDetails({ amountDetails, view, setView, setSellView }: any) {
  const router = useRouter();

  const [getData, { data: purchaseDetail }] = UseLazyApiCall({
    url: "users/investors/purchaseDetails",
    method: "POST",
  }) as any;

  useEffect(() => {
    getData({ params: { amount_id: amountDetails?.amount_id } });
  }, [view]);

  function onClickHandler(type: any, elem: any) {
    return () => {
      if (type === "addPurchase") {
        const serializedObject = encodeURIComponent(JSON.stringify(elem));
        router.push(`investor/addPurchase?data=${serializedObject}`);
        return;
      }
      if (type === "updatePurchase") {
        const serializedObject = encodeURIComponent(JSON.stringify(elem));
        router.push(`updatePurchase?data=${serializedObject}`);
        return;
      }
      if (type === "addSell") {
        const serializedObject = encodeURIComponent(JSON.stringify(elem));
        router.push(`addSell?data=${serializedObject}`);
        return;
      }
      if (type === "viewSell") {
        setSellView(elem);
        return;
      }
      if (type === "addExtraExpense") {
        const serializedObject = encodeURIComponent(JSON.stringify(elem));
        router.push(`extraExpense?data=${serializedObject}`);
        return;
      }
      if (type === "viewExtraExpense") {
        setView(elem);
        return;
      }
    };
  }

  return (
    <div>
      <h1 className="text-[20px] font-bold my-5">Purchase Details</h1>
      <TableWrapper
        headerList={headTitles}
        items={purchaseDetail?.data || []}
        TableRow={TableRow}
        onClickHandler={onClickHandler}
      />
    </div>
  );
}

function TableRow({ elem, className = "", onClickHandler }: any) {
  return (
    <>
      <tr
        className={
          className ||
          "text-center text-[14px] border-b-[2px] border-b-[#686868] w-full text-black"
        }
      >
        <td className="px-2 py-4">{elem?.amount_id?.toString()}</td>
        <td className="px-2 py-4">{elem?.purchase_id}</td>
        <td className="px-2 py-4">{elem?.vehicle_company}</td>
        <td className="px-2 py-4">{elem?.vehicle_type}</td>
        <td className="px-2 py-4">{elem?.vehicle_registration_no}</td>
        <td className="px-2 py-4">{elem?.vehicle_chases_no}</td>
        <td className="px-2 py-4">{elem?.vehicle_model}</td>
        <td className="px-2 py-4">{elem?.vehicle_meter_reading}</td>
        <td className="px-2 py-4">{elem?.purchase_date}</td>
        <td className="px-2 py-4">
          <Button
            className="h-[50px] bg-[#2182b0] text-[13px] w-[80px] text-white rounded-[5px]"
            onClick={onClickHandler(
              elem?.is_extra_expense ? "viewExtraExpense" : "addExtraExpense",
              elem
            )}
          >
            {elem?.is_extra_expense ? "View" : "Add"} Extra Expense
          </Button>
        </td>
        <td className="px-2 py-4">
          <Button
            className="h-[35px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
            onClick={onClickHandler(
              elem?.is_sell ? "viewSell" : "addSell",
              elem
            )}
          >
            {elem?.is_sell ? "View" : "Add"} Sell
          </Button>
        </td>
        <td className="px-2 py-4">
          <Button
            className="h-[35px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
            onClick={onClickHandler("updatePurchase", elem)}
          >
            Update
          </Button>
        </td>
      </tr>
    </>
  );
}

export { PurchaseDetails };
