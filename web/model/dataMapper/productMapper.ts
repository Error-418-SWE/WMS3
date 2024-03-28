import { Product } from "@/model/product";
import { DataMapperInterface } from "./dataMapperInterface";


export class ProductMapper implements DataMapperInterface{
    public toDomain(json: any): Product {
        return new Product(
            json.id,
            json.name,
            json.weight,
            json.length,
            json.width,
            json.height,
            json.categories
        );
    }
}