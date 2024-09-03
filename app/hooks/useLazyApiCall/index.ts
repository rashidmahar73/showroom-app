import {  useState } from "react";
import { APIHandlerV1 } from "@/app/utils";

export function UseLazyApiCall({
  url,
  method,
  paramsData = {},
}:any) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState<any>(undefined);
  const [error, setError] = useState();

  async function getData(props:any) {
    const localData = props?.params || paramsData;
    const localUrl = props?.url || url;

    let apiResponseInitial = null;
    try {
      setIsLoading(true);
      const apiResponse = await APIHandlerV1({
        method,
        url,
        data: localData,
      });
      setData(apiResponse);
      apiResponseInitial = apiResponse;
    } catch (error:any) {
      const errorMessage = error?.response?.data?.message;
      setError(errorMessage || error);
    } finally {
      setIsLoading(false);
    }
    return apiResponseInitial;
  }

  return [getData, { data, isLoading, error }];
}
