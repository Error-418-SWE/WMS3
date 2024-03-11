import React, { createContext, useContext, useState } from 'react';

const ElementDetailsContext = createContext({
    elementDetails: <></>,
    setElementDetails: (elementDetails : any) => {},
    showElementDetails: false,
    setShowElementDetails: (show: boolean) => {},
});

export function ElementDetailsProvider({ children } : { children: React.ReactNode }) {
    const [elementDetails, setElementDetails] = useState(<></>);
	const [showElementDetails, setShowElementDetails] = useState(false);

    const value = { elementDetails, setElementDetails, showElementDetails, setShowElementDetails};

    return (
        <ElementDetailsContext.Provider value={value}>
            {children}
        </ElementDetailsContext.Provider>
    );
}

export function useElementDetails() {
    const context = useContext(ElementDetailsContext);
    if (!context) {
        throw new Error('useElementDetails must be used within an ElementDetailsProvider');
    }
    return context;
}
