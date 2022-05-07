import React from "react";
import { Box, Heading } from "@chakra-ui/react";

export default function BallotList(props) {
  const { ballots } = props;

  return (
    <Box>
      {ballots.map((item, index) => (
        <Box
          w="40vw"
          padding="5"
          border="1px solid grey"
          marginTop="5"
          key={index}
        >
          <Heading>{item[0]}</Heading>
        </Box>
      ))}
    </Box>
  );
}
