import { Button } from "@/app/components";
import { InputGrid } from "@/app/investor/components";

function UpdatePurchase({
  purchseInputItems,
  setPurchaseAmountData,
  purchaseAmountData,
  onClickPurchaseAction
}: any) {
  return (
    <div>
      <h1 className="font-bold text-center text-[20px] my-5">
        Update Purchase
      </h1>
      <InputGrid
        items={purchseInputItems}
        setState={setPurchaseAmountData}
        state={purchaseAmountData}
      />
      <div className="flex justify-end mt-5">
        <Button
          className="h-[40px] text-white px-3 rounded-[5px] bg-[#2182b0]"
          onClick={onClickPurchaseAction}
        >
          Update Purchase
        </Button>
      </div>
    </div>
  );
}

export { UpdatePurchase };
