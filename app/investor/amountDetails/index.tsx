import { Button, ConditionalRenderer, TableWrapper } from "@/app/components";
import { headTitles } from "./helpers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PurchaseDetails } from "../purchaseDetails";
import { DownArrowIcon } from "@/app/icons";

function AmountDetails({ investorID }: any) {
  const router = useRouter();

  const amountDetails = [
    {
      amountID: 0,
      investorAmount: 1400,
      investorAmountType: "cash",
      investorAmountDate: "2023-10-10",
    },
    {
      amountID: 1,
      investorAmount: 1400,
      investorAmountType: "cash",
      investorAmountDate: "2023-10-10",
    },
  ];

  function onClickHandler(type: any, elem: any) {
    return () => {
      if (type === "addPurchase") {
        const serializedObject = encodeURIComponent(JSON.stringify(elem));
        router.push(`investor/addPurchase?data=${serializedObject}`);
        return;
      }
      if (type === "update") {
        const serializedObject = encodeURIComponent(JSON.stringify(elem));
        router.push(`investor/updateAmount?data=${serializedObject}`);
        return;
      }
      if (type === "purchaseDetails") {
      }
    };
  }
  return (
    <div>
      <TableWrapper
        headerList={headTitles}
        items={amountDetails}
        TableRow={TableRow}
        onClickHandler={onClickHandler}
      />
    </div>
  );
}

function TableRow({ elem, className = "", onClickHandler }: any) {
  const [isOpen, setIsOpen] = useState({
    status: false,
    data: {},
  });

  function onClickPurchaseDetails() {
    setIsOpen({
      status: !isOpen.status,
      data: elem.amountID,
    });
  }

  const purchase = {
    isPurchase: true,
  };

  return (
    <>
      <tr
        className={
          className ||
          "even:bg-[#ECEDED] text-center text-[15px] table-fixed table w-full text-black"
        }
      >
        <td className="px-6 py-4">{elem?.amountID}</td>
        <td className="px-6 py-4">{elem?.investorAmount}</td>
        <td className="px-6 py-4">{elem?.investorAmountType}</td>
        <td className="px-6 py-4">{elem?.investorAmountDate}</td>
        <td className="px-6 py-4">
          <Button
            className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
            onClick={onClickHandler("update", elem)}
          >
            Update
          </Button>
        </td>
        <td className="px-6 py-4">
          <Button
            className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
            onClick={onClickHandler("remove", elem)}
          >
            Remove
          </Button>
        </td>
        <td className="px-6 py-4">
          <ConditionalRenderer condition={purchase.isPurchase}>
            <Button
              className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
              onClick={onClickPurchaseDetails}
            >
              <DownArrowIcon />
            </Button>
          </ConditionalRenderer>
          <ConditionalRenderer condition={!purchase.isPurchase}>
            <Button
              className="h-[40px] bg-[#2182b0] text-[15px] text-white px-2 rounded-[5px]"
              onClick={onClickHandler("addPurchase", elem)}
            >
              Add Purchase
            </Button>
          </ConditionalRenderer>
        </td>
      </tr>
      <ConditionalRenderer
        condition={isOpen.status && elem?.amountID === isOpen.data}
      >
        <div>
          <PurchaseDetails amountID={isOpen.data} />
        </div>
      </ConditionalRenderer>
    </>
  );
}

export { AmountDetails };
