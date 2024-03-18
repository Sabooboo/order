import { useState } from 'react';
import { Box, Button, Heading, Text, Flex, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import { Order, Product } from "../models/api";
import { AsyncWrapper } from "../components/AsyncWrapper";
import useUserContext from "../Context/UseUserContext";
import { When } from 'react-if';
import axios from 'axios';
import formatCurrency from '../helpers/formatCurrency';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUserContext();
  const [product] = useAxios<Product>(`/api/products/${id}`);
  const [quantity, setQuantity] = useState(1);

  const handleOrderButton = async () => {
    console.log('Ordering', quantity, 'of', product?.data?.name);
    await axios.post<Order>('/api/orders', {
      productId: product?.data?.id,
      quantity,
      customerId: user?.id,
    });
  };

  return (
    <AsyncWrapper requests={[product]}>
      <Box padding="4" borderWidth="1px" borderRadius="lg">
        <Heading mb="2">{product?.data?.name}</Heading>
        <Text fontSize="lg" mb="2">{product?.data?.description}</Text>
        <Text fontWeight="bold">Price: {formatCurrency(product?.data?.price || 0)}</Text>
        <Text mb="2">Stock: {product?.data?.stock}</Text>
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
    </AsyncWrapper>
  );
}