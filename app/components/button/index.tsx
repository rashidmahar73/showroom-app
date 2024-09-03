type ButtonTypes = {
  className: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?:boolean;
};

function Button({ children, className = "", onClick = () => {}, disabled = false }: ButtonTypes) {
  return (
    <button
      type="button"
      className={
        className ||
        "relative rounded-md p-2 text-gray-400 hover:text-white focus:outline-none h-[45px] w-[45px] "
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export { Button };
