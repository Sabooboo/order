export type Product = {
    id: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    category: Category,
}

export type Category = {
    id: number,
    name: string,
}

export type Customer = {
    id: number,
    name: string,
    email: string,
    address: string,
}

export type Order = {
    id: number,
    customer: Customer,
    product: Product,
    quantity: number,
    price: number,
    status: string,
}