package com.sebastiandunne.order.controller.product;

public class AddProductRequest {
    private String name;
    private String description;
    private double price;
    private int categoryId;

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public double getPrice() {
        return price;
    }

    public int getCategoryId() {
        return categoryId;
    }
}
