function AccountDetails({ elem }: any) {
  const hire_date = elem?.hire_date?.split("T")?.[0];

  return (
    <div className="bg-white rounded-lg shadow-md space-y-4">
      <div className="bg-white rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm font-bold uppercase text-center">
              <th className="py-4 w-[8%]">Hire Date</th>
              <th className="py-4 w-[8%]">Salary/Month</th>
              <th className="py-4 w-[8%]">Account No</th>
              <th className="py-4 w-[8%]">Bank Name</th>
              <th className="py-4 w-[8%]">Branch Code</th>
              <th className="py-4 w-[8%]">Branch City</th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-gray-50 text-center hover:bg-gray-100 text-sm text-black">
              <td className="py-4">{hire_date}</td>
              <td className="py-4">{elem?.per_month_salary}</td>
              <td className="py-4">{elem?.account_no}</td>
              <td className="py-4">{elem?.bank_account_name}</td>
              <td className="py-4">{elem?.branch_code}</td>
              <td className="py-4">{elem?.branch_city}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { AccountDetails };
