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
    investor_name: "",
    // phoneNumber: 0,
    investor_cnic: "",
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
        elem.investor_cnic === investorData.investor_cnic ? { ...investorData } : elem
      );
      setInvestorList(updatedInvestorList);
      setInvestorData({
        investor_name: "",
        // phoneNumber: 0,
        investor_cnic: "",
      });
      setIsEdit(false);
      return;
    }
    // const newInvestor = {
    //   ...investorData,
    //   investorID: Date.now(),
    // };
    setInvestorList([...investorList, investorData]);
    setInvestorData({
      investor_name: "",
      // phoneNumber: 0,
      investor_cnic: "",
    });
  }

  const investorInputItems = [
    {
      type: "text",
      label: "Investor Name",
      name: "investor_name",
      value: investorData.investor_name,
    },
    // {
    //   type: "number",
    //   label: "Phone Number",
    //   name: "phoneNumber",
    //   value: investorData.phoneNumber,
    // },
    {
      type: "number",
      label: "investor_cnic",
      name: "investor_cnic",
      value: investorData.investor_cnic,
    },
  ];

  function onSubmit() {
    // investorList
const userId=2011;

    const apiUrl= `http://localhost:3001/users/${userId}/investors`

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({investorsList:investorList})
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message || 'Something went wrong');
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('Investor added successfully:', data);
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
  }

  return (
    <div className="mx-20">
      <ConditionalRenderer condition={isUpdate}>
        <h1 className="font-bold text-center text-[20px] my-5">
          Update Investor
        </h1>
        <h1 className="font-bold text-[20px] my-5">
          {/* Investor ID {investorData.investorID} */}
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
      <td className="px-2 py-4">{elem?.investorId}</td>
      <td className="px-2 py-4">{elem?.investor_name}</td>
      <td className="px-2 py-4">{elem?.phoneNumber}</td>
      <td className="px-2 py-4">{elem?.investor_cnic}</td>
      <td className="px-2 py-4">
        <Button
          className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
          onClick={onClickHandler("edit", elem)}
        >
          Edit
        </Button>
      </td>
      <td className="px-2 py-4">
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
