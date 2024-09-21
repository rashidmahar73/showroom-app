"use client";

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "../withAuth";
import {
  Button,
  ConditionalRenderer,
  // ConditionalRenderer,
  // InputField,
  Pagination,
  TableWrapper,
} from "../components";
import { UseApiCall } from "../hooks";
import { investorDetailsHeadTitles } from "../utils";

function Investor() {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  // const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  function handleInvestor() {
    router.push(`investor/add`);
    return;
  }

  const {
    data: investorsList = { data: [], pagination: { totalPages: 0 } },
    isLoading,
    error,
    refetch,
  } = UseApiCall({
    url: `users/investors/2015/investorsList?page=${currentPageNumber}`,
    method: "GET",
  });

  function onClickHandler(type: any, elem: any) {
    return () => {
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
    };
  }

  function onPageChange(pageNumber: number) {
    setCurrentPageNumber(pageNumber);
  }

  // function handleOnChange({ target }: any) {
  //   const { value } = target;
  //   setInputValue(value);
  // }

  useEffect(() => {
    refetch();
  }, [currentPageNumber]);

  // const [getData, { data: searchInvestorData }] = UseLazyApiCall({
  //   url: "users/investors/searchInvestor",
  //   method: "POST",
  // }) as any;

  // async function handleSearch() {
  //   await getData({ params: { cnic: inputValue } });
  // }

  if (investorsList?.data?.length === 0) {
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
      </div>
    );
  }

  return (
    <div className="mx-20">
      <h1 className="text-[20px] text-center font-bold my-5">Investor</h1>
      {/* <div className="flex justify-end itemes-center my-5">
        <InputField
          className="h-[40px] border-[1px] w-full border-black rounded-[5px]"
          type="text"
          label="Search"
          labelStyling=""
          name="search"
          onChange={handleOnChange}
          value={inputValue}
        />
        <Button
          className="h-[40px] mt-6 ml-5 bg-[#2182b0] text-[13px] text-white rounded-[5px] px-3"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div> */}
      <div className="flex justify-end">
        <Button
          className="h-[40px] bg-[#2182b0] text-[13px] text-white rounded-[5px] px-3"
          onClick={handleInvestor}
        >
          Add Investor
        </Button>
      </div>
      <div className="mt-5 min-h-[60dvh] max-h-[60dvh] overflow-y-auto">
        <TableWrapper
          headerList={investorDetailsHeadTitles}
          items={investorsList?.data}
          TableRow={TableRow}
          onClickHandler={onClickHandler}
        />
      </div>
      <div className="my-10">
        <Pagination
          currentPage={currentPageNumber}
          onPageChange={onPageChange}
          isLoading={isLoading}
          pagination={{
            pageSize: 10,
            totalPages: investorsList?.pagination?.totalPages,
          }}
        />
      </div>
    </div>
  );
}


function TableRow({ elem, index, onClickHandler }: any) {
  return (
    <Fragment key={index}>
      {elem?.investors_list?.map((investor: any, idx: number) => (
        <tr
          key={idx}
          className={`${
            idx === elem?.investors_list?.length - 1
              ? "border-b-black border-b-[1px]"
              : ""
          } text-[14px] text-center`}
        >
          {idx === 0 && (
            <>
              <td
                className="border border-black px-4 py-2"
                rowSpan={elem?.investors_list?.length}
              >
                {elem?.tracking_id}
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
              onClick={onClickHandler("addAmount", investor)}
            >
              Add Amount
            </Button>
          </td>
          <ConditionalRenderer condition={investor?.is_amount_added}>
          {idx === 0 && (
            <>
              <td className="px-2 py-4" rowSpan={elem?.investors_list?.length}>
                <div className="flex items-center justify-center cursor-pointer">
                  <Button
                    className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
                    onClick={onClickHandler("details", elem?.investor_id)}
                  >
                    View Details
                  </Button>
                </div>
              </td>
            </>
          )}
          </ConditionalRenderer>
        </tr>
      ))}
    </Fragment>
  );
}

export default withAuth(Investor);
