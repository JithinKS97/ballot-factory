import { Box, Input, Button, InputGroup, Heading } from "@chakra-ui/react";
import { useState } from "react";

const ProposalDetails = (props) => {
  const { onSubmit: handleSubmit } = props;

  const [title, setTitle] = useState("");
  const [proposal, setProposal] = useState("");
  const [proposalList, setProposalList] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleProposalChange = (e) => {
    setProposal(e.target.value);
  };

  const handleAddProposal = (newProposal) => {
    setProposalList(Array.from(new Set([...proposalList, newProposal])));
  };

  const handleAddClick = () => {
    if (!proposal) {
      return;
    }
    handleAddProposal(proposal);
    setProposal("");
  };

  const handleProposalRemove = (index) => () => {
    let copy = proposalList.slice();
    copy.splice(index, 1);
    setProposalList(copy);
  };

  const handleSubmitClick = () => {
    const isValidVote = title && proposalList.length > 1;
    if (!isValidVote) {
      alert("Enter a title and atleast 2 proposals");
      return;
    }
    handleSubmit({
      title,
      proposalList,
    });
  };

  return (
    <>
      <Heading size={"md"}>Enter the title</Heading>
      <InputGroup mt="3">
        <Input value={title} onChange={handleTitleChange} placeholder="Title" />
      </InputGroup>
      <Heading mt="10" size={"md"}>
        Proposals
      </Heading>
      <Box>
        <ol>
          {proposalList.map((item, index) => (
            <Box
              justifyContent={"space-between"}
              display={"flex"}
              flexDirection="row"
              key={item}
              mt="3"
            >
              <Box position="relative" top="1">
                {index + 1}. {item}
              </Box>
              <Button onClick={handleProposalRemove(index)} size="sm">
                X
              </Button>
            </Box>
          ))}
        </ol>
      </Box>
      <Box mt="10" display="flex" flexDirection={"row"}>
        <Input onChange={handleProposalChange} value={proposal} />
        <Button onClick={handleAddClick} marginLeft={"5"}>
          Add
        </Button>
      </Box>
      <Button onClick={handleSubmitClick} float="right" mb="5" mt="10">
        Submit
      </Button>
    </>
  );
};

export default ProposalDetails;
