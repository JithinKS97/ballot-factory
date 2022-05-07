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
  const [didIVote, setDidIVote] = useState(false);

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
      setDidIVote(res[0]);
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
        <ProposalList didIVote={didIVote} list={proposalList} />
      </VStack>
    </Center>
  );
}
