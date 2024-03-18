import { Flex, Heading, Text, Box, Select, Link as Link } from "@chakra-ui/react";
import { AsyncWrapper } from "../components/AsyncWrapper";
import useAxios from 'axios-hooks';
import { Product } from "../models/api";
import formatCurrency from "../helpers/formatCurrency";
import { ChangeEvent, useCallback, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function ProductsPage() {
  const [products] = useAxios<Product[]>('/api/products');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();

  const categories = products?.data
    ? Array.from(new Set(products.data.map(p => ({ name: p.category.name, id: p.category.id }))))
    : [];

  const onCategoryChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(parseInt(e.target.value, 10));
  }, []);

  return (
    <AsyncWrapper requests={[products]}>
      <Flex direction="column" p={5}>
        <Heading as="h3" size="lg" mb={4}>Products</Heading>
        <Select placeholder="Select category" onChange={onCategoryChange} >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        {products?.data?.filter(p => selectedCategoryId ? p.category.id === selectedCategoryId : true).map((product: Product) => (
          <Box key={product.id} p={3} shadow="md" borderWidth="1px" mb={2}>
            <Heading as="h5" size="md">{product.name}</Heading>
            <Text isTruncated maxWidth="300px">{product.description.slice(0, 20) + (product.description.length > 20 ? '...' : '')}</Text>
            <Text>Price: {formatCurrency(product.price)}</Text>
            <Text>Stock: {product.stock}</Text>
            <Text>Category: {product.category.name}</Text>
            <Link color="blue.500" fontWeight='700' textDecor='underline' as={RouterLink} to={`/products/${product.id}`}>Details</Link>
          </Box>
        ))}
      </Flex>
    </AsyncWrapper>
  );
}