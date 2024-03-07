import React, { createContext, useContext, useEffect, useState } from 'react';
import { ProductRepository } from "@/dataRepository/productRepository";
import { Product } from "@/model/product";

const ProductsDataContext = createContext({
    products: [] as Product[]
});

// Create a provider component
export function ProductsDataProvider({ children } : { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        ProductRepository.getAllProducts().then(setProducts);
    }, []);

    const value = { products };

    return (
        <ProductsDataContext.Provider value={value}>
            {children}
        </ProductsDataContext.Provider>
    );
}

export function useProductsData() {
    const context = useContext(ProductsDataContext);
    return context;
}
