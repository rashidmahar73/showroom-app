"use client";

import { useState } from "react";
import { Button, ConditionalRenderer } from "@/app/components";
import { NavItems } from "./listItems";
import { CollapseIcon } from "../../icons";
import { navItems } from "./helpers";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/providers";
import { toastHandler } from "@/app/utils/helpers";
import { toastTypesKeys } from "@/app/utils/constants";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const router = useRouter();

  const { userData, setUser } = useUser();

  function handleNavbar() {
    setIsOpen(!isOpen);
  }

  function handleLogout() {
    toastHandler("Logout Successfully", toastTypesKeys.success);
    setIsShow(false);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userID");
      setUser(null);
      router.push(`/login`);
      return;
    }, 3000);
  }

  function handleLogoutPopup() {
    setIsShow(!isShow);
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
      <div className="relative">
        <h1
          className="text-[15px] text-white cursor-pointer"
          onClick={handleLogoutPopup}
        >
          {userData?.user?.name}
        </h1>
        <ConditionalRenderer condition={isShow}>
          <div className="absolute right-0 mr-5 mt-1 bg-white rounded-full">
            <Button className="py-1 px-4 text-[#006ab3]" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </ConditionalRenderer>
      </div>
    </nav>
  );
}

export { Navbar };
