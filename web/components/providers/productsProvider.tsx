import React, { createContext, useContext, useEffect, useState } from 'react';
import { ProductRepository } from "@/dataRepository/productRepository";
import { Product } from "@/model/product";
import { useSearchParams } from 'next/navigation';

const ProductsDataContext = createContext({
	products: [] as Product[],
	refresh: () => { },
	productsLoaded: false,
});

export function ProductsDataProvider({ children }: { children: React.ReactNode }) {
	const [products, setProducts] = useState<Product[]>([]);
	const [productRepository] = useState(new ProductRepository());
	const [productsLoaded, setProductsLoaded] = useState(false);

	const params = useSearchParams();
	const loadProducts = params?.get("loadProdotti") === "true";

	useEffect(() => {
		console.log("ProductsDataProvider: useEffect");

		if (loadProducts) {
			productRepository.getAll().then(
				(products) => {
					setProducts(products);
				}
			);
			console.log("products from database");
		}
		setProductsLoaded(true);
	}, []);

	const refresh = () => {
		setProductsLoaded(false);
		if (loadProducts) {
			productRepository.getAll().then(
				(products) => {
					setProducts(products);
					setProductsLoaded(true);
				}
			);
		} else {
			setProducts([]);
			setProductsLoaded(true);
		}
	}

	const value = { products, refresh, productsLoaded };

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
