import React, { createContext, useContext, useEffect, useState } from 'react';
import { Zone } from "@/model/zone";
import { ZoneRepository } from "@/dataRepository/zoneRepository";

const ZonesDataContext = createContext({
    zones: [] as Zone[],
    deleteZone: (id: number) => {},
    addZone: (zone: Zone) => {},
    getZoneById: (id: number) => {},
	modifyZoneById: (id: number, zone: Zone) => {},
	refresh: () => {},
});

export function ZonesDataProvider({ children } : { children: React.ReactNode }) {
    const [zones, setZones] = useState<Zone[]>([]);
	const [zoneRepository] = useState(new ZoneRepository());

    useEffect(() => {
        console.log("ZonesDataProvider: useEffect");
        zoneRepository.getAll().then(setZones);
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

	const modifyZoneById = (id: number, zone: Zone) => {
		const index = zones.findIndex(zone => zone.getId() === id);
		if (index === -1) {
			console.log(zones);
			throw new Error("Zone not found");
		}
		let newZones = [...zones];
		newZones[index] = zone;
		setZones(newZones);
	}

	const refresh = () => {
		zoneRepository.getAll().then(setZones);
	}

    const value = { zones, deleteZone, addZone, modifyZoneById, getZoneById, refresh};

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
