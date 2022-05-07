import React from "react";
import { Box, Heading, Flex, HStack, Button } from "@chakra-ui/react";

export default function ProposalList(props) {
  const { list, didIVote, onVote: handleVote } = props;
  const handleVoteClick = (index) => async () => {
    await handleVote(index);
    alert("Voted");
  };

  console.log(list);

  return (
    <Box>
      {list.map((item, index) => (
        <Box
          width="60vw"
          marginTop="5"
          padding="5"
          border="1px solid grey"
          key={index}
        >
          <Flex justify="space-between">
            <Heading size="lg">{item[0]}</Heading>
            <HStack>
              <Box marginRight="10">No of votes: {item[1].toString()}</Box>
              {!didIVote ? (
                <Button onClick={handleVoteClick(index)}>Vote</Button>
              ) : null}
            </HStack>
          </Flex>
        </Box>
      ))}
    </Box>
  );
}
