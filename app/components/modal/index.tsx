import { ModalCloseIcon } from "@/app/icons";
import { ConditionalRenderer } from "../conditionalRenderer";

function Modal({ children, isShow, className }: any) {
  // "flex flex-col bg-white" for full width;
  return (
    <ConditionalRenderer condition={isShow}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10"></div>
      <div
        className={`fixed inset-0 z-10 my-[0.8dvh] mx-5 rounded-lg overflow-visible ${className}`}
      >
        <div className="bg-white py-5 w-full overflow-visible rounded-lg px-[0.8dvw]">
          {children}
        </div>
      </div>
    </ConditionalRenderer>
  );
}

function Header({ title, onclickHandler, children, isChildren }: any) {
  if (isChildren) return children;

  return (
    <>
      <div className="flex justify-between my-4">
        <div className="flex">
          <h1 className="m-0 text-[20px] leading-[28px] font-bold text-[#151D48]">
            {title}
          </h1>
        </div>
        <div className="cursor-pointer" onClick={onclickHandler}>
          <ModalCloseIcon />
        </div>
      </div>
    </>
  );
}

Modal.Header = Header;

export { Modal };
