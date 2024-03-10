import {Zone} from "@/model/zone";
import { BinMapper } from "@/dataMapper/binMapper";

export class ZoneMapper {
    public static toDomain(json: any): Zone {
        return new Zone(
            json.id,
            json.xcordinate,
            json.ycordinate,
            json.height,
            json.length,
            json.width,
            json.bins.map((bin: any) => {
                return BinMapper.toDomain(bin);
            }),
            json.orientation
        );
    }
}