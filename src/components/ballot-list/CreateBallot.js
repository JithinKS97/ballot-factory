import React from "react";
import { Button } from "@chakra-ui/react";
import ProposalModal from "./ProposalModal";
import { useState } from "react";
import { BallotFactoryAPI } from "../../api/ballotFactoryAPI";
import { useToast } from "@chakra-ui/react";

const ballotFactoryAPI = new BallotFactoryAPI();

export default function CreateBallot(props) {
  const { onCreate: handleCreate } = props;
  const toast = useToast();
  const toastIdRef = React.useRef();

  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  const handleCreateClick = () => {
    setIsProposalModalOpen(true);
  };

  const closeProposalModal = () => {
    setIsProposalModalOpen(false);
  };

  const handleProposalsSubmit = async (titleAndProposals) => {
    setIsProposalModalOpen(false);
    toastIdRef.current = toast({
      description: "Ballot is being created...",
      status: "info",
      duration: null,
      position: "top-right",
    });
    await ballotFactoryAPI.createBallot(
      titleAndProposals.proposalList,
      titleAndProposals.title
    );
    toast.close(toastIdRef.current);
    toast({
      description: "Ballot created...",
      status: "success",
      duration: 2000,
      position: "top-right",
    });
    handleCreate();
  };

  return (
    <>
      <ProposalModal
        onClose={closeProposalModal}
        isOpen={isProposalModalOpen}
        onSubmit={handleProposalsSubmit}
      />
      <Button onClick={handleCreateClick}>Create a new ballot</Button>
    </>
  );
}
