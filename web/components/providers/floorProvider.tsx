import React, { useState, createContext, useContext } from 'react';
import { Floor } from '@/model/floor';

export const FloorDataContext = createContext({
	floor: new Floor(0, 0, ""),
    setFloor: (floor: Floor) => { },
    floorRefresher: 0,
    setFloorRefresher: (refresher: number) => { },
});

export function FloorDataProvider({ children }: { children: React.ReactNode }) {
    const [floor, setFloor] = useState<Floor>(new Floor(0, 0, ""));
    const [floorRefresher, setFloorRefresher] = useState(0);

    const value = { floor, setFloor, floorRefresher, setFloorRefresher };

    return (
        <FloorDataContext.Provider value={value}>
            {children}
        </FloorDataContext.Provider>
    );
}

export function useFloorData() {
    const context = useContext(FloorDataContext);
    return context;
}
