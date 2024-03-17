package com.sebastiandunne.order.controller.category;

import com.sebastiandunne.order.entity.Category;
import com.sebastiandunne.order.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/categories")
    public List<Category> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories;
    }
}
