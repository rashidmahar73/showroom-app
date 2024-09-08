import { InputField } from "@/app/components";

function InputGrid({ items = [], setState, state }: any) {
  function handleOnChange(e: { target: { name: string; value: string } }) {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      {items?.map(({ type, label, name, value }: any, index: any) => (
        <div key={`user-registration-${index}`}>
          <InputField
            parentClass="flex flex-col mt-3"
            className="h-[40px] border-[1px] w-full border-black rounded-[5px]"
            type={type}
            label={label}
            labelStyling="font-bold text-[15px] pb-4"
            name={name}
            value={value}
            onChange={handleOnChange}
          />
        </div>
      ))}
    </div>
  );
}

export { InputGrid };
