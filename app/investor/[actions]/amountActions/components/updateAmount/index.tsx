import { Button, InputGrid } from "@/app/components";

function UpdateAmount({
  investorAmountData,
  setInvestorAmountData,
  amountInputItems,
  onClickAmountAction,
}: any) {
  return (
    <>
      <div className="mx-20">
        <h1 className="font-bold text-center text-[20px] my-5">
          Update Amount
        </h1>
        <h1 className="font-bold text-[20px] my-5">
          Amount ID {investorAmountData?.amountID}
        </h1>
        <InputGrid
          items={amountInputItems}
          setState={setInvestorAmountData}
          state={investorAmountData}
        />
        <div className="flex justify-end my-5">
          <Button
            className="h-[40px] text-white text-[13px] px-3 rounded-[5px] bg-[#2182b0]"
            onClick={onClickAmountAction}
          >
            Update Amount
          </Button>
        </div>
      </div>
    </>
  );
}

export { UpdateAmount };
