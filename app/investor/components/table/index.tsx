import { useRouter } from "next/navigation";
import { Table } from "@/app/components/tableWrapper/table";
import { Button, ConditionalRenderer } from "@/app/components";
import { headTitles } from "./helpers";
import React from "react";

function InvestorsTable({ data }: any) {
  const router = useRouter();

  function onClickHandler(type: any, elem: any) {
    console.log(type, "elem");
    if (type === "updateInvestor") {
      const serializedObject = encodeURIComponent(JSON.stringify(elem));
      router.push(`investor/updateInvestor?data=${serializedObject}`);
      return;
    }

    if (type === "addAmount") {
      const serializedObject = encodeURIComponent(JSON.stringify(elem));
      router.push(`investor/addAmount?data=${serializedObject}`);
      return;
    }

    if (type === "details") {
      const serializedObject = encodeURIComponent(JSON.stringify(elem));
      router.push(`investor/details?data=${serializedObject}`);
      return;
    }
    return () => {};
  }

  const modifiedData = data?.map((item: any) => {
    return {
      ...item,
      investor_id: item?.investorsList?.map((item: any) => item.investor_id),
    };
  });

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
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

function TableRow({ elem, index, className = "", onClickHandler }: any) {
  return (
    <>
      <React.Fragment key={index}>
        {elem.investorsList?.map((investor: any, idx: number) => (
          <tr
            key={idx}
            className={`${
              idx === elem.investorsList.length - 1
                ? "border-b-black border-b-[1px]"
                : ""
            } text-[14px] text-center`}
          >
            {idx === 0 && (
              <>
                <td
                  className="border border-black px-4 py-2"
                  rowSpan={elem.investorsList.length}
                >
                  {elem.trackingID}
                </td>
              </>
            )}
            <td className="px-2 py-4">{investor?.investor_id}</td>
            <td className="px-2 py-4">{investor?.investor_name}</td>
            <td className="px-2 py-4">{investor?.phone_number}</td>
            <td className="px-2 py-4">{investor?.investor_cnic}</td>
            <td className="px-2 py-4">
              <Button
                className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
                onClick={() => onClickHandler("updateInvestor", investor)}
              >
                Update
              </Button>
            </td>
            <td className="px-2 py-4">
              <Button
                className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
                onClick={() => onClickHandler("remove", investor)}
              >
                Remove
              </Button>
            </td>
            <td className="px-2 py-4">
              <Button
                className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
                onClick={() => onClickHandler("addAmount", investor)}
              >
                Add Amount
              </Button>
            </td>
            {idx === 0 && (
              <>
                <td className="px-2 py-4" rowSpan={elem.investorsList.length}>
                  <div className="flex items-center justify-center cursor-pointer">
                    <Button
                      className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
                      onClick={() =>
                        onClickHandler("details", elem.investor_id)
                      }
                    >
                      View Details
                    </Button>
                  </div>
                </td>
              </>
            )}
          </tr>
        ))}
      </React.Fragment>
    </>
  );
}

export { InvestorsTable };

{
  /* <tr
  className={
    className ||
    "even:bg-[#ECEDED] text-center border-b-[2px] border-b-[#686868] text-[15px] table-fixed table w-full text-black"
  }
>
  <td className="px-2 py-4">{elem?.investor_id}</td>
  <td className="px-2 py-4">{elem?.investor_name}</td>
  <td className="px-2 py-4">{elem?.phone_number}</td>
  <td className="px-2 py-4">{elem?.investor_cnic}</td>
  <td className="px-2 py-4">
    <Button
      className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
      onClick={onClickHandler("updateInvestor", elem)}
    >
      Update
    </Button>
  </td>
  <td className="px-2 py-4">
    <Button
      className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
      onClick={onClickHandler("remove", elem)}
    >
      Remove
    </Button>
  </td>
  <td className="px-2 py-4">
    <Button
      className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
      onClick={onClickHandler("addAmount", elem)}
    >
      Add Amount
    </Button>
  </td>
  <td className="px-2 py-4">
    <div className="flex items-center justify-center cursor-pointer">
      <Button
        className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
        onClick={onClickHandler("details", investor_id)}
      >
        View Details
      </Button>
    </div>
  </td>
</tr> */
}
