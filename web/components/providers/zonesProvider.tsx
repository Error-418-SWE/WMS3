import React, { createContext, useContext, useEffect, useState } from 'react';
import { Zone } from "@/model/zone";
import { ZoneRepository } from "@/dataRepository/zoneRepository";
import { useSearchParams } from 'next/navigation';
import { set } from 'zod';

const ZonesDataContext = createContext({
	zones: [] as Zone[],
	deleteZone: (id: number) => { },
	addZone: (zone: Zone) => { },
	getZoneById: (id: number) => { },
	modifyZoneById: (id: number, zone: Zone) => { },
	refresh: () => { },
	zonesLoaded: false,
});

export function ZonesDataProvider({ children }: { children: React.ReactNode }) {
	const [zones, setZones] = useState<Zone[]>([]);
	const [zoneRepository] = useState(new ZoneRepository());
	const [zonesLoaded, setZonesLoaded] = useState(false);

	const params = useSearchParams();
	const loadZones = params?.get("loadScaffali") === "true";
	const loadProducts = params?.get("loadProdotti") === "true";

	useEffect(() => {
		console.log("ZonesDataProvider: useEffect");
		if (loadZones) {
			if (loadProducts) {
				zoneRepository.getAll().then((zones) => {
					setZones(zones);
				});
				console.log("zones from database");
			} else {
				zoneRepository.getAllEmpty().then((zones) => {
					setZones(zones);
				});
				console.log("empty zones from database");
			}
		}
		setZonesLoaded(true);
	}, [loadZones, loadProducts, zoneRepository]);

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
		setZonesLoaded(false);

		if (loadZones) {
			zoneRepository.getAll().then((zones) => {
				setZones(zones);
				setZonesLoaded(true);
			});
		} else {
			setZones([]);
			setZonesLoaded(true);
		}
	}

	const value = { zones, deleteZone, addZone, modifyZoneById, getZoneById, refresh, zonesLoaded };

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
