import React from "react";
import { Center, Button, VStack, Heading, Box } from "@chakra-ui/react";
import CreateBallot from "./CreateBallot";
import { useMetaMask } from "metamask-react";
import { useEffect } from "react";
import { BallotFactoryAPI } from "../../api/ballotFactoryAPI";
import { useState } from "react";
import BallotList from "./BallotList";

const ballotFactoryAbi = new BallotFactoryAPI();

export default function BallotCreateList() {
  const { status, connect } = useMetaMask();
  const [ballots, setBallots] = useState([]);

  const fetchBallot = () => {
    ballotFactoryAbi.getBallots().then((res) => {
      if (!res) {
        return;
      }
      setBallots(res);
    });
  };

  useEffect(() => {
    fetchBallot();
  }, []);

  const handleConnect = () => {
    connect();
  };

  return (
    <>
      <Center>
        <VStack>
          <Heading size="2xl" mb="5" mt="10">
            Ballot factory
          </Heading>
          {status === "connected" ? (
            <Box>
              <CreateBallot onCreate={fetchBallot} />
            </Box>
          ) : (
            <Button onClick={handleConnect}>Connect</Button>
          )}
          <BallotList ballots={ballots} />
        </VStack>
      </Center>
    </>
  );
}
