import React, { createContext, useContext, useEffect, useState } from 'react';
import { Zone } from "@/model/zone";
import { ZoneRepository } from "@/dataRepository/zoneRepository";

const ZonesDataContext = createContext({
    zones: [] as Zone[],
    deleteZone: (id: number) => {},
    addZone: (zone: Zone) => {},
    getZoneById: (id: number) => {}
});

export function ZonesDataProvider({ children } : { children: React.ReactNode }) {
    const [zones, setZones] = useState<Zone[]>([]);

    useEffect(() => {
        console.log("ZonesDataProvider: useEffect");
        ZoneRepository.getAllZones().then(setZones);
    }, []);

    const deleteZone = (id: number) => {
        setZones(zones.filter(zone => zone.getId() !== id));
    };

    const addZone = (zone: Zone) => {
        setZones([...zones, zone]);
        console.log(zones);
    };

    const getZoneById = (id: number) => {
        return zones.find(zone => zone.getId() === id);
    };

    const value = { zones, deleteZone, addZone, getZoneById };

    return (
        <ZonesDataContext.Provider value={value}>
            {children}
        </ZonesDataContext.Provider>
    );
}

export function useZonesData() {
    const context = useContext(ZonesDataContext);
    return context;
}
