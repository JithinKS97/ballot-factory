import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/theme";
import { MetaMaskProvider } from "metamask-react";
import NotifyWrongChain from "../src/info/NotifyWrongChain";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [currentAccount, setCurrentAccount] = useState("");

  return (
    <MetaMaskProvider>
      <NotifyWrongChain />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </MetaMaskProvider>
  );
}

export default MyApp;
