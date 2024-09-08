import { Button, TableWrapper } from "@/app/components";
import { headTitles } from "./helpers";
import { useRouter } from "next/navigation";

function SellDetails() {
  const router = useRouter();
  // purchaseID API Call Happen

  const purchaseDetails = [
    {
      sellID: 0,
      sellBy: "Ahmad",
      sellAmount: 12312312,
      sellingDate: "2024-10-10",
      sellingPrice: 877887,
    },
  ];
  function onClickHandler(type: any, elem: any) {
    return () => {
      if (type === "updateSell") {
        const serializedObject = encodeURIComponent(JSON.stringify(elem));
        router.push(`investor/updateSell?data=${serializedObject}`);
        return;
      }
    };
  }
  return (
    <div>
      <h1 className="text-[20px] font-bold my-5">Sell</h1>
      <TableWrapper
        headerList={headTitles}
        items={purchaseDetails || []}
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
        "even:bg-[#ECEDED] text-center text-[14px] table-fixed table w-full text-black"
      }
    >
      <td className="px-2 py-4">{elem?.sellID}</td>
      <td className="px-2 py-4">{elem?.sellBy}</td>
      <td className="px-2 py-4">{elem?.sellAmount}</td>
      <td className="px-2 py-4">{elem?.sellingDate}</td>
      <td className="px-2 py-4">{elem?.sellingPrice}</td>
      <td className="px-2 py-4">
        <Button
          className="h-[30px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
          onClick={onClickHandler("updateSell", elem)}
        >
          Update
        </Button>
      </td>
    </tr>
  );
}

export { SellDetails };
