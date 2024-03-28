import {Zone} from "@/model/zone";
import { BinMapper } from "@/model/dataMapper/binMapper";
import { DataMapperInterface } from "./dataMapperInterface";


export class ZoneMapper implements DataMapperInterface{

	private binMapper: BinMapper = new BinMapper();

    public toDomain(json: any): Zone {
        return new Zone(
            json.id,
            json.xcoordinate,
            json.ycoordinate,
            json.height,
            json.length,
            json.width,
            json.bins.map((bin: any) => {
                return this.binMapper.toDomain(bin);
            }),
            json.orientation
        );
    }
}