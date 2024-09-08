function InvestorDetails({ parsedData }: any) {
  return (
    <div className="flex rounded-sm justify-center">
      <div className="border-b-[1px] border-b-[#686868] bg-[#ECEDED] rounded-sm flex flex-col">
        <h2 className="text-center font-bold text-[15px] px-4 py-2">
          Tracking ID
        </h2>
        <h2 className="text-center font-bold text-[15px] px-4 py-2">
          Investor ID
        </h2>
        <h2 className="text-center font-bold text-[15px] px-4 py-2">
          Investor Name
        </h2>
        <h2 className="text-center font-bold text-[15px] px-4 py-2">CNIC</h2>
        <h2 className="text-center font-bold text-[15px] px-4 py-2">
          Phone Number
        </h2>
      </div>
      <div className="flex border-b-[1px] border-b-[#686868] flex-col">
        <h2 className="text-center text-[15px] px-4 py-2">
          {parsedData?.tracking_id}
        </h2>
        <h2 className="text-center text-[15px] px-4 py-2">
          {parsedData?.investor_id}
        </h2>
        <h2 className="text-center text-[15px] px-4 py-2">
          {parsedData?.investor_name}
        </h2>
        <h2 className="text-center text-[15px] px-4 py-2">
          {parsedData?.investor_cnic}
        </h2>
        <h2 className="text-center text-[15px] px-4 py-2">
          {parsedData?.phone_number}
        </h2>
      </div>
    </div>
  );
}

export { InvestorDetails };
