import { useEffect, useState } from "react";

const DEFAULT_POLLING_TIME = 3_000;

function usePolling(callback, pollingTime = DEFAULT_POLLING_TIME) {
  const [data, setData] = useState();

  useEffect(() => {
    async function performCall() {
      try {
        const data = await callback();
        setData(data);
      } catch (exception) {
        console.log("polling error: ", exception);
      }
    }

    // perform the call
    performCall();

    // set the inteval to perform the polling
    const intervalId = setInterval(() => {
      performCall();
    }, pollingTime);

    return () => {
      clearInterval(intervalId);
    };
  }, [callback, pollingTime]);

  return data;
}

export default usePolling;
