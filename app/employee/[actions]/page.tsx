"use client";
import { ConditionalRenderer } from "@/app/components";
import withAuth from "@/app/withAuth";
import { usePathname } from "next/navigation";
import { AddOrUpdateEmployee } from "./employeeActions";

const paths = {
  addEmployee: "/employee/addEmployee",
  updateEmployee: "/employee/updateEmployee",
};

function Actions() {
  const pathname = usePathname();

  return (
    <div>
      <ConditionalRenderer
        condition={
          pathname === paths?.addEmployee || pathname === paths?.updateEmployee
        }
      >
        <AddOrUpdateEmployee />
      </ConditionalRenderer>
    </div>
  );
}

export default withAuth(Actions);
