import React, { createContext, useContext, useEffect, useState } from 'react';
import { Bin } from '@/model/bin';
import { BinRepository } from '@/dataRepository/binRepository';

const BinsDataContext = createContext({
    bins: [] as Bin[]
});

// Create a provider component
export function BinsDataProvider({ children } : { children: React.ReactNode }) {
    const [bins, setBins] = useState<Bin[]>([]);

    useEffect(() => {
        BinRepository.getAllBins().then(setBins);
    }, []);

    const value = { bins };

    return (
        <BinsDataContext.Provider value={value}>
            {children}
        </BinsDataContext.Provider>
    );
}

export function useBinsData() {
    const context = useContext(BinsDataContext);
    return context;
}
