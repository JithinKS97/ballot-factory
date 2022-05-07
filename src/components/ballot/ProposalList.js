import React from "react";
import { Box, Heading, Flex, HStack, Button } from "@chakra-ui/react";

export default function ProposalList(props) {
  const { list, didIVote, onVote: handleVote, myVote } = props;
  const handleVoteClick = (index) => async () => {
    await handleVote(index);
  };

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
            <Flex justify="space-between">
              {Number(myVote?.vote?.toString()) === index && didIVote ? (
                <Box
                  padding={"1"}
                  borderRadius="5"
                  color="black"
                  backgroundColor="lightgreen"
                  marginRight="10"
                >
                  Voted
                </Box>
              ) : null}
              <Box marginTop="2" marginRight="10">
                No of votes: {item[1].toString()}
              </Box>{" "}
              <Button
                visibility={!didIVote ? "visible" : "hidden"}
                onClick={handleVoteClick(index)}
              >
                Vote
              </Button>
            </Flex>
          </Flex>
        </Box>
      ))}
    </Box>
  );
}
