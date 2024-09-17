"use client";

import {
  Button,
  TableWrapper,
  ConditionalRenderer,
  InputGrid,
} from "@/app/components";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { headTitles } from "./helpers";
import { UseLazyApiCall } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { toastTypesKeys } from "@/app/utils/constants";
import { hasEmptyString, toastHandler } from "@/app/utils/helpers";
import { ToastContainer } from "react-toastify";
import { UpdateInvestor } from "./updateInvestor";

function AddOrUpdateInvestor() {
  const [investorList, setInvestorList] = useState<any>([]);
  const [investorData, setInvestorData] = useState({
    investor_name: "",
    phone_number: "",
    investor_cnic: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
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
        elem.investor_cnic === investorData.investor_cnic
          ? { ...investorData }
          : elem
      );
      setInvestorList(updatedInvestorList);
      setInvestorData({
        investor_name: "",
        phone_number: "",
        investor_cnic: "",
      });
      setIsEdit(false);
      return;
    }

    setInvestorList([...investorList, investorData]);
    setInvestorData({
      investor_name: "",
      phone_number: "",
      investor_cnic: "",
    });
  }

  const investorInputItems = [
    {
      type: "text",
      label: "Name",
      name: "investor_name",
      value: investorData.investor_name,
    },
    {
      type: "number",
      label: "Phone Number",
      name: "phone_number",
      value: investorData.phone_number,
    },
    {
      type: "number",
      label: "CNIC",
      name: "investor_cnic",
      value: investorData.investor_cnic,
    },
  ];

  const [getData, { data: investorsData }] = UseLazyApiCall({
    url: "users/investors/addInvestors",
    method: "POST",
  }) as any;

  const [postInvestorsIDByUsers, { data: investorsByUsers, isLoading }] =
    UseLazyApiCall({
      url: "users/investors/byUsers",
      method: "POST",
    }) as any;

  function onSubmit() {
    const newInvestors = {
      tracking_id: Date.now(),
      investorsList: investorList,
    };

    getData({ params: newInvestors });

    const investors_add_by_users = {
      userID: 2015,
      investors_tracking_id: newInvestors?.tracking_id,
    };

    postInvestorsIDByUsers({ params: investors_add_by_users });
  }

  useEffect(() => {
    if (investorsByUsers?.status === 200) {
      toastHandler(investorsByUsers.message, toastTypesKeys.success);
      setTimeout(() => {
        router.push(`/investor`);
        return;
      }, 3000);
    }
  }, [investorsByUsers]);

  const addHeadTitles = headTitles?.filter((elem, index) => index !== 0);
  const modifiedHeadTitle = isUpdate ? headTitles : addHeadTitles;

  if (isUpdate) {
    return (
      <UpdateInvestor
        investorInputItems={investorInputItems}
        setInvestorData={setInvestorData}
        investorData={investorData}
      />
    );
  }

  const isEmptyFields = hasEmptyString(investorData);

  return (
    <div className="mx-20">
      <ToastContainer />
      <h1 className="font-bold text-center text-[20px] my-10">Add Investor</h1>
      <InputGrid
        items={investorInputItems}
        setState={setInvestorData}
        state={investorData}
      />
      <div className="flex justify-end mt-5">
        <Button
          className={`h-[40px] ${
            isEmptyFields
              ? "opacity-40 cursor-default"
              : "opacity-100 cursor-pointer"
          } text-white px-3 rounded-[5px] text-[14px] bg-[#2182b0]`}
          onClick={isEmptyFields ? () => {} : onClickAction}
        >
          {isEdit ? "Update" : "Add"}
        </Button>
      </div>

      <ConditionalRenderer condition={investorList?.length !== 0}>
        <h1 className="font-bold text-center text-[20px] my-10">
          Investor Details
        </h1>
        <div className="rounded-sm mt-5">
          <TableWrapper
            headerList={modifiedHeadTitle}
            items={investorList || []}
            TableRow={TableRow}
            onClickHandler={onClickHandler}
          />
        </div>

        <div className="flex w-full mt-5">
          <Button
            className={`${
              isLoading ? "opacity-40" : "opacity-100"
            } h-[40px] text-white px-3 rounded-[5px] w-full  text-[14px] my-5 bg-[#2182b0]`}
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
        "even:bg-[#ECEDED] text-center border-b-[#686868] border-b-[2px] text-[15px] w-full text-black"
      }
    >
      <ConditionalRenderer condition={!!elem?.investor_id}>
        <td className="px-2 py-4">{elem?.investorId}</td>
      </ConditionalRenderer>
      <td className="px-2 py-4">{elem?.investor_name}</td>
      <td className="px-2 py-4">{elem?.phone_number}</td>
      <td className="px-2 py-4">{elem?.investor_cnic}</td>
      <td className="px-2 py-4">
        <Button
          className="h-[40px] bg-[#2182b0] text-[14px] text-white px-2 rounded-[5px]"
          onClick={onClickHandler("edit", elem)}
        >
          Edit
        </Button>
      </td>
      <td className="px-2 py-4">
        <Button
          className="h-[40px] bg-[#2182b0] text-[14px] text-white px-2 rounded-[5px]"
          onClick={onClickHandler("remove", elem)}
        >
          Remove
        </Button>
      </td>
    </tr>
  );
}

export { AddOrUpdateInvestor };
