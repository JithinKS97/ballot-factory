import React from "react";
import { Heading, VStack, Button } from "@chakra-ui/react";
import Link from "next/link";
import { BallotAPI } from "../../api/ballotAPI";
import { useEffect } from "react";
import { useState } from "react";
import ProposalList from "./ProposalList";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useToast } from "@chakra-ui/react";

let ballotAPI;

export default function Ballot() {
  const [title, setTitle] = useState("");
  const [proposalList, setProposalList] = useState([]);
  const [myVote, setMyVote] = useState({});
  const [didIVote, setDidIVote] = useState(false);
  const router = useRouter();
  const [currentAccount, setCurrentAccount] = useState("");
  const toast = useToast();
  const toastIdRef = React.useRef();

  const { id } = router.query;

  useEffect(() => {
    window.ethereum.on("accountsChanged", function (accounts) {
      if (accounts[0]) {
        setCurrentAccount(accounts[0]);
      } else {
        setCurrentAccount("");
        setDidIVote(false);
        setMyVote(null);
      }
    });
  }, []);

  useEffect(() => {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        console.log("here");
        console.log(accounts);
        setCurrentAccount(accounts[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getMyVote = useCallback(() => {
    ballotAPI.getMyVote().then((res) => {
      setMyVote(res);
      setDidIVote(res[0]);
      getPropsals();
    });
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }
    ballotAPI = new BallotAPI(id);
    getTitle();
    getPropsals();
    getMyVote();
  }, [id, currentAccount, getMyVote]);

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

  const handleVote = async (proposalIndex) => {
    toastIdRef.current = toast({
      description: "Voting is being done...",
      status: "info",
      duration: null,
      position: "top-right",
    });
    await ballotAPI.vote(proposalIndex);
    toast.close(toastIdRef.current);
    toast({
      description: "Voting done...",
      status: "success",
      duration: 2000,
      position: "top-right",
    });
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
          isAccountSelected={!!currentAccount}
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
