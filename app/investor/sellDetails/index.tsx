import { Button, TableWrapper } from "@/app/components";
import { headTitles } from "./helpers";
import { useRouter } from "next/navigation";

function SellDetails({ purchaseID }: any) {
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
      <TableWrapper
        headerList={headTitles}
        items={purchaseDetails}
        TableRow={TableRow}
        onClickHandler={onClickHandler}
      />
    </div>
  );
}

function TableRow({ elem, className = "", onClickHandler }: any) {
  const sell = {
    isSell: true,
  };
  return (
    <tr
      className={
        className ||
        "even:bg-[#ECEDED] text-center text-[15px] table-fixed table w-full text-black"
      }
    >
      <td className="px-6 py-4">{elem?.sellID}</td>
      <td className="px-6 py-4">{elem?.sellBy}</td>
      <td className="px-6 py-4">{elem?.sellAmount}</td>
      <td className="px-6 py-4">{elem?.sellingDate}</td>
      <td className="px-6 py-4">{elem?.sellingPrice}</td>
      <td className="px-6 py-4">
        <Button
          className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
          onClick={onClickHandler("updateSell", elem)}
        >
          Update
        </Button>
      </td>
    </tr>
  );
}

export { SellDetails };
