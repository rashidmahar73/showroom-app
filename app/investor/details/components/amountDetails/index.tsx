import { ConditionalRenderer } from "@/app/components";
import { UseLazyApiCall } from "@/app/hooks";
import { useEffect } from "react";
import { AmountTable } from "./amountTable";

function AmountDetails({ setView, parsedData }: any) {
  const [getData, { data: amountData }] = UseLazyApiCall({
    url: "users/investors/amountDetails",
    method: "POST",
  }) as any;

  useEffect(() => {
    getData({ params: { investor_ids: parsedData } });
  }, []);

  return (
    <>
      <h1 className="text-[20px] font-bold my-5">Amount Details</h1>
        <AmountTable data={amountData?.data} setView={setView} />
    </>
  );
}

export { AmountDetails };
