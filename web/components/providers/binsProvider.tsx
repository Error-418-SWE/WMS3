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
	const [binRepository] = useState(new BinRepository());

    useEffect(() => {
        console.log("BinsDataProvider: useEffect");
        binRepository.getAll().then(setBins);
		console.log(bins);
    }, []);

	const refresh = () => {
		binRepository.getAll().then(setBins);
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
