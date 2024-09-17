"use client";

import { Fragment } from "react";
import { Button, TableWrapper } from "../components";
import { useRouter } from "next/navigation";
import { UseApiCall } from "../hooks";
import { headTitles } from "./helpers";
import withAuth from "../withAuth";

function Investor() {
  const router = useRouter();

  function handleInvestor() {
    router.push(`investor/add`);
    return;
  }

  const {
    data: investorsList = { data: [] },
    isLoading,
    error,
    refetch,
  } = UseApiCall({
    url: "users/investors/2015/investorsList",
    method: "GET",
  });

  function onClickHandler(type: any, elem: any) {
    if (type === "updateInvestor") {
      // const serializedObject = encodeURIComponent(JSON.stringify(elem));
      // router.push(`investor/updateInvestor?data=${serializedObject}`);
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
  }

  const modifiedData = investorsList?.data?.map((item: any) => {
    return {
      ...item,
      investor_id: item?.investorsList?.map((item: any) => item.investor_id),
    };
  });

  return (
    <div className="mx-20">
      <h1 className="text-[20px] text-center font-bold my-5">Investor</h1>
      <div className="flex justify-end">
        <Button
          className="h-[40px] bg-[#2182b0] text-[13px] text-white rounded-[5px] px-3"
          onClick={handleInvestor}
        >
          Add Investor
        </Button>
      </div>
      <div className="mt-5 max-h-[60dvh] overflow-y-auto">
        <TableWrapper
          headerList={headTitles}
          items={modifiedData}
          TableRow={TableRow}
          onClickHandler={onClickHandler}
        />
      </div>
    </div>
  );
}

export default withAuth(Investor);

function TableRow({ elem, index, onClickHandler }: any) {
  return (
    <Fragment key={index}>
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
                    onClick={() => onClickHandler("details", elem.investor_id)}
                  >
                    View Details
                  </Button>
                </div>
              </td>
            </>
          )}
        </tr>
      ))}
    </Fragment>
  );
}
