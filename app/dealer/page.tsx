"use client";

import { useRouter } from "next/navigation";
import { Button, Modal, Pagination, TableWrapper } from "../components";
import withAuth from "../withAuth";
import { UseApiCall } from "../hooks";
import { useState } from "react";
import { headTitles } from "./helpers";
import { useUser } from "../providers";
import { ToastContainer } from "react-toastify";
import { OwnerDetails } from "./ownerDetails";

function Dealer() {
  const [isShowDetails, setIsShowDetails] = useState({
    status: false,
    detail: {},
  });
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const router = useRouter();

  const { userData: getUserDetails } = useUser();
  const { id: userID } = getUserDetails?.user || {};

  function onClickHandler() {
    return router.push(`dealer/addDeals`);
  }

  const {
    data: dealsDetailsData = {
      data: [],
      message: "",
      pagination: { totalPages: 0 },
    },
    isLoading,
    error,
    refetch,
  } = UseApiCall({
    url: `users/dealer/${userID}/dealsList?page=${currentPageNumber}`,
    method: "GET",
  });

  function onClickTableHandler(type: string, elem: any) {
    return () => {
      if (type === "accountDetails") {
        setIsShowDetails({ status: true, detail: elem });
        return;
      }
      const serializedObject = encodeURIComponent(JSON.stringify(elem));
      router.push(`dealer/updateDeals?data=${serializedObject}`);
      return;
    };
  }

  function onPageChange(pageNumber: number) {
    setCurrentPageNumber(pageNumber);
  }

  function handleModalClose() {
    setIsShowDetails({ status: false, detail: {} });
  }

  if (dealsDetailsData?.data?.length === 0) {
    return (
      <div className="mx-20">
        <ToastContainer />

        <h1 className="text-[20px] text-center font-bold my-5">Deals</h1>
        <div className="flex justify-end">
          <Button
            className="h-[40px] bg-[#2182b0] text-[13px] text-white rounded-[5px] px-3"
            onClick={onClickHandler}
          >
            Add Deal
          </Button>
        </div>
        <h1 className="text-center text-[20px] font-bold">
          {dealsDetailsData?.message}
        </h1>
      </div>
    );
  }

  return (
    <div className="mx-20">
      <Modal
        isShow={isShowDetails?.status}
        className="flex items-center justify-center"
      >
        <Modal.Header
          title="Owner Details"
          onclickHandler={handleModalClose}
        />
        <div className="w-[120dvh]">
          <OwnerDetails elem={isShowDetails?.detail} />
        </div>
      </Modal>
      <h1 className="text-[23px] text-center font-bold my-5">Deals</h1>
      <div className="flex justify-end">
        <Button
          className="h-[40px] bg-[#2182b0] text-[13px] text-white rounded-[5px] px-3"
          onClick={onClickHandler}
        >
          Add Deal
        </Button>
      </div>
      <div className="mt-5 min-h-[60dvh] max-h-[60dvh] overflow-y-auto">
        <TableWrapper
          headerList={headTitles}
          items={dealsDetailsData?.data || []}
          TableRow={TableRow}
          onClickHandler={onClickTableHandler}
        />
      </div>
      <div className="my-10 bg-black">
        <Pagination
          currentPage={currentPageNumber}
          onPageChange={onPageChange}
          isLoading={false}
          pagination={{
            pageSize: 10,
            totalPages: dealsDetailsData?.pagination?.totalPages,
          }}
        />
      </div>
    </div>
  );
}

function TableRow({ elem, className = "", onClickHandler }: any) {
  const deal_date = elem?.deal_date?.split("T")?.[0];
  const modifiedObj = {
    ...elem,
    deal_date: deal_date,
  };
  return (
    <tr
      className={
        className ||
        "even:bg-[#ECEDED] text-center border-b-[2px] border-b-[#686868] text-[15px] w-full text-black"
      }
    >
      <td className="px-2 py-4">{elem?.tracking_id}</td>
      <td className="px-2 py-4">{elem?.deals_id}</td>
      <td className="px-2 py-4">{deal_date}</td>
      <td className="px-2 py-4">{elem?.vehicle_company}</td>
      <td className="px-2 py-4">{elem?.vehicle_type}</td>
      <td className="px-2 py-4">{elem?.vehicle_registration_no}</td>
      <td className="px-2 py-4">{elem?.vehicle_chases_no}</td>
      <td className="px-2 py-4">{elem?.vehicle_model}</td>
      <td className="px-2 py-4">{elem?.vehicle_meter_reading}</td>
      <td className="px-2 py-4">{elem?.status}</td>
      <td className=" py-4">
        <Button
          className="h-[40px] py-2 bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
          onClick={onClickHandler("accountDetails", elem)}
        >
          Details
        </Button>
      </td>
      <td className="px-2 py-4">
        <Button
          className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
          onClick={onClickHandler("update", modifiedObj)}
        >
          Update
        </Button>
      </td>
    </tr>
  );
}

export default withAuth(Dealer);
