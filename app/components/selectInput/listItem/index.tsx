type TListitem = {
  listItemHandler: (elem: any) => void;
  elem: any;
};

function ListItem({ listItemHandler, elem }: TListitem) {
  return (
    <li
      className="relative select-none py-2 cursor-pointer"
      id="listbox-option-0"
      role="option"
      onClick={() => listItemHandler(elem)}
    >
      <div className="flex items-center pl-3">
        <span className="font-normal block truncate text-[#000000] hover:text-[#A5A5A5]">
          {elem.value}
        </span>
      </div>
    </li>
  );
}

export { ListItem };
