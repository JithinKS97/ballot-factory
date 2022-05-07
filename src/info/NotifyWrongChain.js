import React from "react";
import { useMetaMask } from "metamask-react";

export default function NotifyWrongChain() {
  const { chainId } = useMetaMask();

  return <div></div>;
}
