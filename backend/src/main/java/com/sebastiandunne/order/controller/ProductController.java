package com.sebastiandunne.order.controller;

import com.sebastiandunne.order.repository.ProductRepository;
import com.sebastiandunne.order.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/products")
    public List<String> getProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(product -> "Product " + product.getId() + ": " + product.getName())
                .collect(Collectors.toList());
    }
}
