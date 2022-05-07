import React from "react";
import { Button } from "@chakra-ui/react";
import ProposalModal from "./ProposalModal";
import { useState } from "react";
import { createBallot } from "../../api/ballotFactoryAPI";

export default function CreateVote() {
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  const handleCreateClick = () => {
    setIsProposalModalOpen(true);
  };

  const closeProposalModal = () => {
    setIsProposalModalOpen(false);
  };

  const handleProposalsSubmit = async (titleAndProposals) => {
    setIsProposalModalOpen(false);
    await createBallot(titleAndProposals.proposalList, titleAndProposals.title);
  };

  return (
    <>
      <ProposalModal
        onClose={closeProposalModal}
        isOpen={isProposalModalOpen}
        onSubmit={handleProposalsSubmit}
      />
      <Button onClick={handleCreateClick}>Create a new vote</Button>
    </>
  );
}
