import { InputGrid } from "@/app/components";

function UpdateInvestor({
  inputItems,
  setInvestorData,
  investorData,
}: any) {
  return (
    <div>
      <h1 className="font-bold text-center text-[20px] my-10">
        Update Investor
      </h1>
      <h1 className="font-bold text-[20px] my-5">
        {/* Investor ID {investorData.investorID} */}
      </h1>
      <InputGrid
        items={inputItems}
        setState={setInvestorData}
        state={investorData}
      />
    </div>
  );
}

export { UpdateInvestor };
