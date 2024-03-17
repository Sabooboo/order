package com.sebastiandunne.order.controller.product;

import com.sebastiandunne.order.repository.ProductRepository;
import com.sebastiandunne.order.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("")
    public List<Product> getProducts() {
        return productRepository.findAll();
    }
}
