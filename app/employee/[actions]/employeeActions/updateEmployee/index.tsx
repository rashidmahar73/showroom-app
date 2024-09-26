import { Button, InputGrid } from "@/app/components";
import { hasEmptyString } from "@/app/utils/helpers";
import { ToastContainer } from "react-toastify";

function UpdateEmployee({
  onClickHandler,
  inputItems,
  setEmployeeData,
  employeeData,
}: any) {
  const isEmptyFields = hasEmptyString(inputItems);
  return (
    <div className="mx-20">
      <ToastContainer />
      <h1 className="text-[23px] text-center font-bold my-5">Update Deal</h1>
      <InputGrid
        items={inputItems}
        setState={setEmployeeData}
        state={employeeData}
      />
      <div className="flex justify-end my-5">
        <Button
          className={`${
            isEmptyFields
              ? "opacity-40 cursor-default"
              : "opacity-100 cursor-pointer"
          } h-[40px] text-white text-[13px] px-3 rounded-[5px] bg-[#2182b0]`}
          onClick={isEmptyFields ? () => {} : onClickHandler}
        >
          Update
        </Button>
      </div>
    </div>
  );
}

export { UpdateEmployee };
