import { useRouter } from "next/navigation";
import { Table } from "@/app/components/tableWrapper/table";
import { Button } from "@/app/components";
import { headTitles } from "./helpers";

function InvestorsTable({ data }: any) {
  const router = useRouter();

  function onClickHandler(type: any, elem: any) {
    return () => {
      if (type === "updateInvestor") {
        const serializedObject = encodeURIComponent(JSON.stringify(elem));
        router.push(`investor/updateInvestor?data=${serializedObject}`);
        return;
      }

      if (type === "addAmount") {
        const serializedObject = encodeURIComponent(JSON.stringify(elem));
        router.push(`investor/addAmount?data=${serializedObject}`);
        return;
      }

      if (type === "details") {
        const serializedObject = encodeURIComponent(
          JSON.stringify(elem?.investor_id)
        );
        router.push(`investor/details?data=${serializedObject}`);
        return;
      }
    };
  }
  return (
    <>
      <Table>
        <Table.Head>
          {headTitles?.map((elem: any, index: number) => (
            <Table.Head.THead
              key={`table-row-${index}`}
              title={elem?.title}
              styling={elem?.styling}
            />
          ))}
        </Table.Head>
      </Table>
      {data?.map(({ trackingID, investorsList }: any) => {
        return (
          <div>
            <div className="flex justify-between">
              <h1 className="px-2 text-[14px] flex items-center">
                {trackingID}
              </h1>
              <div>
                <Table.Body>
                  {investorsList?.map((elem: any, index: number) => (
                    <TableRow
                      key={`table-row-${index}`}
                      elem={elem}
                      onClickHandler={onClickHandler}
                    />
                  ))}
                </Table.Body>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function TableRow({ elem, className = "", onClickHandler }: any) {
  return (
    <>
      <tr
        className={
          className ||
          "even:bg-[#ECEDED] text-center border-b-[2px] border-b-[#686868] text-[15px] table-fixed table w-full text-black"
        }
      >
        <td className="px-2 py-4">{elem?.investor_id}</td>
        <td className="px-2 py-4">{elem?.investor_name}</td>
        <td className="px-2 py-4">{elem?.phone_number}</td>
        <td className="px-2 py-4">{elem?.investor_cnic}</td>
        <td className="px-2 py-4">
          <Button
            className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
            onClick={onClickHandler("updateInvestor", elem)}
          >
            Update
          </Button>
        </td>
        <td className="px-2 py-4">
          <Button
            className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
            onClick={onClickHandler("remove", elem)}
          >
            Remove
          </Button>
        </td>
        <td className="px-2 py-4">
          <Button
            className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
            onClick={onClickHandler("addAmount", elem)}
          >
            Add Amount
          </Button>
        </td>
        <td className="px-2 py-4">
          <div className="flex items-center justify-center cursor-pointer">
            <Button
              className="h-[40px] bg-[#2182b0] text-[13px] text-white px-2 rounded-[5px]"
              onClick={onClickHandler("details", elem)}
            >
              View Details
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
}

export { InvestorsTable };
