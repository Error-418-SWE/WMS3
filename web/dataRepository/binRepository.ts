import { Bin } from "@/model/bin";
import { BinMapper } from "@/dataMapper/binMapper";

export class BinRepository{
    public static getAllBins(): Promise<Bin[]> {
        return fetch("/api/bins")
            .then(response => response.json())
            .then(json => json.map((bin: any) => BinMapper.toDomain(bin)));
    }

    public static getBinsByZone(id: number): Promise<Bin> {
        return fetch(`/api/binofzone/${id}`)
            .then(response => response.json())
            .then(json => BinMapper.toDomain(json));
    }

    public static getBinById(id: number): Promise<Bin> {
        return fetch(`/api/bins/${id}`)
            .then(response => response.json())
            .then(json => BinMapper.toDomain(json));
    }
}