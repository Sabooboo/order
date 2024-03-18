package com.sebastiandunne.order.controller.order;

import com.sebastiandunne.order.entity.Customer;
import com.sebastiandunne.order.entity.Order;
import com.sebastiandunne.order.entity.Product;
import com.sebastiandunne.order.repository.CustomerRepository;
import com.sebastiandunne.order.repository.OrderRepository;
import com.sebastiandunne.order.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/orders")
    public List<String> getOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(order -> "Order " + order.getId() + ": " + order.getStatus())
                .collect(Collectors.toList());
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest orderRequest) {
        Order newOrder = new Order();
        newOrder.setStatus("PENDING");

        Customer customer = customerRepository.findById(orderRequest.getCustomerId()).get();
        newOrder.setCustomer(customer);

        Product product = productRepository.findById(orderRequest.getProductId()).get();
        newOrder.setProduct(product);

        newOrder.setQuantity(orderRequest.getQuantity());
        newOrder.setPrice(product.getPrice() * orderRequest.getQuantity());

        orderRepository.save(newOrder);
        return ResponseEntity.ok().body(newOrder);
    }
}
