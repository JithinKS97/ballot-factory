import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/theme";
import { MetaMaskProvider } from "metamask-react";
import NotifyWrongChain from "../src/info/NotifyWrongChain";

function MyApp({ Component, pageProps }) {
  return (
    <MetaMaskProvider>
      <ChakraProvider theme={theme}>
        <NotifyWrongChain />
        <Component {...pageProps} />
      </ChakraProvider>
    </MetaMaskProvider>
  );
}

export default MyApp;
