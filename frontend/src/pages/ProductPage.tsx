import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Flex, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useDisclosure } from "@chakra-ui/react";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import { When } from "react-if";
import useUserContext from "../Context/UseUserContext";
import { Order, Product } from "../models/api";
import { AsyncWrapper } from "../components/AsyncWrapper";
import { CheckIcon } from '@chakra-ui/icons';
import formatCurrency from '../helpers/formatCurrency';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUserContext();
  const [product] = useAxios<Product>(`/api/products/${id}`);
  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState<Order>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [availableStock, setAvailableStock] = useState<number>(0);

  useEffect(() => {
    setAvailableStock(product?.data?.stock || 0);
  }, [product?.data?.stock]);

  const handleOrderButton = async () => {
    const response = await axios.post<Order>('/api/orders', {
      productId: product?.data?.id,
      quantity,
      customerId: user?.id,
    });
    setOrder(response.data);
    setAvailableStock(response.data.product.stock);
    onOpen();
  };

  return (
    <AsyncWrapper requests={[product]}>
      <Box padding="4" borderWidth="1px" borderRadius="lg">
        <Heading mb="2">{product?.data?.name}</Heading>
        <Text fontSize="lg" mb="2">{product?.data?.description}</Text>
        <Text fontWeight="bold">Price: {formatCurrency(product?.data?.price || 0)}</Text>
        <Text mb="2">Stock: {availableStock}</Text>

        <When condition={!!user}>
          <Flex align="center" mb="2">
            <Text mr="2">Quantity:</Text>
            <NumberInput min={1} max={product?.data?.stock || 1} defaultValue={1} value={quantity} onChange={(valueString) => setQuantity(parseInt(valueString))}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <Button colorScheme="teal" onClick={handleOrderButton}>
            Order Now
          </Button>
        </When>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Success! <CheckIcon color="green.500" /></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Your order for {order?.product.name} has been placed successfully.</Text>
            <Text>Quantity: {order?.quantity}</Text>
            <Text>Final Price: {formatCurrency(order?.price || 0)}</Text>
            <Text>Your order will be shipped to: {order?.customer.address}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </AsyncWrapper>
  );
}