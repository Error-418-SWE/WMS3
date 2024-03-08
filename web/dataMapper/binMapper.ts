import { Bin } from "@/model/bin";
import { ProductMapper } from "@/dataMapper/productMapper";

export class BinMapper {
    public static toDomain(json: any): Bin {
        return new Bin(
            json.bin_id,
            json.level_order,
            json.column_order,
            json.bin_height,
            json.bin_length,
            json.bin_width,
            json.product ? ProductMapper.toDomain(json.product) : null
        );
    }
}