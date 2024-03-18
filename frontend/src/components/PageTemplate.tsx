import { Box, Flex, Heading, Avatar, Link, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Button, useDisclosure } from '@chakra-ui/react';
import useUserContext from '../Context/UseUserContext';
import { useState } from 'react';

export default function PageTemplate({ children }: { children: React.ReactNode }) {
  const { user, signIn } = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');

  const handleSignIn = () => {
    signIn(email);
    onClose();
  };

  return (
    <Flex direction="column" align="center">
      <Box as="header" w="100%" p={4} bg="gray.800">
        <Flex justify="space-between" align="center">
          <Heading as="h1" size="2xl" color="white">
            My Store
          </Heading>
          {user ? (
            <Avatar name={user.email} src="" />
          ) : (
            <Link color="white" onClick={onOpen}>Sign in</Link>
          )}
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <Button mt={4} colorScheme="blue" onClick={handleSignIn}>Sign In</Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {children}
    </Flex>
  );
}