function AccountDetails({ elem }: any) {
  const hire_date = elem?.hire_date?.split("T")?.[0];

  return (
    <div className="bg-white rounded-lg shadow-md space-y-4">
      <div className="flex justify-between bg-gray-200 text-gray-600 text-sm font-bold uppercase p-4 rounded-md">
        <div className="w-1/6">Hire Date</div>
        <div className="w-1/6">Salary/Month</div>
        <div className="w-1/6">Account No</div>
        <div className="w-1/5">Account Name</div>
        <div className="w-1/6">Branch Code</div>
        <div className="w-1/6">Branch City</div>
      </div>

      <div className="flex justify-between text-black text-sm p-4 rounded-md bg-gray-50 shadow-sm hover:shadow-lg transition-shadow">
        <div className="w-1/6">{hire_date}</div>
        <div className="w-1/6">{elem?.per_month_salary}</div>
        <div className="w-1/6">{elem?.account_no}</div>
        <div className="w-1/6">{elem?.bank_account_name}</div>
        <div className="w-1/6">{elem?.branch_code}</div>
        <div className="w-1/6">{elem?.branch_city}</div>
      </div>
    </div>
  );
}

export { AccountDetails };
