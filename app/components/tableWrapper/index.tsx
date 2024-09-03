import { Table } from "./table";

function TableWrapper({ headerList, items, TableRow, onClickHandler=()=>{} }: any) {
  return (
    <Table>
      <Table.Head>
        {headerList?.map((elem: any, index: number) => (
          <Table.Head.THead
            key={`table-row-${index}`}
            title={elem?.title}
            styling={elem?.styling}
          />
        ))}
      </Table.Head>
      <Table.Body>
        {items?.map((elem: any, index: number) => (
          <TableRow key={`table-row-${index}`} elem={elem} onClickHandler={onClickHandler}></TableRow>
        ))}
      </Table.Body>
    </Table>
  );
}

export { TableWrapper };
