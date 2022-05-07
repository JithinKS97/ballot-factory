import React from "react";
import { Heading, VStack, Button } from "@chakra-ui/react";
import Link from "next/link";
import { BallotAPI } from "../../api/ballotAPI";
import { useEffect } from "react";
import { useState } from "react";
import ProposalList from "./ProposalList";
import { useRouter } from "next/router";

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
      setDidIVote(res[0]);
      getPropsals();
    });
  };

  const handleVote = async (proposalIndex) => {
    await ballotAPI.vote(proposalIndex);
    getMyVote();
  };

  return (
    <>
      <VStack minHeight={"100vh"} padding={"10"}>
        <Heading>{title}</Heading>
        <ProposalList
          onVote={handleVote}
          didIVote={didIVote}
          list={proposalList}
          myVote={myVote}
        />
        <Link href="/">
          <Button position="absolute" bottom="10">
            Back
          </Button>
        </Link>
      </VStack>
    </>
  );
}
