import { Flex, Heading } from "@chakra-ui/react";
import { AsyncWrapper } from "../components/AsyncWrapper";
import useAxios from 'axios-hooks'
import { Product } from "../models/api";

export default function ProductsPage() {
  const [products] = useAxios<Product[]>('/api/products');

  return (
    <AsyncWrapper requests={[products]}>
      <Flex>
        <Heading>Products</Heading>
        {products.data?.map((product: Product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.stock}</p>
            <p>{product.category.name}</p>
          </div>
        ))}
      </Flex>
    </AsyncWrapper>
  );
}