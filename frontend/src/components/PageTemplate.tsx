import { Box, Flex, Heading, Avatar, Link } from '@chakra-ui/react';
import useUserContext from '../Context/UseUserContext';
import { If, Then, Else } from 'react-if';
import { useState } from 'react';

export default function PageTemplate({ children }: { children: React.ReactNode }) {
  const userContext = useUserContext();
  const { user } = userContext;

  const [signInModalOpen, setSignInModalOpen] = useState(false);

  return (
    <Flex direction="column" align="center">
      <Box as="header" w="100%" p={4} bg="gray.800">
        <Flex justify="space-between" align="center">
          <Heading as="h1" size="2xl" color="white">
            My Store
          </Heading>
          <If condition={!!user}>
            <Then>
              <Avatar name={user?.email} src="" />
            </Then>
            <Else>
              <Link as='button' color="white" onClick={() => setSignInModalOpen(true)}>Sign in</Link>
            </Else>
          </If>
        </Flex>
      </Box>
      {children}
    </Flex>
  );
}