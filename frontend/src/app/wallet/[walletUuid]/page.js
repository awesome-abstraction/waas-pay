"use client";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { Web3AuthModalPack } from "@safe-global/auth-kit";
import { EthHashInfo } from "@safe-global/safe-react-components";
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { useEffect, useState } from "react";
import { SafeThemeProvider } from "@safe-global/safe-react-components";
import { ThemeProvider, CssBaseline } from "@mui/material";

import AppBar from "../../components/AppBar";

const connectedHandler = (data) => console.log("CONNECTED", data);
const disconnectedHandler = (data) => console.log("DISCONNECTED", data);

function Auth() {
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
          chainNamespace: "eip155",
          chainId: "0x5", // Please use 0x5 for Goerli Testnet
          rpcTarget: "https://rpc.ankr.com/eth",
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

      console.log("1");

      const web3AuthModalPack = new Web3AuthModalPack({
        txServiceUrl: "https://safe-transaction-goerli.safe.global",
      });

      console.log("2");

      try {
        await web3AuthModalPack.init({
          options,
          adapters: [openloginAdapter],
          modalConfig,
        });

        console.log("sub");

        web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);

        web3AuthModalPack.subscribe(
          ADAPTER_EVENTS.DISCONNECTED,
          disconnectedHandler
        );

        setWeb3AuthModalPack(web3AuthModalPack);
      } catch (e) {
        console.log("error", e);
      }

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
        try {
          console.log("?login");
          await login();
        } catch (e) {
          console.log("error2", e);
        }
      })();
    }
  }, [web3AuthModalPack]);

  const login = async () => {
    if (!web3AuthModalPack) return;

    console.log("hello login");

    try {
      const signInInfo = await web3AuthModalPack.signIn();
      console.log("SIGN IN RESPONSE: ", signInInfo);

      const userInfo = await web3AuthModalPack.getUserInfo();
      console.log("USER INFO: ", userInfo);

      setSafeAuthSignInResponse(signInInfo);
      setUserInfo(userInfo || undefined);
      setProvider(web3AuthModalPack.getProvider());
    } catch (e) {
      console.log("error3", e);
    }
  };

  const logout = async () => {
    if (!web3AuthModalPack) return;

    await web3AuthModalPack.signOut();

    setProvider(null);
    setSafeAuthSignInResponse(null);
  };

  return (
    <SafeThemeProvider mode="dark">
      {(safeTheme) => (
        <ThemeProvider theme={safeTheme}>
          <CssBaseline />

          <AppBar
            onLogin={login}
            onLogout={logout}
            userInfo={userInfo}
            isLoggedIn={!!provider}
          />
          {safeAuthSignInResponse?.eoa && (
            <Grid container>
              <Grid item md={4} p={4}>
                <Typography variant="h3" color="secondary" fontWeight={700}>
                  Owner account
                </Typography>
                <Divider sx={{ my: 3 }} />
                <EthHashInfo
                  address={safeAuthSignInResponse.eoa}
                  showCopyButton
                  showPrefix
                  prefix={getPrefix("0x5")}
                />
              </Grid>
              <Grid item md={8} p={4}>
                <>
                  <Typography variant="h3" color="secondary" fontWeight={700}>
                    Available Safes
                  </Typography>
                  <Divider sx={{ my: 3 }} />
                  {safeAuthSignInResponse?.safes?.length ? (
                    safeAuthSignInResponse?.safes?.map((safe, index) => (
                      <Box sx={{ my: 3 }} key={index}>
                        <EthHashInfo
                          address={safe}
                          showCopyButton
                          shortAddress={false}
                        />
                      </Box>
                    ))
                  ) : (
                    <Typography
                      variant="body1"
                      color="secondary"
                      fontWeight={700}
                    >
                      No Available Safes
                    </Typography>
                  )}
                </>
              </Grid>
            </Grid>
          )}
        </ThemeProvider>
      )}
    </SafeThemeProvider>
  );
}

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

export default Auth;
