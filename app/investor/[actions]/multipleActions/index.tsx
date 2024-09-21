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

  function onClickHandler(type: any, elem: any) {
    return () => {
      if (type === "edit") {
        setIsEdit(true);
        setData(elem);
        return;
      }
    };
  }

  function onClickAddHandler() {
    if (isEdit) {
      setIsEdit(false);
    }

    setReady(data);
    setData(defaultObject);
  }

  const isEmptyFields = hasEmptyString(data);

  const inputItems = moduleInputItems(module, data);

  if (isUpdate) {
    return (
      <Update
        onClickAddHandler={onClickAddHandler}
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
        variant={module === "amountModule"}
      />

      <ActionButton
        condition={isEmptyFields}
        onClick={isEmptyFields ? () => {} : onClickAddHandler}
      >
        {isEdit ? "Update" : "Add"}
      </ActionButton>
      <ConditionalRenderer condition={Object.keys(ready)?.length !== 0}>
        <div className="rounded-sm mt-5">
          <TableWrapper
            headerList={headTitles}
            items={[ready] || []}
            TableRow={TableRow}
            onClickHandler={onClickHandler}
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
