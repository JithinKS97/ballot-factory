import React from "react";
import { Box, Button } from "@chakra-ui/react";
import ProposalModal from "./ProposalModal";
import { useState } from "react";

export default function CreateVote() {
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  const handleCreateClick = () => {
    setIsProposalModalOpen(true);
  };

  const closeProposalModal = () => {
    setIsProposalModalOpen(false);
  };

  const handleProposalsSubmit = (titleAndProposals) => {
    console.log(titleAndProposals);
    setIsProposalModalOpen(false);
  };

  return (
    <>
      <ProposalModal
        onClose={closeProposalModal}
        isOpen={isProposalModalOpen}
        onSubmit={handleProposalsSubmit}
      />
      <Box margin="10">
        <Button onClick={handleCreateClick}>Create a new vote</Button>
      </Box>
    </>
  );
}
