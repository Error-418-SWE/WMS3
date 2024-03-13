import { Product } from "@/model/product";
import { ProductMapper } from "@/dataMapper/productMapper";
import getAllProducts from "@/ServerActions/Products/getAllProducts";
import getProductById from "@/ServerActions/Products/getProductById";
import { DataRepositoryInterface } from "./dataRepositoryInterface";

export class ProductRepository implements DataRepositoryInterface {
	private productMapper: ProductMapper = new ProductMapper();

	public getAll(): Promise<Product[]> {
		return getAllProducts().then(
			(json) =>
				json?.map((product: any) => this.productMapper.toDomain(product)) || []
		);
	}

	public getById(id: string): Promise<Product> {
		return getProductById(id).then((json) => this.productMapper.toDomain(json));
	}
}
