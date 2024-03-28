import { Product } from "@/model/product";
import { ProductMapper } from "@/model/dataMapper/productMapper";
import getAllProducts from "@/ServerActions/Products/getAllProducts";
import getProductById from "@/ServerActions/Products/getProductById";
import getAllCategories from "@/ServerActions/Products/getAllCategories";
import { DataRepositoryInterface } from "./dataRepositoryInterface";

export class ProductRepository implements DataRepositoryInterface {
	private productMapper: ProductMapper = new ProductMapper();

	public getAll(): Promise<Product[]> {
		return getAllProducts().then(
			(json) =>
				json?.map((product: any) => this.productMapper.toDomain(product)) || []
		);
	}

	public getAllCategories(): Promise<string[]> {
		return getAllCategories();
	}

	public getById(id: string): Promise<Product> {
		return getProductById(id).then((json) => this.productMapper.toDomain(json));
	}
}
