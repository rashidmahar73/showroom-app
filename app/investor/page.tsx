"use client";

import { Button } from "../components";
import { useRouter } from "next/navigation";
import { UseApiCall } from "../hooks";
import { InvestorsTable } from "./components/table";
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
        <InvestorsTable data={investorsList?.data} />
      </div>
    </div>
  );
}

export default withAuth(Investor);
