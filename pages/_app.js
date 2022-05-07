import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/theme";
import { MetaMaskProvider } from "metamask-react";

function MyApp({ Component, pageProps }) {
  return (
    <MetaMaskProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </MetaMaskProvider>
  );
}

export default MyApp;
