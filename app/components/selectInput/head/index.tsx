import { Button } from "../../button";

function InputHead({ className, onClick, value, Icon }: any) {
    return (
        <>
            <Button className={className.btnClassName} onClick={onClick}>
                <span className="flex truncate">
                    <p className={className.selectedClassName}>{value || "Please Select"}</p>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0  flex items-center pr-1 cursor-pointer">
                    {Icon}
                </span>
            </Button>
        </>
    );
}

export { InputHead };
