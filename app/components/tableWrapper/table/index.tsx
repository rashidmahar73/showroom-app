function Table({ children }: any) {
  return <table className="w-full border-collapse">{children}</table>;
}

function Head({ children }: any) {
  return (
    <thead className="break-words w-full">
      {" "}
      <tr className="bg-[#ECEDED] w-full">{children}</tr>
    </thead>
  );
}

function THead({ title, styling }: any) {
  return <th className={`break-keep py-3 ${styling}`}>{title}</th>;
}

function Body({ children }: any) {
  return <tbody>{children}</tbody>;
}

Table.Head = Head;
Table.Body = Body;

Head.THead = THead;

export { Table };
