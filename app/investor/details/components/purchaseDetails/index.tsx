import { Button, TableWrapper } from "@/app/components";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UseLazyApiCall } from "@/app/hooks";

const headTitles = [
  {
    id: 1,
    styling: "w-[8%] text-[14px] text-center",
    title: "Amount ID",
  },
  {
    id: 2,
    styling: "w-[8%] text-[14px] text-center",
    title: "Purchase ID",
  },
  {
    id: 3,
    styling: "w-[8%] text-[16px] text-center",
    title: "Vehicle Company",
  },
  { id: 4, styling: "w-[8%] text-[16px] text-center", title: "Vehicle Type" },
  {
    id: 5,
    styling: "w-[8%] text-[16px] text-center",
    title: "Vehicle Registration No.",
  },
  {
    id: 6,
    styling: "w-[8%] text-[16px] text-center",
    title: "Vehicle Chases No.",
  },
  { id: 7, styling: "w-[8%] text-[16px] text-center", title: "Vehicle Model" },
  {
    id: 8,
    styling: "w-[8%] text-[16px] text-center",
    title: "Vehicle Meter Reading",
  },
  {
    id: 12,
    styling: "w-[8%] text-[16px] text-center",
    title: "Purchase Amount",
  },
  {
    id: 9,
    styling: "w-[8%] text-[16px] text-center",
    title: "Purchase Date",
  },
  {
    id: 10,
    styling: "w-[8%] text-[14px] text-center",
    title: "Extra Expense",
  },
  {
    id: 11,
    styling: "w-[8%] text-[14px] text-center",
    title: "Sell",
  },
];

function PurchaseDetails({ view, setView, setData, data }: any) {
  const router = useRouter();

  const [getData, { data: purchaseDetail }] = UseLazyApiCall({
    url: "users/investors/purchaseDetails",
    method: "POST",
  }) as any;

  useEffect(() => {
    getData({ params: { amount_id: view?.amount_id } });
  }, [view]);

  useEffect(()=>{
    if(purchaseDetail?.data){
      const purchaseObj=purchaseDetail?.data?.find((item:any)=>item)
      setData({purchase_details:purchaseObj, ...data})
    }

  },[purchaseDetail])

  function onClickHandler(type: any, elem: any) {
    return () => {
      if (type === "addPurchase") {
        const serializedObject = encodeURIComponent(JSON.stringify(elem));
        router.push(`investor/addPurchase?data=${serializedObject}`);
        return;
      }
      // if (type === "updatePurchase") {
      //   const serializedObject = encodeURIComponent(JSON.stringify(elem));
      //   router.push(`updatePurchase?data=${serializedObject}`);
      //   return;
      // }
      if (type === "addSell") {
        const serializedObject = encodeURIComponent(JSON.stringify(elem));
        router.push(`addSell?data=${serializedObject}`);
        return;
      }
      if (type === "viewSell") {
        setView({ sell_id: elem?.purchase_id, ...view });

        return;
      }
      if (type === "addExtraExpense") {
        const serializedObject = encodeURIComponent(JSON.stringify(elem));
        router.push(`extraExpense?data=${serializedObject}`);
        return;
      }
      if (type === "viewExtraExpense") {
        setView({ purchase_id: elem?.purchase_id, ...view });
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
        <td className="px-2 py-4">{elem?.purchase_amount}</td>
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
      </tr>
    </>
  );
}

export { PurchaseDetails };
