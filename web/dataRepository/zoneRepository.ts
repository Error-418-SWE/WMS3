import {Zone} from "@/model/zone";
import { ZoneMapper } from "@/dataMapper/zoneMapper";
import { getAllZones } from "@/ServerActions/Zones/getAllZones";

export class ZoneRepository{
    public static getAllZones(): Promise<Zone[]> {
		return getAllZones().then((json) => json?.map((zone: any) => ZoneMapper.toDomain(zone)) || []);
    }
}

