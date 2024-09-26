"use client";

import { ConditionalRenderer, InputGrid, TableWrapper } from "@/app/components";
import { UseLazyApiCall } from "@/app/hooks";
import { toastTypesKeys } from "@/app/utils/constants";
import { hasEmptyString, toastHandler } from "@/app/utils/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ActionButton } from "../button";
import { Update } from "./update";
import { moduleInputItems } from "./helpers";

function MultipleActions({
  heading,
  defaultObject,
  API,
  headTitles,
  TableRow,
  module,
  parsedData,
  submitKey,
  isUpdate,
  DetailsTable,
  detailsHeading,
}: any) {
  const [ready, setReady] = useState<any>({});
  const [data, setData] = useState(defaultObject);
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (parsedData && isUpdate) return setData(parsedData);
  }, []);

  // to add api Call below

  const [getData, { data: apiData, isLoading: isLoadingAdd }] = UseLazyApiCall({
    url: API?.endpoint,
    method: API?.method,
  }) as any;

  async function onSubmit() {
    const submitData = {
      ...submitKey,
      ...ready,
    };
    await getData({ params: submitData });
  }

  useEffect(() => {
    if (apiData?.status === 200) {
      toastHandler(apiData.message, toastTypesKeys.success);
      setTimeout(() => {
        router.push(`/investor`);
        return;
      }, 3000);
      return;
    }
  }, [apiData]);

  function onClickTableHandler(type: any, elem: any) {
    return () => {
      if (type === "edit") {
        setIsEdit(true);
        setData(elem);
        return;
      }
    };
  }

  const [getUpdateAmountData, { data: updateAmountData }] = UseLazyApiCall({
    url: "users/investors/updateAmount",
    method: "PUT",
  }) as any;

  async function onClickHandler(type: string, updatedData: any) {
    if (type === "update" && updatedData) {
      const updateObj = {
        amount_id: updatedData?.amount_id,
        investor_id: updatedData?.investor_id,
        investor_amount: updatedData?.investor_amount,
        investor_amount_type: updatedData?.investor_amount_type,
        investor_amount_date: updatedData?.investor_amount_date,
      };

      await getUpdateAmountData({ params: updateObj });
      return;
    }

    if (isEdit) {
      setIsEdit(false);
    }

    setReady(data);
    setData(defaultObject);
  }
  
  const isEmptyFields = hasEmptyString(data);

  const inputItems = moduleInputItems(module, data);

  useEffect(() => {
    if (updateAmountData?.status === 200) {
      toastHandler(updateAmountData?.message, toastTypesKeys.success);
      setTimeout(() => {
        router.push(`/investor`);
        return;
      }, 3000);
      return;
    }
  }, [updateAmountData]);

  if (isUpdate) {
    return (
      <Update
        onClickHandler={() => onClickHandler("update", data)}
        data={data}
        setData={setData}
        inputItems={inputItems}
      />
    );
  }

  //   for addBelow

  return (
    <div className="mx-20">
      <ToastContainer />
      <h1 className="font-bold text-center text-[20px] my-5">
        {detailsHeading}
      </h1>
      <div className="rounded-sm mt-5">{DetailsTable}</div>
      <h1 className="font-bold text-center text-[20px] my-5">{heading}</h1>
      <InputGrid
        items={inputItems}
        setState={setData}
        state={data}
        variant={module}
      />

      <ActionButton
        condition={isEmptyFields}
        onClick={isEmptyFields ? () => {} : () => onClickHandler("add", {})}
      >
        {isEdit ? "Update" : "Add"}
      </ActionButton>
      <ConditionalRenderer condition={Object.keys(ready)?.length !== 0}>
        <div className="rounded-sm mt-5">
          <TableWrapper
            headerList={headTitles}
            items={[ready] || []}
            TableRow={TableRow}
            onClickHandler={onClickTableHandler}
          />
        </div>
        <ActionButton condition={isLoadingAdd} onClick={onSubmit}>
          Submit
        </ActionButton>
      </ConditionalRenderer>
    </div>
  );
}

export { MultipleActions };
