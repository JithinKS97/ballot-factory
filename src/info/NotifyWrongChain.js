import React from "react";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import config from "../../config";

const { chainId } = config;
let toastId;

export default function NotifyWrongChain() {
  const toast = useToast();

  const [selectedChainId, setSelectedChainId] = useState(null);

  useEffect(() => {
    if (window) {
      window.ethereum.on("chainChanged", (chainId) => {
        setSelectedChainId(chainId);
      });
      console.log(window.ethereum.chainId);
      setSelectedChainId(window.ethereum.chainId);
    }
  }, []);

  useEffect(() => {
    toast.closeAll();
    if (selectedChainId !== chainId) {
      toastId = toast({
        position: "bottom",
        description: "Select goerli chain",
        isClosable: false,
        status: "error",
        duration: null,
      });
    } else {
      toast.closeAll();
    }
  }, [selectedChainId, toast]);

  return <div></div>;
}
