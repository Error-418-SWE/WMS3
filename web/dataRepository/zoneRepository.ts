import {Zone} from "@/model/zone";
import { ZoneMapper } from "@/dataMapper/zoneMapper";
import { BinMapper } from "@/dataMapper/binMapper";

export class ZoneRepository{
    /*public static getAllZones(): Promise<Zone[]> {
        return fetch("/api/zones")
            .then(response => response.json())
            .then(json => json.map((zone: any) => ZoneMapper.toDomain(zone)))
            .then(zones => {
                return Promise.all(zones.map((zone: { id: any; bins: any; }) => {
                    return fetch(`/api/binofzone/${zone.id}`)
                        .then(response => response.json())
                        .then(bins => {
                            return Promise.all(bins.map((bin: any) => {
                                return fetch(`/api/products/${bin.product_id}`)
                                    .then(response => response.json())
                                    .then(product => {
                                        return BinMapper.toDomain({...bin, product});
                                    });
                            }))
                            .then(mappedBins => {
                                zone.bins = mappedBins;
                                return zone;
                            });
                        });
                }));
            });
    }*/

    public static getAllZones(): Promise<Zone[]> {
        return fetch("/api/zones")
            .then(response => response.json())
            .then(json => json.map((zone: any) => ZoneMapper.toDomain(zone)));
    }
}

