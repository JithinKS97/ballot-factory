import React from "react";
import { Center } from "@chakra-ui/react";
import CreateVote from "./CreateVote";
import { getAllBallots } from "../../api/ballotFactoryAPI";
import { useEffect } from "react";

export default function VotesList() {
  useEffect(() => {
    getAllBallots();
  }, []);

  return (
    <Center>
      <CreateVote />
    </Center>
  );
}
