import { Button, InputGrid } from "@/app/components";
import { ToastContainer } from "react-toastify";

function Update({ data, setData, inputItems, onClickHandler }: any) {
  return (
    <div className="mx-20">
      <ToastContainer />
      <h1 className="font-bold text-center text-[20px] my-5">Update</h1>
      <InputGrid
        items={inputItems}
        setState={setData}
        state={data}
        variant={"amountModule"}
      />
      <div className="flex justify-end my-5">
        <Button
          className="h-[40px] text-white text-[13px] px-3 rounded-[5px] bg-[#2182b0]"
          onClick={onClickHandler}
        >
          Update
        </Button>
      </div>
    </div>
  );
}

export { Update };
