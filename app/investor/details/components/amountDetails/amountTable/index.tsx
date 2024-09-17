import { useRouter } from "next/navigation";
import { Button, ConditionalRenderer } from "@/app/components";
import { headTitles } from "./helpers";
import React from "react";

function AmountTable({ data, setView }: any) {
  const router = useRouter();

  function onClickHandler(type: any, elem: any) {
    if (type === "updateAmount") {
      const serializedObject = encodeURIComponent(JSON.stringify(elem));
      router.push(`updateAmount?data=${serializedObject}`);
      return;
    }
    if (type === "addPurchase") {
      const serializedObject = encodeURIComponent(JSON.stringify(elem));
      router.push(`addPurchase?data=${serializedObject}`);
      return;
    }

    if (type === "viewPurchase") {
      setView(elem);
      return;
    }
  }

  const modifiedData = data?.map((item: any) => {
    return {
      ...item,
      amount_id: item?.amountDetails?.map((item: any) => item.amount_id),
    };
  });

  const allAmountIds = modifiedData?.map((elem: any) => elem.amount_id).flat();

  const isMultiplePurchase = data
    ?.map((elem: any) => {
      return elem.amountDetails?.map((detail: any) => detail.is_purchase);
    })
    ?.flat();

  return (
    <>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            {headTitles?.map((elem: any, index: number) => (
              <th className="border px-4 py-2" key={index}>
                {elem.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {modifiedData?.map((elem: any, index: number) => (
            <TableRow
              elem={elem}
              index={index}
              onClickHandler={onClickHandler}
              isSingleInvestor={modifiedData?.length <= 1}
            />
          ))}
          <ConditionalRenderer condition={modifiedData?.length > 1}>
            <tr>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td className="px-2 py-4">
                <div className="flex items-center justify-center cursor-pointer">
                  <Button
                    className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
                    onClick={() =>
                      onClickHandler(
                        isMultiplePurchase?.includes(true)
                          ? "viewPurchase"
                          : "addPurchase",
                        { amount_id: allAmountIds }
                      )
                    }
                  >
                    {isMultiplePurchase?.includes(true) ? "View" : "Add"}{" "}
                    Purchase
                  </Button>
                </div>
              </td>
            </tr>
          </ConditionalRenderer>
        </tbody>
      </table>
    </>
  );
}

function TableRow({
  elem,
  className = "",
  index,
  onClickHandler,
  isSingleInvestor,
}: any) {
  return (
    <>
      <React.Fragment key={index}>
        {elem.amountDetails?.map((amount: any, idx: number) => (
          <tr
            key={idx}
            className={`${
              idx === elem.amount_id.length - 1
                ? "border-b-black border-b-[1px]"
                : ""
            } text-[14px] text-center`}
          >
            {idx === 0 && (
              <>
                <td
                  className="border border-black px-4 py-2"
                  rowSpan={elem.amount_id.length}
                >
                  {elem.investor_id}
                </td>
              </>
            )}

            <td className="px-2 py-4">{amount?.amount_id}</td>
            <td className="px-2 py-4">{amount?.investor_amount}</td>
            <td className="px-2 py-4">{amount?.investor_amount_type}</td>
            <td className="px-2 py-4">{amount?.investor_amount_date}</td>
            <td className="px-2 py-4">
              <Button
                className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
                onClick={() => onClickHandler("updateAmount", amount)}
              >
                Update
              </Button>
            </td>

            <ConditionalRenderer condition={isSingleInvestor}>
              <tr>
                <td className="px-2 py-4">
                  <div className="flex items-center justify-center cursor-pointer">
                    <Button
                      className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
                      onClick={() =>
                        onClickHandler(
                          amount?.is_purchase ? "viewPurchase" : "addPurchase",
                          {
                            amount_id: [amount.amount_id],
                            amount_details: amount,
                          }
                        )
                      }
                    >
                      {amount?.is_purchase ? "View" : "Add"} Purchase
                    </Button>
                  </div>
                </td>
              </tr>
            </ConditionalRenderer>

            {/* {idx === 0 && (
              <>
              </>
            )} */}
          </tr>
        ))}
      </React.Fragment>
    </>
  );
}

export { AmountTable };
