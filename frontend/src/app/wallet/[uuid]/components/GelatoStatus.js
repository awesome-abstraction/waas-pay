import { GelatoRelayPack } from "@safe-global/relay-kit";
import { useCallback, useEffect } from "react";

import { getChainById } from "../context/chains";
import useApi from "../context/useApi";

const pollingTime = 4_000; // 4 seconds of polling time to update the Gelato task status

// TODO: rename this to TrackGelatoTaskStatus
const GelatoTaskStatus = ({
  gelatoTaskId,
  chainId,
  transactionHash,
  setTransactionHash,
}) => {
  const fetchGelatoTaskInfo = useCallback(
    async () => await new GelatoRelayPack().getTaskStatus(gelatoTaskId),
    [gelatoTaskId]
  );

  const { data: gelatoTaskInfo } = useApi(fetchGelatoTaskInfo, pollingTime);

  console.log("gelatoTaskInfo: ", gelatoTaskInfo);

  const chain = getChainById(chainId);

  const isCancelled = gelatoTaskInfo?.taskState === "Cancelled";
  const isSuccess = gelatoTaskInfo?.taskState === "ExecSuccess";
  const isLoading = !isCancelled && !isSuccess;

  useEffect(() => {
    if (gelatoTaskInfo?.transactionHash) {
      setTransactionHash(gelatoTaskInfo.transactionHash);
    }
  }, [gelatoTaskInfo, setTransactionHash]);

  return (
    <div>
      <p>Gelato Task details</p>
      {isLoading && <p>Loading...</p>}
      {/* Status label */}
      {gelatoTaskInfo?.taskState ? (
        <p>{getGelatoTaskStatusLabel(gelatoTaskInfo.taskState)}</p>
      ) : (
        <p>Loading Status</p>
      )}
      {/* Transaction hash */}
      {!isCancelled && (
        <div>
          <p>Transaction: </p>
          {transactionHash ? (
            <a
              href={`${chain?.blockExplorerUrl}/tx/${transactionHash}`}
              target="_blank"
            >
              {transactionHash}
            </a>
          ) : (
            <p>Loading Hash...</p>
          )}
        </div>
      )}

      {/* Task extra info */}
      {gelatoTaskInfo?.lastCheckMessage && (
        <span>{gelatoTaskInfo.lastCheckMessage}</span>
      )}
    </div>
  );
};

export default GelatoTaskStatus;

const getGelatoTaskStatusLabel = (taskStatus) => {
  const label = {
    CheckPending: "Pending",
    WaitingForConfirmation: "Waiting confirmations",
    ExecPending: "Executing",
    ExecSuccess: "Success",
    Cancelled: "Cancelled",
    ExecReverted: "Reverted",
    Blacklisted: "Blacklisted",
    NotFound: "Not Found",
  };

  return label[taskStatus];
};
