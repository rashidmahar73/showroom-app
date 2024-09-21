import { TableWrapper } from "@/app/components";
import { headTitles } from "./helpers";
import { UseLazyApiCall } from "@/app/hooks";
import { useEffect } from "react";

function SellDetails({ view }: any) {
  // purchaseID API Call Happen

  const [getData, { data: sellDetail }] = UseLazyApiCall({
    url: "users/investors/sellDetail",
    method: "POST",
  }) as any;

  useEffect(() => {
    getData({ params: { purchase_id: view?.sell_id } });
  }, []);

  function onClickHandler(type: any, elem: any) {
    return () => {
      // if (type === "updateSell") {
      //   const serializedObject = encodeURIComponent(JSON.stringify(elem));
      //   router.push(`investor/updateSell?data=${serializedObject}`);
      //   return;
      // }
    };
  }

  return (
    <div>
      <h1 className="text-[20px] font-bold my-5">Sell</h1>
      <TableWrapper
        headerList={headTitles}
        items={sellDetail?.data || []}
        TableRow={TableRow}
        onClickHandler={onClickHandler}
      />
    </div>
  );
}

function TableRow({ elem, className = "", onClickHandler }: any) {
  return (
    <tr
      className={
        className ||
        "even:bg-[#ECEDED]  border-b-[2px] border-b-[#686868] text-center text-[14px] w-full text-black"
      }
    >
      <td className="px-2 py-4">{elem?.purchase_id}</td>
      <td className="px-2 py-4">{elem?.sell_id}</td>
      <td className="px-2 py-4">{elem?.sell_by}</td>
      <td className="px-2 py-4">{elem?.sell_amount}</td>
      <td className="px-2 py-4">{elem?.selling_date}</td>
      <td className="px-2 py-4">{elem?.selling_price}</td>
      {/* <td className="px-2 py-4">
        <Button
          className="h-[30px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
          onClick={onClickHandler("updateSell", elem)}
        >
          Update
        </Button>
      </td> */}
    </tr>
  );
}

export { SellDetails };
