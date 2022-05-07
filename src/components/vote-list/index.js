import React from "react";
import { Center, Button } from "@chakra-ui/react";
import CreateVote from "./CreateVote";
import { useMetaMask } from "metamask-react";
import { useEffect } from "react";
import { getBallots } from "../../api/ballotFactoryAPI";

export default function VotesList() {
  const { status, connect } = useMetaMask();

  useEffect(() => {
    getBallots();
  }, []);

  const handleConnect = () => {
    connect();
  };

  return (
    <Center margin="10">
      {status === "connected" ? (
        <CreateVote />
      ) : (
        <Button onClick={handleConnect}>Connect</Button>
      )}
    </Center>
  );
}
