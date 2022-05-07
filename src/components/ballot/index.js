import React from "react";
import { Center, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Ballot() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <Center padding={"10"}>
      <Box>Ballot address: {id}</Box>
    </Center>
  );
}
