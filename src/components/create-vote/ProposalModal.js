import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import ProposalDetails from "./ProposalDetails";

function ProposalModal(props) {
  const {
    isOpen,
    onClose: handleClose,
    onSubmit: handleSubmit,

    list,
  } = props;

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add proposals</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProposalDetails onSubmit={handleSubmit} list={list} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProposalModal;
