import React, { createContext, useContext, useEffect, useState } from 'react';
import { Bin } from '@/model/bin';
import { BinRepository } from '@/dataRepository/binRepository';
import { set } from 'zod';
import { useSearchParams } from 'next/navigation';

const BinsDataContext = createContext({
	bins: [] as Bin[],
	refresh: () => { },
	binsLoaded: false,
});

// Create a provider component
export function BinsDataProvider({ children }: { children: React.ReactNode }) {
	const [bins, setBins] = useState<Bin[]>([]);
	const [binRepository] = useState(new BinRepository());
	const [binsLoaded, setBinsLoaded] = useState(false);

	const params = useSearchParams();
	const loadBins = params?.get("loadScaffali") === "true";

	useEffect(() => {
		console.log("BinsDataProvider: useEffect");

		if (loadBins) {
			binRepository.getAll().then((bins) => {
				setBins(bins);
			});
			console.log("bin da database");
		}

		setBinsLoaded(true);
		console.log(bins);
	}, []);

	const refresh = () => {
		setBinsLoaded(false);
		if (loadBins) {
			binRepository.getAll().then((bins) => {
				setBins(bins);
				setBinsLoaded(true);
			});
		} else {
			setBins([]);
			setBinsLoaded(true);
		}
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
