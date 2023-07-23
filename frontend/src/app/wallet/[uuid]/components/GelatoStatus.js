import { GelatoRelayPack } from "@safe-global/relay-kit";
import { useCallback, useEffect } from "react";
import { Typography } from "@web3uikit/core";
import { getChainById } from "../context/chains";
import useApi from "../context/useApi";

const pollingTime = 4_000; // 4 seconds of polling time to update the Gelato task status

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

  const chain = getChainById(chainId);
  const isCancelled = gelatoTaskInfo?.taskState === "Cancelled";

  useEffect(() => {
    if (gelatoTaskInfo?.transactionHash) {
      setTransactionHash(gelatoTaskInfo.transactionHash);
    }
  }, [gelatoTaskInfo, setTransactionHash]);

  return (
    <div>
      {gelatoTaskInfo?.taskState ? (
        <Typography variant="caption12" color="#FFFF">
          {getGelatoTaskStatusLabel(gelatoTaskInfo.taskState)}
        </Typography>
      ) : (
        <Typography variant="caption12" color="#FFB700">
          Loading status...
        </Typography>
      )}
      {/* Transaction hash */}
      {!isCancelled && (
        <div>
          {transactionHash ? (
            <>
              <Typography variant="h5" color="#FFFF">
                Transaction Hash:{" "}
              </Typography>
              <Typography variant="body16" color="#FFFF">
                <a
                  href={`${chain?.blockExplorerUrl}/tx/${transactionHash}`}
                  target="_blank"
                >
                  {transactionHash}
                </a>
              </Typography>
            </>
          ) : (
            <Typography variant="caption12" color="#FFB700">
              Loading hash...
            </Typography>
          )}
        </div>
      )}
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
