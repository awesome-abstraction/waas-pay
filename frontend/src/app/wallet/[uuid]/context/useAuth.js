import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { ethers } from "ethers";
import { useCallback, useState } from "react";
import config from "../../../../config";
import { Web3AuthModalPack } from "../../../../lib";
import { goerliChain } from "./chains";

const getAuthOptions = (chain) => ({
  clientId: config.web3AuthClientId,
  web3AuthNetwork: "testnet",
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: chain.id,
    rpcTarget: chain.rpcUrl,
  },
  uiConfig: {
    theme: "dark",
    loginMethodsOrder: ["google", "facebook"],
  },
});

const MODAL_CONFIG = {
  [WALLET_ADAPTERS.TORUS_EVM]: {
    label: "torus",
    showOnModal: false,
  },
  [WALLET_ADAPTERS.METAMASK]: {
    label: "metamask",
    showOnDesktop: true,
    showOnMobile: false,
  },
};

const useAuth = (initialChain = goerliChain) => {
  // owner address from the email  (provided by web3Auth)
  const [ownerAddress, setOwnerAddress] = useState("");
  // safes owned by the user
  const [safes, setSafes] = useState([]);
  // chain selected by the user
  // const [chainId, setChainId] = useState(initialChain.id);
  // web3 provider to perform signatures
  const [web3Provider, setWeb3Provider] = useState();
  // authClient
  const [web3AuthModalPack, setWeb3AuthModalPack] = useState();
  // current safe selected by the user
  const [safeSelected, setSafeSelected] = useState("");
  // user info
  const [userInfo, setUserInfo] = useState(null);

  const isAuthenticated = !!ownerAddress; // && !!chainId;
  const chain = initialChain; // getChainById(chainId) || initialChain;

  // reset when you switch the chain
  /*useEffect(() => {
    setOwnerAddress("");
    setSafes([]);
    setChainId(chain.id);
    setWeb3Provider(undefined);
    setSafeSelected("");
  }, [chain]);
  */

  /*
  useEffect(() => {
    if (web3AuthModalPack && web3AuthModalPack.getProvider()) {
      (async () => {
        await login();
      })();
    }
  }, [web3AuthModalPack]);
  */

  const loginWeb3Auth = useCallback(async () => {
    try {
      const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: "mandatory",
        },
        adapterSettings: {
          uxMode: "popup",
          whiteLabel: {
            name: "Safe",
          },
        },
      });

      const web3AuthModalPack = new Web3AuthModalPack({
        txServiceUrl: chain.transactionServiceUrl,
      });

      await web3AuthModalPack.init({
        options: getAuthOptions(chain),
        adapters: [openloginAdapter],
        modalConfig: MODAL_CONFIG,
      });

      if (web3AuthModalPack) {
        const signInInfo = await web3AuthModalPack.signIn();
        console.log("SIGN IN RESPONSE: ", signInInfo);

        const userInfo = await web3AuthModalPack.getUserInfo();
        console.log("USER INFO: ", userInfo);

        const provider = web3AuthModalPack.getProvider();
        console.log("FETCHING PROVIDER");

        setUserInfo(userInfo);
        // setChainId(chain.id);
        setOwnerAddress(signInInfo.eoa);
        setSafes(signInInfo.safes || []);

        setWeb3Provider(new ethers.providers.Web3Provider(provider));
        setWeb3AuthModalPack(web3AuthModalPack);
      }
    } catch (err) {
      console.log("AUTH ERROR: ", err);
    }
  }, [chain]);

  const logoutWeb3Auth = () => {
    web3AuthModalPack?.signOut();
    setOwnerAddress("");
    setSafes([]);
    // setChainId(chain.id);
    setWeb3Provider(undefined);
    setSafeSelected("");
  };

  return {
    ownerAddress,
    chainId: chain.id,
    chain,
    safes,
    isAuthenticated,
    web3Provider,
    loginWeb3Auth,
    logoutWeb3Auth,
    // setChainId,
    safeSelected,
    setSafeSelected,
    userInfo,
  };
};

export default useAuth;
