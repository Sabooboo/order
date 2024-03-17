package com.sebastiandunne.order.repository;

import com.sebastiandunne.order.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
