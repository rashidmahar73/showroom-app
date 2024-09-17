import { Button, InputGrid } from "@/app/components";

function UpdateSell({
  purchseInputItems,
  setSellData,
  sellData,
  onClickSellAction,
}: any) {
  return (
    <div>
      <h1 className="font-bold text-center text-[20px] my-5">Update Sell</h1>
      {/* <ConditionalRenderer condition={isUpdate}>
        <h1>{investorAmountData.investorId}</h1>
      </ConditionalRenderer> */}
      <InputGrid
        items={purchseInputItems}
        setState={setSellData}
        state={sellData}
      />
      <div className="flex justify-end mt-5">
        <Button
          className="h-[40px] text-white px-3 rounded-[5px] bg-[#2182b0]"
          onClick={onClickSellAction}
        >
          Update Sell
        </Button>
      </div>
    </div>
  );
}

export { UpdateSell };
