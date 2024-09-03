"use client";
import { Fragment, useState } from "react";

import { ConditionalRenderer } from "../conditionalRenderer";


import { DropdownIcon } from "@/app/icons";
import { ListItem } from "./listItem";
import { InputHead } from "./head";

function SelectInput({
  className,
  label,
  listItems,
  onClickHanlder,
  selectedValue,
}: any) {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen((prev) => !prev);
  };

  function listItemHandler(elem: any) {
    setIsOpen(false);
    onClickHanlder(elem);
  }

  return (
    <div className={className.parent}>
      <label className={className.labelClassName}>{label}</label>
      <div className="relative">
        <InputHead
          className={className || {}}
          onClick={onClick}
          value={selectedValue}
          Icon={<DropdownIcon />}
        />
        <ConditionalRenderer condition={!!isOpen}>
          <ul
            className="absolute mt-1 w-full max-h-[12dvh] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            style={{ zIndex: "1000" }}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            {listItems?.map((elem: any) => {
              return (
                <Fragment key={`select-input-list-item ${elem.key}`}>
                  <ListItem listItemHandler={listItemHandler} elem={elem} />
                </Fragment>
              );
            })}
          </ul>
        </ConditionalRenderer>
      </div>
    </div>
  );
}

export { SelectInput };
