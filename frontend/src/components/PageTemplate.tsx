import { Box, Flex, Heading, Avatar, Link, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, useDisclosure, Text, FormControl, FormLabel, Input } from '@chakra-ui/react';
import useUserContext from '../Context/UseUserContext';
import React, { useState } from 'react';
import { If, Then, Else } from 'react-if';

export default function PageTemplate({ children }: { children: React.ReactNode }) {
  const { user, signIn, signOut } = useUserContext();
  const {
    isOpen: isSignInOpen,
    onOpen: onSignInOpen,
    onClose: onSignInClose
  } = useDisclosure();
  const {
    isOpen: isUserModalOpen,
    onOpen: onUserModalOpen,
    onClose: onUserModalClose
  } = useDisclosure();
  const [email, setEmail] = useState('');

  const handleSignIn = () => {
    signIn(email);
    onSignInClose();
  };

  return (
    <Flex direction="column" align="center">
      <Box as="header" w="100%" p={4} bg="gray.800">
        <Flex justify="space-between" align="center">
          <Heading as="h1" size="2xl" color="white">
            My Store
          </Heading>
          <If condition={!!user}>
            <Then>
              <Avatar name={user?.email} src="" onClick={onUserModalOpen} cursor="pointer" />
            </Then>
            <Else>
              <Link color="white" onClick={onSignInOpen}>Sign in</Link>
            </Else>
          </If>
        </Flex>
      </Box>

      <Modal isOpen={isSignInOpen} onClose={onSignInClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button mt={4} colorScheme="blue" onClick={handleSignIn}>Sign In</Button>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isUserModalOpen} onClose={onUserModalClose} motionPreset='slideInTop' >
        <ModalOverlay />
        <ModalContent mt='4' mr='4' mb='auto' ml='auto'>
          <ModalHeader>User Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Email: {user?.email}</Text>
            <Link color="red.500" onClick={() => { signOut(); onUserModalClose(); }}>Sign out</Link>
          </ModalBody>
        </ModalContent>
      </Modal>

      {children}
    </Flex>
  );
}