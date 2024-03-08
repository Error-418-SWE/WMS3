import { Product } from "@/model/product";

export class ProductMapper {
    public static toDomain(json: any): Product {
        return new Product(
            json.id,
            json.name,
            json.weight,
            json.length,
            json.width,
            json.categories
        );
    }
}