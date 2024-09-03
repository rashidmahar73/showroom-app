"use client";

import { useEffect, useState } from "react";
import { Button, TableWrapper } from "../components";
import { userData, headTitles } from "./helpers";
import { UserRegistration } from "./userRegistration";

function Dashboard() {
  const [isShow, setIsShow] = useState(false);
  const [data, setData] = useState({ users: [] });
  const [isEdit, setIsEdit] = useState({ data: {} });

  async function getUsersCall() {
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        setData(result);
        // Handle success, like redirecting the user or showing a success message
      } else {
        console.error("Signup failed:", result);
        // Handle error, like showing an error message to the user
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network errors
    }
  }
  useEffect(() => {
    getUsersCall();
  }, []);
  
  function onClickHandler(elem: any) {
    return () => {
      setIsEdit({ data: elem }), setIsShow(true);
    };
  }

  return (
    <div>
      <div className="flex justify-end m-10">
        <UserRegistration
          editableData={isEdit?.data}
          setIsEdit={setIsEdit}
          setIsShow={setIsShow}
          isShow={isShow}
        />
      </div>
      <div>
        <TableWrapper
          headerList={headTitles}
          items={data?.users}
          TableRow={TableRow}
          onClickHandler={onClickHandler}
        />
      </div>
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
      <td className="px-6 py-4">{elem?.id}</td>
      <td className="px-6 py-4">{elem?.name}</td>
      <td className="px-6 py-4">{elem?.email}</td>
      <td className="px-6 py-4">{elem?.phonenumber}</td>
      <td className="px-6 py-4">{elem?.password}</td>
      <td className="px-6 py-4">{elem?.role}</td>
      <td className="px-6 py-4">
        <Button
          className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
          onClick={onClickHandler(elem)}
        >
          Update
        </Button>
      </td>
    </tr>
  );
}

export default Dashboard;
