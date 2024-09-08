import { Button, TableWrapper } from "@/app/components";
import { headTitles } from "./helpers";
import { useRouter } from "next/navigation";

function ExtraExpense() {
  const router = useRouter();

  const extraExpenseDetails = [
    {
      extraExpenseID: 0,
      workshopName: "Honda",
      dateModified: "2024-10-10",
      totalExpense: 12312312,
      detail: 87787,
      otherExpense: 877887,
    },
  ];

  function onClickHandler(type: any, elem: any) {
    return () => {
      if (type === "update") {
        const serializedObject = encodeURIComponent(JSON.stringify(elem));
        router.push(`investor/updateExtraExpense?data=${serializedObject}`);
        return;
      }
      if (type === "remove") {
      }
    };
  }
  return (
    <div>
      <h1 className="text-[20px] font-bold my-5">Extra Expense</h1>
      <TableWrapper
        headerList={headTitles}
        items={extraExpenseDetails || []}
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
          "even:bg-[#ECEDED] text-center text-[14px] table-fixed table w-full text-black"
        }
      >
        <td className="px-2 py-4">{elem?.extraExpenseID}</td>
        <td className="px-2 py-4">{elem?.workshopName}</td>
        <td className="px-2 py-4">{elem?.dateModified}</td>
        <td className="px-2 py-4">{elem?.totalExpense}</td>
        <td className="px-2 py-4">{elem?.detail}</td>
        <td className="px-2 py-4">{elem?.otherExpense}</td>
        <td className="px-2 py-4">
          <Button
            className="h-[30px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
            onClick={onClickHandler("update", elem)}
          >
            Update
          </Button>
        </td>
      </tr>
    </>
  );
}

export { ExtraExpense };
