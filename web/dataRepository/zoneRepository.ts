import { Zone } from "@/model/zone";
import { ZoneMapper } from "@/dataMapper/zoneMapper";
import { getAllZones } from "@/ServerActions/Zones/getAllZones";
import { getZoneById } from "@/ServerActions/Zones/getZoneById";
import { DataRepositoryInterface } from "./dataRepositoryInterface";

export class ZoneRepository implements DataRepositoryInterface {
	private zoneMapper: ZoneMapper = new ZoneMapper();

	public getAll(): Promise<Zone[]> {
		return getAllZones().then(
			(json) => json?.map((zone: any) => this.zoneMapper.toDomain(zone)) || []
		);
	}

	public getById(id: string): Promise<Zone> {
		return getZoneById(id).then((json) => this.zoneMapper.toDomain(json));
	}
}
