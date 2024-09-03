import { useState } from "react";
import Link from "next/link";
import { ConditionalRenderer } from "../../conditionalRenderer";

type Item = {
  text: string;
  path: string;
  subItems?: { text: string; path: string }[];
};

type NavItemsTypes = {
  items: Item[];
};

function NavItems({ items }: NavItemsTypes) {
  const [isDropdown, setIsDropdown] = useState({ status: false, path: "" });

  function handleDropdown(path: string) {
    setIsDropdown({ status: !isDropdown.status, path: path });
  }

  function handleCloseDropdown() {
    setIsDropdown({ status: false, path: "" });
  }
  return (
    <>
      {items?.map((elem: Item, index: number) => (
        <Link
          key={`navItems-${index}`}
          className="rounded-md cursor-pointer px-3 py-3 text-[15px] font-bold uppercase text-white relative"
          href={elem?.path}
          onMouseEnter={() => handleDropdown(elem.path)}
          onMouseLeave={handleCloseDropdown}
        >
          {elem.text}
          <ConditionalRenderer
            condition={isDropdown.status && isDropdown.path === elem.path}
          >
            <div className="z-10 bg-white absolute flex flex-col rounded">
              {elem?.subItems?.map((elem: { text: string }, index: number) => (
                <Link
                  key={`navSubItem-${index}`}
                  className="cursor-pointer px-4 py-2 text-sm font-medium text-black relative"
                  href={""}
                >
                  {elem.text}
                </Link>
              ))}
            </div>
          </ConditionalRenderer>
        </Link>
      ))}
    </>
  );
}

export { NavItems };
