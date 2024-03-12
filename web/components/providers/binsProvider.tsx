import React, { createContext, useContext, useEffect, useState } from 'react';
import { Bin } from '@/model/bin';
import { BinRepository } from '@/dataRepository/binRepository';

const BinsDataContext = createContext({
    bins: [] as Bin[],
	refresh: () => {},
});

// Create a provider component
export function BinsDataProvider({ children } : { children: React.ReactNode }) {
    const [bins, setBins] = useState<Bin[]>([]);

    useEffect(() => {
        console.log("BinsDataProvider: useEffect");
        BinRepository.getAllBins().then(setBins);
		console.log(bins);
    }, []);

	const refresh = () => {
		BinRepository.getAllBins().then(setBins);
	}

    const value = { bins, refresh };

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
