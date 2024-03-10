import {Zone} from "@/model/zone";
import { ZoneMapper } from "@/dataMapper/zoneMapper";

export class ZoneRepository{
    public static getAllZones(): Promise<Zone[]> {
        return fetch("/api/zones")
            .then(response => response.json())
            .then(json => json.map((zone: any) => ZoneMapper.toDomain(zone)));
    }
}

