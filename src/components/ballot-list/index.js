import React from "react";
import { Center, Button, VStack } from "@chakra-ui/react";
import CreateBallot from "./CreateBallot";
import { useMetaMask } from "metamask-react";
import { useEffect } from "react";
import { BallotFactoryAPI } from "../../api/ballotFactoryAPI";
import { useState } from "react";
import BallotList from "./BallotList";

const ballotFactoryAbi = new BallotFactoryAPI();

export default function BallotCreateList() {
  const { status } = useMetaMask();
  const [ballots, setBallots] = useState([]);
  const fetchBallot = () => {
    ballotFactoryAbi.getBallots().then((res) => {
      console.log(res);
      setBallots(res);
    });
  };

  useEffect(() => {
    fetchBallot();
  }, []);

  const handleConnect = () => {
    ballotFactoryAbi.connect();
  };

  return (
    <>
      <Center margin="10">
        <VStack>
          {status === "connected" ? (
            <CreateBallot onCreate={fetchBallot} />
          ) : (
            <Button onClick={handleConnect}>Connect</Button>
          )}
          <BallotList ballots={ballots} />
        </VStack>
      </Center>
    </>
  );
}
