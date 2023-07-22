import { useEffect, useState } from "react";

function useApi(apiCall, pollingTime) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const abortController = new AbortController();

    async function performApiCall() {
      try {
        setIsLoading(true);
        const data = await apiCall(abortController.signal);
        setData(data);
      } catch (exception) {
        setData(undefined);
      } finally {
        setIsLoading(false);
      }
    }

    let intervalId;

    if (pollingTime) {
      intervalId = setInterval(() => {
        performApiCall();
      }, pollingTime);
    }

    performApiCall();

    return () => {
      abortController.abort();
      clearInterval(intervalId);
    };
  }, [apiCall, pollingTime]);

  return {
    isLoading,
    data,
  };
}

export default useApi;
