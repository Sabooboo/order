import { Box, Flex, Heading } from "@chakra-ui/react";

export default function PageTemplate({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="column" align="center">
      <Box as="header" w="100%" p={4} bg="gray.800">
        <Heading as="h1" size="2xl" color="white" textAlign='center'>
          My Store
        </Heading>
      </Box>
      {children}
    </Flex>
  );
}