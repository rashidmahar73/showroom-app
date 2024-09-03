import { Button, Modal } from "@/app/components";
import { Form } from "./form";

function UserRegistration({ editableData, setIsEdit, setIsShow, isShow }: any) {
  function handleModalClose() {
    setIsEdit({ data: {} });
    setIsShow(!isShow);
  }

  async function dataCarrier(userData: any) {
    const userDataDetails = {
      name: userData.name,
      email: userData.email,
      phonenumber: Number(userData.phonenumber),
      password: userData.password,
      role: userData?.role?.toLowerCase(),
    };

    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDataDetails),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result.message);
      } else {
        console.error("Signup failed:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <Modal isShow={isShow} className="flex items-center justify-center">
        <Modal.Header
          title="User Registration Form"
          onclickHandler={handleModalClose}
        />
        <Form dataCarrier={dataCarrier} editableData={editableData} />
      </Modal>
      <Button
        className="h-[40px] bg-[#2182b0] text-white rounded-[5px] px-3"
        onClick={handleModalClose}
      >
        Add User
      </Button>
    </>
  );
}

export { UserRegistration };
