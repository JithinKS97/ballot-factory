import React from "react";
import { Center, Heading, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BallotAPI } from "../../api/ballotAPI";
import { useEffect } from "react";
import { useState } from "react";
import ProposalList from "./ProposalList";

let ballotAPI;

export default function Ballot() {
  const [title, setTitle] = useState("");
  const [proposalList, setProposalList] = useState([]);
  const [myVote, setMyVote] = useState({});

  const router = useRouter();

  const { id } = router.query;

  ballotAPI = new BallotAPI(id);

  const getTitle = () => {
    ballotAPI.getTitle().then((res) => {
      setTitle(res);
    });
  };

  const getPropsals = () => {
    ballotAPI.getProposals().then((res) => {
      setProposalList(res);
    });
  };

  const getMyVote = () => {
    ballotAPI.getMyVote().then((res) => {
      setMyVote(res);
    });
  };

  useEffect(() => {
    getTitle();
    getPropsals();
    getMyVote();
  }, []);

  return (
    <Center padding={"10"}>
      <VStack>
        <Heading>{title}</Heading>
        <ProposalList list={proposalList} />
      </VStack>
    </Center>
  );
}
