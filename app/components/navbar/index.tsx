"use client";

import { useState } from "react";
import { Button } from "@/app/components";
import { NavItems } from "./listItems";
import { CollapseIcon } from "../../icons";
import { navItems } from "./helpers";
import { useRouter } from "next/navigation";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function handleNavbar() {
    setIsOpen(!isOpen);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    router.push(`/login`);
    return;
  }

  return (
    <nav className="bg-gray-800 p-5 flex justify-between">
      <div className="xs:flex xs:justify-end sm:flex sm:justify-end md:flex md:justify-end lg:hidden">
        <Button
          className="relative inline-flex items-center justify-center rounded-md text-gray-400 hover:text-white focus:outline-none h-[28px] w-[28px] "
          onClick={handleNavbar}
        >
          <CollapseIcon />
        </Button>
      </div>
      <div
        className={`${
          isOpen
            ? "xs:flex xs:flex-col sm:flex sm:flex-col md:flex md:flex-col"
            : "hidden"
        } lg:flex xl:flex xxl:flex ml-10`}
      >
        <NavItems items={navItems} />
      </div>
      <div>
        <Button
          className="bg-gray-800 text-white flex items-center"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}

export { Navbar };
