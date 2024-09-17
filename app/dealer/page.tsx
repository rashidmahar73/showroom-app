"use client";

import { useRouter } from "next/navigation";
import { Button } from "../components";
import withAuth from "../withAuth";

function Dealer() {
    const router=useRouter();

    function handleDealerShip(){
        return router.push(`dealer/addDealer`);
    }
  return (
    <div className="mx-20">
      <h1 className="text-[23px] text-center font-bold my-5">Dealer</h1>
      <div className="flex justify-end">
        <Button
          className="h-[40px] bg-[#2182b0] text-[13px] text-white rounded-[5px] px-3"
          onClick={handleDealerShip}
        >
          Add Deal
        </Button>
      </div>
    </div>
  );
}

export default withAuth(Dealer);
