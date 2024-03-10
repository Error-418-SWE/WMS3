import { Product } from "@/model/product";
import { ProductMapper } from "@/dataMapper/productMapper";

export class ProductRepository{
    public static getAllProducts(): Promise<Product[]> {
        return fetch("/api/products")
            .then(response => response.json())
            .then(json => json.map((product: any) => ProductMapper.toDomain(product)));
    }

    public static getProductById(id: number): Promise<Product> {
        return fetch(`/api/products/${id}`)
            .then(response => response.json())
            .then(json => ProductMapper.toDomain(json));
    }
}