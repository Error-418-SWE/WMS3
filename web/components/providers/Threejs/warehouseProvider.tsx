import { Bin } from '@/model/bin';
import React, { createContext, useContext, useState } from 'react';

interface WarehouseContextType {
    selectedBin: Bin | null;
    setSelectedBin: (bin: Bin | null) => void,
	isDragging: boolean;
	setIsDragging: (isDragging: boolean) => void;
}

const warehouseContext = createContext<WarehouseContextType | null>(null);

export function WarehouseDataProvider({ children } : { children: React.ReactNode }) {

    const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
	const [isDragging, setIsDragging] = useState<boolean>(false);

    const value = { selectedBin, setSelectedBin, isDragging, setIsDragging};

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
