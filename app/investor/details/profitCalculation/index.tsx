function ProfitCalculation({ data }: any) {
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1>Investment Amount</h1>
          <h1>Purchase Amount</h1>
          <h1>Extra Expense Amount</h1>
          <h1>Sell Amount</h1>
        </div>
        <div>
          <h1>{data?.amount_details?.amount_details?.investor_amount}</h1>
          <h1>{data?.purchase_details?.purchase_amount || 0}</h1>
          <h1>{data?.extra_expense_details?.total_expense}</h1>
          <h1>{data?.sell_details?.sell_amount}</h1>
        </div>
      </div>
    </div>
  );
}

export { ProfitCalculation };
