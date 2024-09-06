"use client";

import { Button, ConditionalRenderer, TableWrapper } from "../components";
import { useRouter } from "next/navigation";
import { headTitles, investorData } from "./helpers";
import { DownArrowIcon } from "../icons";
import { AmountDetails } from "./amountDetails";
import { useState } from "react";

function Investor() {
  const router = useRouter();

  function handleInvestor() {
    router.push(`investor/add`);
  }

  function onClickHandler(type: any, elem: any) {
    return () => {
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
    };
  }

  return (
    <div className="mx-20">
      <h1 className="text-[20px] text-center font-bold">Investor</h1>
      <div className="flex justify-end">
        <Button
          className="h-[40px] bg-[#2182b0] text-white rounded-[5px] px-3"
          onClick={handleInvestor}
        >
          Add Investor
        </Button>
      </div>
      <div className="border-black border-[1px] mt-5 max-h-[60dvh] overflow-y-scroll">
        {investorData?.map((elem: any) => {
          return (
            <div>
              <h1>Tracking ID</h1>
              <div className="flex justify-between">
                <h1>{elem.trackingID}</h1>
                <div>
                  <Button
                    className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 my-5 mx-5 rounded-[5px]"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <div>
                <TableWrapper
                  headerList={headTitles}
                  items={elem.investorData}
                  TableRow={TableRow}
                  onClickHandler={onClickHandler}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TableRow({ elem, className = "", onClickHandler }: any) {
  const [isOpen, setIsOpen] = useState({
    status: false,
    data: {},
  });

  function onClickAmountDetails() {
    setIsOpen({
      status: !isOpen.status,
      data: elem.investorID,
    });
  }
  const sell = {
    isSell: true,
  };

  return (
    <>
      <tr
        className={
          className ||
          "even:bg-[#ECEDED] text-center text-[15px] table-fixed table w-full text-black"
        }
      >
        <td className="px-2 py-4">{elem?.investorID}</td>
        <td className="px-2 py-4">{elem?.investorName}</td>
        <td className="px-2 py-4">{elem?.phoneNumber}</td>
        <td className="px-2 py-4">{elem?.CNIC}</td>
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
        <td className="px-2 py-4" onClick={onClickAmountDetails}>
          <div className={`${
            isOpen.status
              ? "rotate-180 transition ease-in-out delay-200"
              : "rotate-0 transition ease-in-out delay-200"
          } flex items-center justify-center cursor-pointer`}>
            <DownArrowIcon />
          </div>
        </td>
      </tr>
      <ConditionalRenderer
        condition={isOpen.status && elem?.investorID === isOpen.data}
      >
        <div>
          <AmountDetails investorID={isOpen.data} />
        </div>
      </ConditionalRenderer>
    </>
  );
}

export default Investor;
