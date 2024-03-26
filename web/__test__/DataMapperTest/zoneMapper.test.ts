import { ZoneMapper } from "@/dataMapper/zoneMapper";
import { Zone } from "@/model/zone";

describe("ZoneMapper", () => {
  let zoneMapper: ZoneMapper;
  let zoneJson: any;

  beforeEach(() => {
    zoneMapper = new ZoneMapper();
    zoneJson = {
      id: "1",
      xcoordinate: 1,
      ycoordinate: 1,
      height: 1,
      length: 1,
      width: 1,
      bins: [
        {
            bin_id: "1",
            level_order: 1,
            column_order: 1,
            bin_height: 1,
            bin_length: 1,
            bin_width: 1,
            product: {
                id: 1,
                name: "prodotto",
                weight: 1,
                length: 1,
                width: 1,
                height: 1,
                categories: ["categoria"]
            }
        },
        {
            bin_id: "1",
            level_order: 1,
            column_order: 1,
            bin_height: 1,
            bin_length: 1,
            bin_width: 1,
            product: null
        },
      ],
      orientation: true,
    };
  });

  it("creates a Zone with the correct properties", () => {
    const zone: Zone = zoneMapper.toDomain(zoneJson);

    expect(zone.getId()).toBe(zoneJson.id);
    expect(zone.getXcoordinate()).toBe(zoneJson.xcoordinate);
    expect(zone.getYcoordinate()).toBe(zoneJson.ycoordinate);
    expect(zone.getHeight()).toBe(zoneJson.height);
    expect(zone.getLength()).toBe(zoneJson.length);
    expect(zone.getWidth()).toBe(zoneJson.width);
    expect(zone.getBins().length).toBe(zoneJson.bins.length);
    expect(zone.isNSOriented()).toBe(zoneJson.orientation);
  });
});
