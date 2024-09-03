import { useEffect, useState } from "react";
import { APIHandlerV1 } from "@/app/utils";

export function UseApiCall({ url, method, paramsData = {} }: any) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  async function getData() {
    try {
      setIsLoading(true);
      const data = await APIHandlerV1({
        method,
        url,
        data: paramsData,
      });
      setData(data);
    } catch (error) {
      //   setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function refetch() {
    getData();
  }

  return { data, isLoading, error, refetch };
}
