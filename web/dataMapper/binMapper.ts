import { Bin } from "@/model/bin";
import { ProductMapper } from "@/dataMapper/productMapper";
import { DataMapperInterface } from "./dataMapperInterface";

export class BinMapper implements DataMapperInterface{

	private productMapper: ProductMapper = new ProductMapper();

    public toDomain(json: any): Bin {
        return new Bin(
            json.bin_id,
            json.level_order,
            json.column_order,
            json.bin_height,
            json.bin_length,
            json.bin_width,
            json.product ? this.productMapper.toDomain(json.product) : null
        );
    }
}