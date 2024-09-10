import { Button, TableWrapper } from "@/app/components";
import { headTitles } from "./helpers";
import { useRouter } from "next/navigation";

function PurchaseDetails() {
  const router = useRouter();

  const purchaseDetails = [
    {
      purchaseID: 0,
      vehicleCompany: "Honda",
      vehicleType: "Car",
      vehicleRegistrationNo: 12312312,
      vehicleChasesNo: 87787,
      vehicleModel: 877887,
      vehicleMeterReading: 877887,
      purchaseDate: "2023-10-10",
    },
  ];
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
        router.push(`investor/addSell?data=${serializedObject}`);
        return;
      }
      if (type === "extraExpense") {
        const serializedObject = encodeURIComponent(JSON.stringify(elem));
        router.push(`investor/extraExpense?data=${serializedObject}`);
        return;
      }
    };
  }
  return (
    <div>
      <h1 className="text-[20px] font-bold my-5">Purchase Details</h1>
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
    <>
      <tr
        className={
          className ||
          "text-center text-[14px] border-b-[2px] border-b-[#686868] table-fixed table w-full text-black"
        }
      >
        <td className="px-2 py-4">{elem?.purchaseID}</td>
        <td className="px-2 py-4">{elem?.vehicleCompany}</td>
        <td className="px-2 py-4">{elem?.vehicleType}</td>
        <td className="px-2 py-4">{elem?.vehicleRegistrationNo}</td>
        <td className="px-2 py-4">{elem?.vehicleChasesNo}</td>
        <td className="px-2 py-4">{elem?.vehicleModel}</td>
        <td className="px-2 py-4">{elem?.vehicleMeterReading}</td>
        <td className="px-2 py-4">{elem?.purchaseDate}</td>
        <td className="px-2 py-4">
          <Button
            className="h-[30px] bg-[#2182b0] text-[13px] w-[100px] text-white rounded-[5px]"
            onClick={onClickHandler("extraExpense", elem)}
          >
            Extra Expense
          </Button>
        </td>
        <td className="px-2 py-4">
          <Button
            className="h-[30px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
            onClick={onClickHandler("addSell", elem)}
          >
            Add Sell
          </Button>
        </td>
        <td className="px-2 py-4">
          <Button
            className="h-[30px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
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
