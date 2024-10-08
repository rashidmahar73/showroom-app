"use client";
import { ConditionalRenderer } from "@/app/components";
import withAuth from "@/app/withAuth";
import { usePathname } from "next/navigation";
import { AddOrUpdateDealer } from "./dealActions";

const paths = {
  addDeals: "/dealer/addDeals",
  updateDeals: "/dealer/updateDeals",
};

function Actions() {
  const pathname = usePathname();

  return (
    <div>
      <ConditionalRenderer
        condition={
          pathname === paths?.addDeals || pathname === paths?.updateDeals
        }
      >
        <AddOrUpdateDealer />
      </ConditionalRenderer>
    </div>
  );
}

export default withAuth(Actions);
