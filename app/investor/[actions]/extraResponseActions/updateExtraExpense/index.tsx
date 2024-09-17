import { InputGrid } from "@/app/components";

function UpdateExtraExpense({
  extraExpenseInputItems,
  setExtraExpenseData,
  extraExpenseData,
}: any) {
  return (
    <div>
      {/* <ConditionalRenderer condition={isUpdateExtraExpense}>
        <h1>{extraExpenseData.extraExpenseID}</h1>
      </ConditionalRenderer> */}
      <h1 className="font-bold text-center text-[20px] my-5">
        Update Extra Repense
      </h1>
      <InputGrid
        items={extraExpenseInputItems}
        setState={setExtraExpenseData}
        state={extraExpenseData}
      />
    </div>
  );
}

export { UpdateExtraExpense };
