"use client";
import { EthHashInfo } from "@safe-global/safe-react-components";
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { useEffect, useState } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { SafeThemeProvider } from "@safe-global/safe-react-components";
import { Web3AuthModalPack } from "../../../lib";
import SSOButton from "../../components/SSOButton";

const Page = () => {
  return (
    <SafeThemeProvider mode="dark">
      {(safeTheme) => (
        <ThemeProvider theme={safeTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      )}
    </SafeThemeProvider>
  );
};

const connectedHandler = (data) => console.log("CONNECTED", data);
const disconnectedHandler = (data) => console.log("DISCONNECTED", data);

const App = () => {
  const [web3AuthModalPack, setWeb3AuthModalPack] = useState();
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState(null);
  const [userInfo, setUserInfo] = useState();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    (async () => {
      const options = {
        clientId:
          "BNkMIkRhFLvjSiQSRNCj2bw62X924tqQVXzWcPfmamhxBhHBEFp7uK9442tJhRNbs5Qcz_RghN-7p9WDRq-96C0",
        web3AuthNetwork: "testnet",
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x5",
          rpcTarget: `https://goerli.infura.io/v3/70a25844c6ff4c1fafd502976e4d97da`,
        },
        uiConfig: {
          theme: "dark",
          loginMethodsOrder: ["google", "facebook"],
        },
      };

      const modalConfig = {
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
        txServiceUrl: "https://safe-transaction-goerli.safe.global",
      });

      await web3AuthModalPack.init({
        options,
        adapters: [openloginAdapter],
        modalConfig,
      });

      web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);

      web3AuthModalPack.subscribe(
        ADAPTER_EVENTS.DISCONNECTED,
        disconnectedHandler
      );

      setWeb3AuthModalPack(web3AuthModalPack);

      return () => {
        web3AuthModalPack.unsubscribe(
          ADAPTER_EVENTS.CONNECTED,
          connectedHandler
        );
        web3AuthModalPack.unsubscribe(
          ADAPTER_EVENTS.DISCONNECTED,
          disconnectedHandler
        );
      };
    })();
  }, []);

  useEffect(() => {
    if (web3AuthModalPack && web3AuthModalPack.getProvider()) {
      (async () => {
        await login();
      })();
    }
  }, [web3AuthModalPack]);

  const login = async () => {
    if (!web3AuthModalPack) return;

    const signInInfo = await web3AuthModalPack.signIn();
    console.log("SIGN IN RESPONSE: ", signInInfo);

    const userInfo = await web3AuthModalPack.getUserInfo();
    console.log("USER INFO: ", userInfo);

    setSafeAuthSignInResponse(signInInfo);
    setUserInfo(userInfo || undefined);
    setProvider(web3AuthModalPack.getProvider());
  };

  const logout = async () => {
    if (!web3AuthModalPack) return;
    await web3AuthModalPack.signOut();
    setProvider(null);
    setSafeAuthSignInResponse(null);
  };

  return (
    <>
      <SSOButton
        onLogin={login}
        onLogout={logout}
        userInfo={userInfo}
        isLoggedIn={!!provider}
      />
      {safeAuthSignInResponse?.eoa && (
        <div style={{ display: "flex", columnGap: "4rem" }}>
          <div>
            <h3>Account</h3>
            <hr />
            <EthHashInfo
              address={safeAuthSignInResponse.eoa}
              showCopyButton
              showPrefix
              prefix={getPrefix("0x5")}
            />
          </div>
          <div>
            <h3>Available Safes</h3>
            <hr />
            {safeAuthSignInResponse?.safes?.length ? (
              safeAuthSignInResponse?.safes?.map((safe) => (
                <div key={safe}>
                  <EthHashInfo
                    address={safe}
                    showCopyButton
                    shortAddress={false}
                  />
                </div>
              ))
            ) : (
              <p>No Available Safes</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const getPrefix = (chainId) => {
  switch (chainId) {
    case "0x1":
      return "eth";
    case "0x5":
      return "gor";
    case "0x100":
      return "gno";
    case "0x137":
      return "matic";
    default:
      return "eth";
  }
};

export default Page;
