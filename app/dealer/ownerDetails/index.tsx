function OwnerDetails({ elem }: any) {
  return (
    <div className="bg-white rounded-lg shadow-md space-y-4">
      <div className="bg-white rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm font-bold uppercase text-center">
              <th className="py-4 w-[8%]">Owner Name</th>
              <th className="py-4 w-[8%]">Phone Number</th>
              <th className="py-4 w-[8%]">Price Demand</th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-gray-50 text-center hover:bg-gray-100 text-sm text-black">
              <td className="py-4">{elem?.owner_name}</td>
              <td className="py-4">{elem?.owner_phone_number}</td>
              <td className="py-4">{elem?.price_demand}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { OwnerDetails };
