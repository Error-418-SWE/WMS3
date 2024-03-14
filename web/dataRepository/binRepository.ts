import { Bin } from "@/model/bin";
import { BinMapper } from "@/dataMapper/binMapper";
import { getAllBins } from "@/ServerActions/Bins/getAllBins";
import { getBinsByZoneId } from "@/ServerActions/Zones/getBinsByZoneId";
import { getBinById } from "@/ServerActions/Bins/getBinById";
import { DataRepositoryInterface } from "./dataRepositoryInterface";

export class BinRepository implements DataRepositoryInterface{

	private binMapper: BinMapper = new BinMapper();

    public getAll(): Promise<Bin[]> {
		return getAllBins().then((json) => json?.map((bin: any) => this.binMapper.toDomain(bin)) || []);
    }

	public getById(id: string): Promise<Bin> {
		return getBinById(id).then((json) => this.binMapper.toDomain(json));
	}

	public getBinsByZone(id: number): Promise<Bin[]> {
		return getBinsByZoneId(id).then((json) => json?.map((bin: any) => this.binMapper.toDomain(bin)) || []);
	}
}