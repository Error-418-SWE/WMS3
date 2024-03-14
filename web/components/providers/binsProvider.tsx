import React, { createContext, useContext, useEffect, useState } from 'react';
import { Bin } from '@/model/bin';
import { BinRepository } from '@/dataRepository/binRepository';
import { set } from 'zod';

const BinsDataContext = createContext({
    bins: [] as Bin[],
	refresh: () => {},
	binsLoaded: false,
});

// Create a provider component
export function BinsDataProvider({ children } : { children: React.ReactNode }) {
    const [bins, setBins] = useState<Bin[]>([]);
	const [binRepository] = useState(new BinRepository());
	const [binsLoaded, setBinsLoaded] = useState(false);

    useEffect(() => {
        console.log("BinsDataProvider: useEffect");
        binRepository.getAll().then((bins) => {
			setBins(bins);
			setBinsLoaded(true);
		});
		console.log(bins);
    }, []);

	const refresh = () => {
		setBinsLoaded(false);
		binRepository.getAll().then((bins) => {
			setBins(bins);
			setBinsLoaded(true);
		});
	}

    const value = { bins, refresh, binsLoaded };

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
