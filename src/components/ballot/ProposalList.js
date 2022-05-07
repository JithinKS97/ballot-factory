import React from "react";
import { Box, Heading } from "@chakra-ui/react";

export default function ProposalList(props) {
  const { list } = props;

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
          <Heading>{item[0]}</Heading>
        </Box>
      ))}
    </Box>
  );
}
