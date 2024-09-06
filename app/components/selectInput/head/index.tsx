import { DropdownIcon } from "@/app/icons";
import { Button } from "../../button";

function InputHead({ className, onClick, value, isOpen }: any) {
    return (
        <>
            <Button className={className.btnClassName} onClick={onClick}>
                <span className="flex truncate">
                    <p className={className.selectedClassName}>
                        {value || "Please Select"}
                    </p>
                </span>
                <span
                    className={`${isOpen
                            ? "rotate-180 transition ease-in-out delay-200"
                            : "rotate-0 transition ease-in-out delay-200"
                        } pointer-events-none absolute inset-y-0 right-2  flex items-center pr-1 cursor-pointer`}
                >
                    <DropdownIcon />
                </span>
            </Button>
        </>
    );
}

export { InputHead };
