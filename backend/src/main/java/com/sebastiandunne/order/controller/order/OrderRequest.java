package com.sebastiandunne.order.controller.order;

public class OrderRequest {
    private int productId;
    private int quantity;
    private int customerId;

    public int getProductId() {
        return productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }
}
