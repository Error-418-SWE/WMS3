import React, { useState, createContext } from "react";

export const ProcessingContext = createContext({
	isProcessing: false,
	setIsProcessing: (isProcessing: boolean) => {},
});

export function FormContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isProcessing, setIsProcessing] = useState(false);

	return (
		<ProcessingContext.Provider value={{ isProcessing, setIsProcessing }}>
			{children}
		</ProcessingContext.Provider>
	);
}

export function useProcessingContext() {
	const context = React.useContext(ProcessingContext);
	if (!context) {
		throw new Error(
			"useProcessingContext must be used within a ProcessingContextProvider",
		);
	}
	return context;
}
