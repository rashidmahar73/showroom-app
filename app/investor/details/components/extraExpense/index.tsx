import { TableWrapper } from "@/app/components";
import { headTitles } from "./helpers";
import { UseLazyApiCall } from "@/app/hooks";
import { useEffect } from "react";

function ExtraExpense({ view, setData, data }: any) {
  const [getData, { data: extraExpenseDetail }] = UseLazyApiCall({
    url: "users/investors/extraExpenseDetails",
    method: "POST",
  }) as any;

  useEffect(() => {
    getData({ params: { purchase_id: view?.purchase_id } });
  }, []);

  useEffect(() => {
    if (extraExpenseDetail?.data) {
      const extraExpenseObject = extraExpenseDetail?.data?.find(
        (item: any) => item
      );
      setData({ extra_expense_details: extraExpenseObject, ...data });
    }
  }, [extraExpenseDetail]);

  function onClickHandler(type: any, elem: any) {
    return () => {
      // if (type === "update") {
      //   const serializedObject = encodeURIComponent(JSON.stringify(elem));
      //   router.push(`investor/updateExtraExpense?data=${serializedObject}`);
      //   return;
      // }
      // if (type === "remove") {
      // }
    };
  }
  return (
    <div>
      <h1 className="text-[20px] font-bold my-5">Extra Expense</h1>
      <TableWrapper
        headerList={headTitles}
        items={extraExpenseDetail?.data || []}
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
          "even:bg-[#ECEDED]  border-b-[2px] border-b-[#686868] text-center text-[14px] w-full text-black"
        }
      >
        <td className="px-2 py-4">{elem?.purchase_id}</td>
        <td className="px-2 py-4">{elem?.extra_expense_id}</td>
        <td className="px-2 py-4">{elem?.workshop_name}</td>
        <td className="px-2 py-4">{elem?.date_modified}</td>
        <td className="px-2 py-4">{elem?.total_expense}</td>
        <td className="px-2 py-4">{elem?.detail}</td>
        <td className="px-2 py-4">{elem?.other_expense}</td>
        {/* <td className="px-2 py-4">
          <Button
            className="h-[30px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
            onClick={onClickHandler("update", elem)}
          >
            Update
          </Button>
        </td> */}
      </tr>
    </>
  );
}

export { ExtraExpense };
