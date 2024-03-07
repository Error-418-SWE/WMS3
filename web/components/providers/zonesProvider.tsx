import React, { createContext, useContext, useEffect, useState } from 'react';
import { Zone } from "@/model/zone";
import { ZoneRepository } from "@/dataRepository/zoneRepository";

const ZonesDataContext = createContext({
    zones: [] as Zone[],
});

export function ZonesDataProvider({ children } : { children: React.ReactNode }) {
    const [zones, setZones] = useState<Zone[]>([]);

    useEffect(() => {
        ZoneRepository.getAllZones().then(setZones);
    }, []);

    const value = { zones };

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
