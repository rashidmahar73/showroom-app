import { Table } from "./table";

function TableWrapper({
  headerList,
  items,
  TableRow,
  onClickHandler = () => {},
  isButtons = true,
}: any) {
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
        {items?.map((elem: any, idx: number) => (
          <TableRow
            key={`table-row-${idx}`}
            index={idx}
            elem={elem}
            onClickHandler={onClickHandler}
            isButtons={isButtons}
          />
        ))}
      </Table.Body>
    </Table>
  );
}

export { TableWrapper };
