import { ConditionalRenderer, InputField, SelectInput } from "@/app/components";

function InputGrid({ items = [], setState, state, variant }: any) {
  function handleOnChange(e: { target: { name: string; value: string } }) {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  }

  function onClickHanlder({ name, value }: any) {
    setState({ ...state, [name]: value });
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      {items?.map(({ type, label, name, value }: any, index: any) => (
        <div key={`user-registration-${index}`}>
          <InputField
            className="h-[40px] border-[1px] w-full border-black rounded-[5px]"
            type={type}
            label={label}
            labelStyling="font-bold text-[15px] pb-2"
            name={name}
            value={value}
            onChange={handleOnChange}
          />
        </div>
      ))}
      <ConditionalRenderer condition={variant}>
        <SelectInput
          key="key"
          className={{
            btnClassName:
              "h-[40px] w-full rounded-[3px] border-[1px] border-black",
            labelClassName: "mb-2 text-[14px] font-bold",
            selectedClassName: "text-[14px] pl-2",
          }}
          listItems={[
            { name: "investor_amount_type", value: "Cash" },
            { name: "investor_amount_type", value: "Check" },
            { name: "investor_amount_type", value: "Refund" },
          ]}
          label="Type"
          selectedValue={state?.investor_amount_type}
          onClickHanlder={onClickHanlder}
        />
      </ConditionalRenderer>
    </div>
  );
}

export { InputGrid };
