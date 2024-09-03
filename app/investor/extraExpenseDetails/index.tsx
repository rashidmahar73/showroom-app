"use client";

import { Button, TableWrapper } from "@/app/components";
import { useRouter } from "next/navigation";
import { headTitles } from "./helpers";

function ExtraExpenseDetails({ amountID }: any) {
  const router = useRouter();

  // onBasis of AmountID API Call happen

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
      <TableWrapper
        headerList={headTitles}
        items={extraExpenseDetails}
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
          "even:bg-[#ECEDED] text-center text-[15px] table-fixed table w-full text-black"
        }
      >
        <td className="px-6 py-4">{elem?.extraExpenseID}</td>
        <td className="px-6 py-4">{elem?.workshopName}</td>
        <td className="px-6 py-4">{elem?.dateModified}</td>
        <td className="px-6 py-4">{elem?.totalExpense}</td>
        <td className="px-6 py-4">{elem?.detail}</td>
        <td className="px-6 py-4">{elem?.otherExpense}</td>
        <td className="px-6 py-4">
          <Button
            className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
            onClick={onClickHandler("update", elem)}
          >
            Update
          </Button>
        </td>
      </tr>
    </>
  );
}

export { ExtraExpenseDetails };
