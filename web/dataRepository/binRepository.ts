import { Bin } from "@/model/bin";
import { BinMapper } from "@/dataMapper/binMapper";
import { getAllBins } from "@/ServerActions/Bins/getAllBins";
import { getBinsByZoneId } from "@/ServerActions/Zones/getBinsByZoneId";
import { getBinById } from "@/ServerActions/Bins/getBinById";

export class BinRepository{
    public static getAllBins(): Promise<Bin[]> {
		return getAllBins().then((json) => json?.map((bin: any) => BinMapper.toDomain(bin)) || []);
    }

	public static getBinsByZone(id: number): Promise<Bin[]> {
		return getBinsByZoneId(id).then((json) => json?.map((bin: any) => BinMapper.toDomain(bin)) || []);
	}

	public static getBinById(id: string): Promise<Bin> {
		return getBinById(id).then((json) => json?.find((bin: any) => bin.id === id) || null);
	}

}