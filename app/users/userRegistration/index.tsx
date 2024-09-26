import { Button, Modal } from "@/app/components";
import { Form } from "./form";
import { UseLazyApiCall } from "@/app/hooks";
import { useEffect } from "react";
import { toastHandler } from "@/app/utils/helpers";
import { toastTypesKeys } from "@/app/utils/constants";

function UserRegistration({
  editableData,
  setIsEdit,
  setIsShow,
  isShow,
  refetchUsers,
}: any) {
  function handleModalClose() {
    setIsEdit({ data: {} });
    setIsShow(!isShow);
  }

  const [getData, { data: signupData }] = UseLazyApiCall({
    url: "users/signup",
    method: "POST",
  }) as any;

  const [getUpdateUserData, { data: updateUserData }] = UseLazyApiCall({
    url: "users/updateUser",
    method: "PUT",
  }) as any;

  async function dataCarrier(userData: any) {
    if (Object.keys(editableData)?.length > 0) {
      const updateUser = {
        userID: userData?.id,
        name: userData.name,
        email: userData.email,
        phonenumber: Number(userData.phonenumber),
        password: userData.password,
        role: userData?.role?.toLowerCase(),
        showroom_name: userData?.showroom_name,
      };
      await getUpdateUserData({ params: updateUser });
      return;
    }

    const userDataDetails = {
      name: userData.name,
      email: userData.email,
      phonenumber: Number(userData.phonenumber),
      password: userData.password,
      role: userData?.role?.toLowerCase(),
      showroom_name: userData?.showroom_name,
    };

    await getData({ params: userDataDetails });
  }

  useEffect(() => {
    if (signupData?.message) {
      toastHandler(signupData.message, toastTypesKeys.success);
      setTimeout(() => {
        setIsShow(false);
        refetchUsers();
      }, 3000);
      return;
    }
  }, [signupData]);

  useEffect(() => {
    if (updateUserData?.status === 200) {
      toastHandler(updateUserData.message, toastTypesKeys.success);
      setTimeout(() => {
        setIsShow(false);
        refetchUsers();
      }, 3000);
    }
  }, [updateUserData]);

  return (
    <>
      <Modal isShow={isShow} className="flex items-center justify-center">
        <Modal.Header
          title={
            Object.keys(editableData).length > 0
              ? "Update User"
              : "User Registration Form"
          }
          onclickHandler={handleModalClose}
        />
        <div className="w-[120dvh]">
          <Form dataCarrier={dataCarrier} editableData={editableData} />
        </div>
      </Modal>
      <Button
        className="h-[40px] bg-[#2182b0] text-[13px] text-white rounded-[5px] px-3"
        onClick={handleModalClose}
      >
        Add Users
      </Button>
    </>
  );
}

export { UserRegistration };
