import { Bin } from '@/model/bin';
import { Zone } from '@/model/zone';
import React, { createContext, useContext, useState } from 'react';

interface WarehouseContextType {
    selectedBin: Bin | null;
    setSelectedBin: (bin: Bin | null) => void,
	currentZone: Zone | undefined;
	setCurrentZone: (zone: Zone | undefined) => void;
}

const warehouseContext = createContext<WarehouseContextType | null>(null);

export function WarehouseDataProvider({ children } : { children: React.ReactNode }) {

    const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
	const [currentZone, setCurrentZone] = useState<Zone>();

    const value = { selectedBin, setSelectedBin, currentZone, setCurrentZone};

    return (
        <warehouseContext.Provider value={value}>
            {children}
        </warehouseContext.Provider>
    );
}

export function useWarehouseData() {
    const context = useContext(warehouseContext);
    if (!context) {
        throw new Error('useElementDetails must be used within an warehouseProvider');
    }
    return context;
}
