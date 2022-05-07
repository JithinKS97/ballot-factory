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

  useEffect(() => {
    if (!id) {
      return;
    }
    ballotAPI = new BallotAPI(id);
    getTitle();
    getPropsals();
    getMyVote();
  }, [id]);

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
      console.log(res);
      setDidIVote(res[0]);
    });
  };

  const handleVote = async (proposalIndex) => {
    await ballotAPI.vote(proposalIndex);
    getMyVote();
  };

  return (
    <Center padding={"10"}>
      <VStack>
        <Heading>{title}</Heading>
        <ProposalList
          onVote={handleVote}
          didIVote={didIVote}
          list={proposalList}
          myVote={myVote}
        />
      </VStack>
    </Center>
  );
}
