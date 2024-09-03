"use client";

import {
  InputField,
  Button,
  TableWrapper,
  ConditionalRenderer,
} from "@/app/components";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { headTitles } from "./helpers";
import { InputGrid } from "../../components";

function AddOrUpdateInvestor() {
  const [investorList, setInvestorList] = useState<any>([]);
  const [investorData, setInvestorData] = useState({
    investorID: 0,
    investorName: "",
    phoneNumber: 0,
    CNIC: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isUpdate = pathname?.includes("update");

  const encodedData = searchParams.get("data");
  const parsedData = encodedData
    ? JSON.parse(decodeURIComponent(encodedData))
    : null;

  useEffect(() => {
    if (parsedData) return setInvestorData(parsedData);
  }, []);

  function onClickHandler(type: any, elem: any) {
    return () => {
      if (type === "remove") {
        const updatedInvestorList = investorList.filter(
          (listItem: any) => elem.investorID !== listItem.investorID
        );
        setInvestorList(updatedInvestorList);
        return;
      }

      setInvestorData(elem);
      setIsEdit(true);
    };
  }

  function onClickAction() {
    if (isEdit) {
      const updatedInvestorList = investorList.map((elem: any) =>
        elem.investorID === investorData.investorID ? { ...investorData } : elem
      );
      setInvestorList(updatedInvestorList);
      setInvestorData({
        investorID: 0,
        investorName: "",
        phoneNumber: 0,
        CNIC: "",
      });
      setIsEdit(false);
      return;
    }
    const newInvestor = {
      ...investorData,
      investorID: Date.now(),
    };
    setInvestorList([...investorList, newInvestor]);
    setInvestorData({
      investorID: 0,
      investorName: "",
      phoneNumber: 0,
      CNIC: "",
    });
  }

  const investorInputItems = [
    {
      type: "text",
      label: "Investor Name",
      name: "investorName",
      value: investorData.investorName,
    },
    {
      type: "number",
      label: "Phone Number",
      name: "phoneNumber",
      value: investorData.phoneNumber,
    },
    {
      type: "number",
      label: "CNIC",
      name: "CNIC",
      value: investorData.CNIC,
    },
  ];

  function onSubmit() {
    const data = [
      {
        trackingId: Date.now(),
        investorList: investorList,
      },
    ];
  }

  return (
    <div className="mx-20">
      <ConditionalRenderer condition={isUpdate}>
        <h1 className="font-bold text-center text-[20px] my-5">
          Update Investor
        </h1>
        <h1 className="font-bold text-[20px] my-5">
          Investor ID {investorData.investorID}
        </h1>
      </ConditionalRenderer>
      <InputGrid
        items={investorInputItems}
        setState={setInvestorData}
        state={investorData}
      />
      <div className="flex justify-end mt-5">
        <Button
          className="h-[40px] text-white px-3 rounded-[5px] bg-[#2182b0]"
          onClick={onClickAction}
        >
          {isEdit || isUpdate ? "Update" : "Add"}
        </Button>
      </div>
      <ConditionalRenderer condition={!isUpdate}>
        <div className="border-[1px] border-black rounded-sm mt-5">
          <TableWrapper
            headerList={headTitles}
            items={investorList || []}
            TableRow={TableRow}
            onClickHandler={onClickHandler}
          />
        </div>

        <div className="flex justify-end mt-5">
          <Button
            className="h-[40px] text-white px-3 rounded-[5px] bg-[#2182b0]"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </ConditionalRenderer>
    </div>
  );
}

function TableRow({ elem, className = "", onClickHandler }: any) {
  return (
    <tr
      className={
        className ||
        "even:bg-[#ECEDED] text-center text-[15px] table-fixed table w-full text-black"
      }
    >
      <td className="px-6 py-4">{elem?.investorId}</td>
      <td className="px-6 py-4">{elem?.investorName}</td>
      <td className="px-6 py-4">{elem?.phoneNumber}</td>
      <td className="px-6 py-4">{elem?.CNIC}</td>
      <td className="px-6 py-4">
        <Button
          className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
          onClick={onClickHandler("edit", elem)}
        >
          Edit
        </Button>
      </td>
      <td className="px-6 py-4">
        <Button
          className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
          onClick={onClickHandler("remove", elem)}
        >
          Remove
        </Button>
      </td>
    </tr>
  );
}

export { AddOrUpdateInvestor };
