import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function BallotList(props) {
  const { ballots } = props;
  const router = useRouter();

  const handleClick = (id) => () => {
    router.push(`/ballot/${id}`);
  };

  return (
    <Box>
      <style>{style}</style>
      {ballots.map((item, index) => (
        <Box
          cursor={"pointer"}
          w="50vw"
          padding="5"
          border="1px solid grey"
          marginTop="5"
          key={index}
          className="tile"
          onClick={handleClick(item[1])}
        >
          <Heading>{item[0]}</Heading>
          <Box>{item[1]}</Box>
        </Box>
      ))}
    </Box>
  );
}

const style = `
  .tile:hover {
    background-color:white;
    color:black
  }
`;
