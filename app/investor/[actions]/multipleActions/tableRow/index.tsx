import { Button, ConditionalRenderer } from "@/app/components";

function AmountTableRow({ elem, className = "", onClickHandler, isButtons }: any) {
  return (
    <tr
      className={
        className ||
        "even:bg-[#ECEDED] text-center border-b-[2px] border-b-[#686868] text-[15px] w-full text-black"
      }
    >
      <td className="px-2 py-4">{elem?.investor_amount}</td>
      <td className="px-2 py-4">{elem?.investor_amount_type}</td>
      <td className="px-2 py-4">{elem?.investor_amount_date}</td>
      <ConditionalRenderer condition={isButtons}>
        <td className="px-2 py-4">
          <Button
            className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
            onClick={onClickHandler("edit", elem)}
          >
            Edit
          </Button>
        </td>
      </ConditionalRenderer>
    </tr>
  );
}

function PurchaseTableRow({ elem, className = "", onClickHandler,isButtons }: any) {
  return (
    <tr
      className={
        className ||
        "even:bg-[#ECEDED] text-center border-b-[2px] border-b-[#686868] text-[15px] w-full text-black"
      }
    >
      <td className="px-2 py-4">{elem?.vehicle_company}</td>
      <td className="px-2 py-4">{elem?.vehicle_type}</td>
      <td className="px-2 py-4">{elem?.vehicle_registration_no}</td>
      <td className="px-2 py-4">{elem?.vehicle_chases_no}</td>
      <td className="px-2 py-4">{elem?.vehicle_model}</td>
      <td className="px-2 py-4">{elem?.vehicle_meter_reading}</td>
      <td className="px-2 py-4">{elem?.purchase_date}</td>
      <ConditionalRenderer condition={isButtons}>

      <td className="px-2 py-4">
        <Button
          className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
          onClick={onClickHandler("edit", elem)}
        >
          Edit
        </Button>
      </td>
</ConditionalRenderer>
    </tr>
  );
}


function SellTableRow({ elem, className = "", onClickHandler, isButtons }: any) {
  return (
    <tr
      className={
        className ||
        "even:bg-[#ECEDED]  border-b-[2px] border-b-[#686868] text-center text-[15px] w-full text-black"
      }
    >
      <td className="px-2 py-4">{elem?.sell_by}</td>
      <td className="px-2 py-4">{elem?.selling_date}</td>
      <td className="px-2 py-4">{elem?.selling_price}</td>
      <td className="px-2 py-4">{elem?.sell_amount}</td>
      <ConditionalRenderer condition={isButtons}>

      <td className="px-2 py-4">
        <Button
          className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
          onClick={onClickHandler("edit", elem)}
        >
          Edit
        </Button>
      </td>
</ConditionalRenderer>
    </tr>
  );
}


function ExtraExpenseTableRow({ elem, className = "", onClickHandler, isButtons }: any) {
  return (
    <tr
      className={
        className ||
        "even:bg-[#ECEDED]  border-b-[2px] border-b-[#686868] text-center text-[15px] w-full text-black"
      }
    >
      <td className="px-2 py-4">{elem?.workshop_name}</td>
      <td className="px-2 py-4">{elem?.date_modified}</td>
      <td className="px-2 py-4">{elem?.total_expense}</td>
      <td className="px-2 py-4">{elem?.detail}</td>
      <td className="px-2 py-4">{elem?.other_expense}</td>
      <ConditionalRenderer condition={isButtons}>

      <td className="px-2 py-4">
        <Button
          className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
          onClick={onClickHandler("edit", elem)}
        >
          Edit
        </Button>
      </td>
      </ConditionalRenderer>
    </tr>
  );
}

function InvestorTableRow({ elem, index }: any) {
  return (
    <tr
      key={index}
      className="border-b-black border-b-[1px] text-[14px] text-center"
    >
      <td className="px-2 py-4">{elem?.investor_name}</td>
      <td className="px-2 py-4">{elem?.phone_number}</td>
      <td className="px-2 py-4">{elem?.investor_cnic}</td>
    </tr>
  );
}

export { AmountTableRow, PurchaseTableRow, SellTableRow,ExtraExpenseTableRow, InvestorTableRow };
