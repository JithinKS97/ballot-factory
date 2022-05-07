import React from "react";
import { Button } from "@chakra-ui/react";
import ProposalModal from "./ProposalModal";
import { useState } from "react";
import { BallotFactoryAPI } from "../../api/ballotFactoryAPI";

const ballotFactoryAPI = new BallotFactoryAPI();

export default function CreateBallot(props) {
  const { onCreate: handleCreate } = props;

  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  const handleCreateClick = () => {
    setIsProposalModalOpen(true);
  };

  const closeProposalModal = () => {
    setIsProposalModalOpen(false);
  };

  const handleProposalsSubmit = async (titleAndProposals) => {
    setIsProposalModalOpen(false);
    await ballotFactoryAPI.createBallot(
      titleAndProposals.proposalList,
      titleAndProposals.title
    );
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
