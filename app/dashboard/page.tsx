"use client";

import { useEffect, useState } from "react";
import { Button, TableWrapper } from "../components";
import { headTitles } from "./helpers";
import { UserRegistration } from "./userRegistration";
import { UseApiCall, UseLazyApiCall } from "../hooks";
import { toast, ToastContainer } from "react-toastify";
import { toastHandler } from "../utils/helpers";
import {  toastTypesKeys } from "../utils/constants";
import withAuth from "../withAuth";

function Dashboard() {
  const [isShow, setIsShow] = useState(false);
  const [isEdit, setIsEdit] = useState({ data: {} });

  const {
    data: userData = { users: [] },
    isLoading,
    error,
    refetch,
  } = UseApiCall({
    url: "users",
    method: "GET",
  });

  const [getData, { data: removeData }] = UseLazyApiCall({
    url: "remove",
    method: "DELETE",
  }) as any;

  function onClickHandler(type: any, elem: any) {
    return () => {
      if (type === "update") {
        setIsEdit({ data: elem }), setIsShow(true);
        return;
      }
      if (type === "remove") {
        const removeDetail = {
          id: elem.id,
        };
        getData({ params: removeDetail });
        return;
      }
    };
  }

  useEffect(() => {
    if (removeData?.message) {
      toastHandler(removeData.message, toastTypesKeys.success);
      setTimeout(() => {
        refetch()
      }, 3000);
      return;
    }
  }, [removeData]);


  return (
    <div>
      <ToastContainer  />
      <h1 className="text-[20px] font-bold text-center mt-10">
        Registered Users
      </h1>
      <div className="flex justify-end mx-20 my-5">
        <UserRegistration
          editableData={isEdit?.data}
          setIsEdit={setIsEdit}
          setIsShow={setIsShow}
          isShow={isShow}
          refetchUsers={refetch}
        />
      </div>
      <div className="mx-20 h-[40dvh] overflow-y-scroll">
        <div className="border-[#ECEDED] border-[1px] rounded-lg">
          <TableWrapper
            headerList={headTitles}
            items={userData?.users}
            TableRow={TableRow}
            onClickHandler={onClickHandler}
          />
        </div>
      </div>
    </div>
  );
}

function TableRow({ elem, className = "", onClickHandler }: any) {
  return (
    <tr
      className={
        className ||
        "even:bg-[#ECEDED] text-center text-[16px] table-fixed table w-full text-black"
      }
    >
      <td className="px-2 py-4">{elem?.id}</td>
      <td className="px-2 py-4">{elem?.name}</td>
      <td className="px-2 py-4">{elem?.email}</td>
      <td className="px-2 py-4">{elem?.phonenumber}</td>
      <td className="px-2 py-4">{elem?.password}</td>
      <td className="px-2 py-4">{elem?.role}</td>
      <td className="px-2 py-4">
        <Button
          className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
          onClick={onClickHandler("update", elem)}
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
    </tr>
  );
}

export default withAuth(Dashboard);
