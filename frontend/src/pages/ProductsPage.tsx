import { Flex, Heading, Text, Box } from "@chakra-ui/react";
import { AsyncWrapper } from "../components/AsyncWrapper";
import useAxios from 'axios-hooks';
import { Product } from "../models/api";
import formatCurrency from "../helpers/formatCurrency";

export default function ProductsPage() {
  const [products] = useAxios<Product[]>('/api/products');

  return (
    <AsyncWrapper requests={[products]}>
      <Flex direction="column" p={5}>
        <Heading as="h3" size="lg" mb={4}>Products</Heading>
        {products?.data?.map((product: Product) => (
          <Box key={product.id} p={3} shadow="md" borderWidth="1px" mb={2}>
            <Heading as="h5" size="md">{product.name}</Heading>
            <Text isTruncated maxWidth="300px">{product.description.slice(0, 20) + (product.description.length > 20 ? '...' : '')}</Text>
            <Text>Price: {formatCurrency(product.price)}</Text>
            <Text>Stock: {product.stock}</Text>
            <Text>Category: {product.category.name}</Text>
          </Box>
        ))}
      </Flex>
    </AsyncWrapper>
  );
}