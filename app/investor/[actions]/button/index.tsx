import { Button } from "@/app/components";

function ActionButton({ condition, onClick, children }: any) {
  return (
    <div className="flex justify-end my-5">
      <Button
        className={`${
          condition ? "opacity-40 cursor-default" : "opacity-100 cursor-pointer"
        } h-[40px] text-white px-5 text-[13px] rounded-[5px] bg-[#2182b0]`}
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
}

export { ActionButton };
