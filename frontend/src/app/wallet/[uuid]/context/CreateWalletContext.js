import AccountAbstraction from "@safe-global/account-abstraction-kit-poc";
import { GelatoRelayPack } from "@safe-global/relay-kit";
import { createContext, useCallback, useContext, useEffect } from "react";
import useAuth from "./useAuth";
import usePolling from "./usePolling";
import useRelay from "./useRelay";

const CreateWalletContext = createContext(null);

export const useCreateWallet = () => {
  const context = useContext(CreateWalletContext);
  if (!context) {
    throw new Error("Called outside of CreateWalletContext");
  }
  return context;
};

export const CreateWalletContextProvider = ({ children }) => {
  const {
    chain,
    chainId,
    isAuthenticated,
    loginWeb3Auth,
    logoutWeb3Auth,
    ownerAddress,
    safes,
    safeSelected,
    setSafeSelected,
    userInfo,
    web3Provider,
  } = useAuth();

  const { relayTransaction, isRelayerLoading, gelatoTaskId } = useRelay();

  useEffect(() => {
    const getSafeAddress = async () => {
      if (web3Provider) {
        const signer = web3Provider.getSigner();
        const relayPack = new GelatoRelayPack();
        const safeAccountAbstraction = new AccountAbstraction(signer);

        await safeAccountAbstraction.init({ relayPack });

        const hasSafes = safes.length > 0;

        const safeSelected = hasSafes
          ? safes[0]
          : await safeAccountAbstraction.getSafeAddress();

        setSafeSelected(safeSelected);
      }
    };

    getSafeAddress();
  }, [safes, web3Provider]);

  // we can pay Gelato tx relayer fees with native token & USDC
  // TODO: ADD native Safe Balance polling
  // TODO: ADD USDC Safe Balance polling

  // fetch safe address balance with polling
  const fetchSafeBalance = useCallback(async () => {
    if (!safeSelected) return;
    const balance = await web3Provider?.getBalance(safeSelected);

    return balance?.toString();
  }, [web3Provider, safeSelected]);

  const safeBalance = usePolling(fetchSafeBalance);

  const state = {
    chain,
    chainId,
    gelatoTaskId,
    isAuthenticated,
    isRelayerLoading,
    loginWeb3Auth,
    logoutWeb3Auth,
    ownerAddress,
    relayTransaction,
    safeBalance,
    safes,
    safeSelected,
    setSafeSelected,
    userInfo,
    web3Provider,
  };

  return (
    <CreateWalletContext.Provider value={state}>
      {children}
    </CreateWalletContext.Provider>
  );
};
