import React from "react";
import { useRouter } from "next/navigation";
import { Button, ConditionalRenderer } from "@/app/components";
import { amountDetailsheadTitles } from "@/app/utils";

function AmountTable({ data = {}, setView, setData, parsedData }: any) {
  const router = useRouter();

  function onClickHandler(type: any, elem: any) {
    if (type === "updateAmount") {
      const serializedObject = encodeURIComponent(JSON.stringify(elem));
      router.push(`updateAmount?data=${serializedObject}`);
      return;
    }
    if (type === "addPurchase") {
      const serializedObject = encodeURIComponent(
        JSON.stringify({ amount_id: elem })
      );
      router.push(`addPurchase?data=${serializedObject}`);
      return;
    }

    if (type === "viewPurchase") {
      setView({
        amount_id: elem?.amount_id,
      });
      setData({ amount_details: elem });
      return;
    }
  }

  return (
    <>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            {amountDetailsheadTitles?.map((elem: any, index: number) => (
              <th className="border px-4 py-2" key={index}>
                {elem.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* for singleINvesotr We Added */}
          <ConditionalRenderer condition={parsedData?.length === 1}>
            {[data]?.map((elem: any, index: number) => (
              <SingleInvestorTableRow
                elem={elem}
                index={index}
                onClickHandler={onClickHandler}
              />
            ))}
          </ConditionalRenderer>
          <ConditionalRenderer condition={parsedData?.length > 1}>
            {[data]?.map((elem: any, index: number) => (
              <TableRow
                elem={elem}
                index={index}
                onClickHandler={onClickHandler}
              />
            ))}
          </ConditionalRenderer>
        </tbody>
      </table>
    </>
  );
}

function SingleInvestorTableRow({ elem, index, onClickHandler }: any) {
  return (
    <>
      <React.Fragment key={index}>
      {elem?.is_not_purchase_items?.map((isHead: any) => {
          return (
            <>
              {isHead?.amount_details?.map((is_not_purchase: any, idx: any) => {
                return (
                  <>
                    {is_not_purchase?.amount_details?.map(
                      (item: any, amountIdx: any) => {
                        return (
                          <tr
                            key={amountIdx}
                            className={`${
                              amountIdx ===
                              is_not_purchase?.amount_details?.length - 1
                                ? "border-b-black border-b-[1px]"
                                : ""
                            } text-[14px] text-center`}
                          >
                            {/* Display the investor_id only for the first row of each investor's amounts */}
                              <td
                                className="border border-black px-4 py-2"
                                // rowSpan={is_not_purchase?.amount_details?.length}
                              >
                                {is_not_purchase?.investor_id}
                              </td>

                            {/* Display the amount details */}
                            <td className="px-2 py-4">{item?.amount_id}</td>
                            <td className="px-2 py-4">
                              {item?.investor_amount}
                            </td>
                            <td className="px-2 py-4">
                              {item?.investor_amount_type}
                            </td>
                            <td className="px-2 py-4">
                              {item?.investor_amount_date}
                            </td>
                            <td className="px-2 py-4">
                              <Button
                                className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
                                onClick={() =>
                                  onClickHandler("updateAmount", item)
                                }
                              >
                                Update
                              </Button>
                            </td>

                            {/* Conditional rendering of the "Add Purchase" button based on investor_amount_type */}
                            <ConditionalRenderer
                              condition={
                                item?.investor_amount_type !== "Refund"
                              }
                            >
                              
                                  <td
                                    className="px-2 py-4"
                                  >
                                    <Button
                                      className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
                                      onClick={() =>
                                        onClickHandler(
                                          "addPurchase",
                                          [item?.amount_id]
                                        )
                                      }
                                    >
                                      Add Purchase
                                    </Button>
                                    <div className="flex items-center justify-center cursor-pointer"></div>
                                  </td>
                               
                            </ConditionalRenderer>
                          </tr>
                        );
                      }
                    )}
                  </>
                );
              })}
            </>
          );
        })}
        {elem?.is_purchase_items?.map((isPurchaseHead: any) => {
          return (
            <>
              {isPurchaseHead?.amount_details?.map(
                (is_purchase: any, idx: any) => {
                  return (
                    <>
                      {is_purchase?.amount_details?.map((item: any) => {
                        return (
                          <>
                            <tr
                              key={idx}
                              className={`${
                                idx === elem?.amount_ids?.length - 1
                                  ? "border-b-black border-b-[1px]"
                                  : ""
                              } text-[14px] text-center`}
                            >
                              <td className="border border-black px-4 py-2">
                                {is_purchase?.investor_id}
                              </td>
                              <td className="px-2 py-4">{item?.amount_id}</td>
                              <td className="px-2 py-4">
                                {item?.investor_amount}
                              </td>
                              <td className="px-2 py-4">
                                {item?.investor_amount_type}
                              </td>
                              <td className="px-2 py-4">
                                {item?.investor_amount_date}
                              </td>
                              <td></td>
                              {idx === 0 && (
                                <>
                                  <td
                                    className="px-2 py-4"
                                    rowSpan={isPurchaseHead?.amount_id?.length}
                                  >
                                    <div className="flex items-center justify-center cursor-pointer">
                                      <Button
                                        className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
                                        onClick={() =>
                                          onClickHandler("viewPurchase", {
                                            amount_id:
                                              isPurchaseHead?.amount_id,
                                              amount_details:item
                                          })
                                        }
                                      >
                                        View Purchase
                                      </Button>
                                    </div>
                                  </td>
                                </>
                              )}
                            </tr>
                          </>
                        );
                      })}
                    </>
                  );
                }
              )}
            </>
          );
        })}
      </React.Fragment>
    </>
  );
}

function TableRow({ elem, index, onClickHandler }: any) {
  return (
    <>
      <React.Fragment key={index}>
        {elem?.is_not_purchase_items?.map((isHead: any) => {
          return (
            <>
              {isHead?.amount_details?.map((is_not_purchase: any, idx: any) => {
                return (
                  <>
                    {is_not_purchase?.amount_details?.map(
                      (item: any, amountIdx: any) => {
                        return (
                          <tr
                            key={amountIdx}
                            className={`${
                              amountIdx ===
                              is_not_purchase?.amount_details?.length - 1
                                ? "border-b-black border-b-[1px]"
                                : ""
                            } text-[14px] text-center`}
                          >
                            {/* Display the investor_id only for the first row of each investor's amounts */}
                            {amountIdx === 0 && (
                              <td
                                className="border border-black px-4 py-2"
                                rowSpan={
                                  is_not_purchase?.amount_details?.length
                                }
                              >
                                {is_not_purchase?.investor_id}
                              </td>
                            )}

                            {/* Display the amount details */}
                            <td className="px-2 py-4">{item?.amount_id}</td>
                            <td className="px-2 py-4">
                              {item?.investor_amount}
                            </td>
                            <td className="px-2 py-4">
                              {item?.investor_amount_type}
                            </td>
                            <td className="px-2 py-4">
                              {item?.investor_amount_date}
                            </td>
                            <td className="px-2 py-4">
                              <Button
                                className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
                                onClick={() =>
                                  onClickHandler("updateAmount", item)
                                }
                              >
                                Update
                              </Button>
                            </td>

                            {/* Conditional rendering of the "Add Purchase" button based on investor_amount_type */}
                            <ConditionalRenderer
                              condition={
                                item?.investor_amount_type !== "Refund"
                              }
                            >
                              {idx === 0 && amountIdx===0 && (
                                <>
                                  <td
                                    className="px-2 py-4"
                                    rowSpan={isHead?.amount_id?.length}
                                  >
                                    <Button
                                      className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
                                      onClick={() =>
                                        onClickHandler(
                                          "addPurchase",
                                          isHead?.amount_id
                                        )
                                      }
                                    >
                                      Add Purchase
                                    </Button>
                                    <div className="flex items-center justify-center cursor-pointer"></div>
                                  </td>
                                </>
                              )}
                            </ConditionalRenderer>
                          </tr>
                        );
                      }
                    )}
                  </>
                );
              })}
            </>
          );
        })}
        {elem?.is_purchase_items?.map((isPurchaseHead: any) => {
          return (
            <>
              {isPurchaseHead?.amount_details?.map(
                (is_purchase: any, idx: any) => {
                  const isLastAmountId = idx === isPurchaseHead?.amount_id?.length - 1;
                  return (
                    <>
                      {is_purchase?.amount_details?.map((item: any, itemIdx:any) => {
                        return (
                          <>
                            <tr
                              key={idx}
                              className={`${
                                isLastAmountId
                                  ? "border-b-black border-b-[1px]"
                                  : ""
                              } text-[14px] text-center`}
                            >
                              <td className="border border-black px-4 py-2">
                                {is_purchase?.investor_id}
                              </td>
                              <td className="px-2 py-4">{item?.amount_id}</td>
                              <td className="px-2 py-4">
                                {item?.investor_amount}
                              </td>
                              <td className="px-2 py-4">
                                {item?.investor_amount_type}
                              </td>
                              <td className="px-2 py-4">
                                {item?.investor_amount_date}
                              </td>
                              <td></td>
                              {itemIdx === 0 && idx===0 && (
                                <>
                                  <td
                                    className="px-2 py-4"
                                    rowSpan={isPurchaseHead?.amount_id?.length}
                                  >
                                    <div className="flex items-center justify-center cursor-pointer">
                                      <Button
                                        className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
                                        onClick={() =>
                                          onClickHandler("viewPurchase", {
                                            amount_id:
                                              isPurchaseHead?.amount_id,
                                              amount_details:item
                                          })
                                        }
                                      >
                                        View Purchase
                                      </Button>
                                    </div>
                                  </td>
                                </>
                              )}
                            </tr>
                          </>
                        );
                      })}
                    </>
                  );
                }
              )}
            </>
          );
        })}
      </React.Fragment>
    </>
  );
}

// function TableRow({ elem, index, onClickHandler, isSingleInvestor }: any) {
//   return (
//     <>
//       <React.Fragment key={index}>
//         {elem?.amount_details?.map((amount: any, idx: number) => {
//           return (
//             <tr
//               key={idx}
//               className={`${
//                 idx === elem?.amount_ids?.length - 1
//                   ? "border-b-black border-b-[1px]"
//                   : ""
//               } text-[14px] text-center`}
//             >
//               {idx === 0 && (
//                 <>
//                   <td
//                     className="border border-black px-4 py-2"
//                     rowSpan={elem?.amount_ids?.length}
//                   >
//                     {elem?.investor_id}
//                   </td>
//                 </>
//               )}

//               <td className="px-2 py-4">{amount?.amount_id}</td>
//               <td className="px-2 py-4">{amount?.investor_amount}</td>
//               <td className="px-2 py-4">{amount?.investor_amount_type}</td>
//               <td className="px-2 py-4">{amount?.investor_amount_date}</td>
//               <td className="px-2 py-4">
//                 <Button
//                   className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
//                   onClick={() => onClickHandler("updateAmount", amount)}
//                 >
//                   Update
//                 </Button>
//               </td>

//               <ConditionalRenderer
//                 condition={
//                   isSingleInvestor && amount?.investor_amount_type !== "Refund"
//                 }
//               >
//                 <tr>
//                   <td className="px-2 py-4">
//                     <div className="flex items-center justify-center cursor-pointer">
//                       <Button
//                         className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
//                         onClick={() =>
//                           onClickHandler(
//                             amount?.is_purchase
//                               ? "viewPurchase"
//                               : "addPurchase",
//                             {
//                               amount_id: [amount.amount_id],
//                               amount_details: amount,
//                             }
//                           )
//                         }
//                       >
//                         {amount?.is_purchase ? "View" : "Add"} Purchase
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               </ConditionalRenderer>
//             </tr>
//           );
//         })}
//       </React.Fragment>
//     </>
//   );
// }

export { AmountTable };
