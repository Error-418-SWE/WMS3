import { Product } from "@/model/product";
import { ProductMapper } from "@/dataMapper/productMapper";
import getAllProducts from "@/ServerActions/Products/getAllProducts";
import getProductById from "@/ServerActions/Products/getProductById";

export class ProductRepository{
    public static getAllProducts(): Promise<Product[]> {
		return getAllProducts().then((json) => json?.map((product: any) => ProductMapper.toDomain(product)) || []);
    }

    public static getProductById(id: number): Promise<Product> {
		return getProductById(id).then((json) => ProductMapper.toDomain(json));
    }
}