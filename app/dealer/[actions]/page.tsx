"use client";
import { ConditionalRenderer } from "@/app/components";
import withAuth from "@/app/withAuth";
import { usePathname } from "next/navigation";
import { AddOrUpdateDealer } from "./dealActions";

function Actions() {
  const pathname = usePathname();
  const isAddDealer = pathname?.includes("addDealer");

  return (
    <div>
      <ConditionalRenderer condition={isAddDealer}>
        <AddOrUpdateDealer />
      </ConditionalRenderer>
    </div>
  );
}

export default withAuth(Actions);
