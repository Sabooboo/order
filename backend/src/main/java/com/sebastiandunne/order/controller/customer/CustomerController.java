package com.sebastiandunne.order.controller.customer;

import com.sebastiandunne.order.entity.Customer;
import com.sebastiandunne.order.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController()
@RequestMapping("/customers")
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/")
    public List<String> getCustomers() {
        List<Customer> customers = customerRepository.findAll();
        return customers.stream()
                .map(customer -> "Customer " + customer.getId() + ": " + customer.getName())
                .collect(Collectors.toList());
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody SignInRequest signInRequest) {
        String email = signInRequest.getEmail();
        Optional<Customer> customer = customerRepository.findByEmail(email);

        if (customer.isPresent()) {
            // Assuming Customer has a getId() method to fetch the ID
            return ResponseEntity.ok().body(customer.get().getId());
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest) {
        String email = signUpRequest.getEmail();
        String name = signUpRequest.getName();
        Optional<Customer> existingCustomer = customerRepository.findByEmail(email);

        if (existingCustomer.isPresent()) {
            return ResponseEntity.status(409).build();
        } else {
            Customer newCustomer = new Customer();
            newCustomer.setEmail(email);
            newCustomer.setName(name);
            newCustomer.setAddress(null);
            customerRepository.save(newCustomer);
            return ResponseEntity.ok().build();
        }
    }
}
