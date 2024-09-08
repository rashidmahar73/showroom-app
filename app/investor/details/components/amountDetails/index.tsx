import { Button, ConditionalRenderer, TableWrapper } from "@/app/components";
import { amountDetails, headTitles, insa } from "./helpers";

function AmountDetails() {
  const removeColumn = headTitles?.filter((elem) => elem.title !== "Purchase");
  const modifedHeadTitles = insa?.length > 1 ? removeColumn : headTitles;

  return (
    <>
      <h1 className="text-[20px] font-bold my-5">Amount Details</h1>
      <TableWrapper
        headerList={modifedHeadTitles}
        items={amountDetails || []}
        TableRow={TableRow}
        onClickHandler={() => {}}
      />

      <ConditionalRenderer condition={insa?.length > 1}>
        <div className="flex justify-end my-4">
          <Button
            className="h-[30px] my-1 bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
            //   onClick={onClickHandler("addPurchase", elem)}
          >
            Add Purchase
          </Button>
        </div>
      </ConditionalRenderer>
    </>
  );
}

function TableRow({ elem, className = "", onClickHandler }: any) {
  return (
    <tr
      className={
        className ||
        "text-center border-b-[2px] border-b-[#686868] text-[15px] table-fixed table w-full text-black"
      }
    >
      <td className="px-2 py-1">{elem?.amount_id}</td>
      <td className="px-2 py-1">{elem?.investor_amount}</td>
      <td className="px-2 py-1">{elem?.investor_amount_type}</td>
      <td className="px-2 py-1">{elem?.investor_amount_date}</td>
      <td className="px-2 py-1">
        <Button
          className="h-[30px] my-1 bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
          onClick={onClickHandler("updateAmount", elem)}
        >
          Update
        </Button>
      </td>
      <ConditionalRenderer condition={false}>
        <td className="px-2 py-1">
          <Button
            className="h-[30px] my-1 bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
            onClick={onClickHandler("addPurchase", elem)}
          >
            Add Purchase
          </Button>
        </td>
      </ConditionalRenderer>
    </tr>
  );
}

export { AmountDetails };
