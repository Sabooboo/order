package com.sebastiandunne.order.controller;

import com.sebastiandunne.order.entity.Order;
import com.sebastiandunne.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/orders")
    public List<String> getOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(order -> "Order " + order.getId() + ": " + order.getStatus())
                .collect(Collectors.toList());
    }
}
