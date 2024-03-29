import { Bin, BinState } from "@/model/bin";
import React, { RefObject, createContext, useContext, useRef, useState } from "react";
import { toast } from "sonner";
import { useOrdersData } from "@/components/providers/ordersProvider";
import { Order } from "@/model/order";
import { useZonesData } from "../zonesProvider";
import { CameraControls } from "@react-three/drei";

interface WarehouseContextType {
	selectedBin: Bin | null;
	setSelectedBin: (bin: Bin | null) => void;
	newMovementOrder: (
		startPoint: string,
		endPoint: string,
		product: number
	) => Promise<unknown>;
    cameraRef: RefObject<CameraControls>;
	gridCellSize: number;
	setGridCellSize: (value: number) => void;
    moveCameraToPosition: (xCoordinate: number, yCoordinate: number) => void;
}

const warehouseContext = createContext<WarehouseContextType | null>(null);

export function WarehouseDataProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
	const [gridCellSize, setGridCellSize] = useState(0);
    const { addOrder } = useOrdersData();
    const { zones } = useZonesData();
    const cameraRef = useRef<CameraControls>(null);

	const moveCameraToPosition = (xCoordinate: number, yCoordinate: number) => {
		cameraRef.current?.setLookAt(xCoordinate - 5, 10, yCoordinate - 5, xCoordinate, 0, yCoordinate);
	}

    async function newMovementOrder(
        startPoint: string,
        endPoint: string,
        product: number
    ) {

        //search inside the zones the bin with the id === startPoint
        let startBin : Bin | undefined = undefined;
        let endBin : Bin | undefined = undefined;

        zones.forEach((zone) => {
            if(zone.getBin(startPoint) !== undefined){
                startBin = zone.getBin(startPoint);
            }
            if(zone.getBin(endPoint) !== undefined){
                endBin = zone.getBin(endPoint)!;
            }
        });

        return new Promise((resolve, reject) => {
            fetch("http://localhost:3000/api/movement", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.canBeDone) {
                        addOrder(new Order(data.orderId, startBin!, endBin!, startBin!.getProduct()!));
                        toast.success("Ordine #" + data.orderId + " immesso", {
                            description: "L'ordine di movimentazione è stato creato con successo",
                        });
                        startBin!.setBinState(BinState.ProductOutgoing);
                        endBin!.setBinState(BinState.ProductIncoming);
                        resolve(true);
                    } else {
                        toast.error("Ordine rifiutato", {
                            description: "Non è possibile effettuare il movimento richiesto"
                        });
                        resolve(false);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    reject(error);
                });
        });
    }


	const value = {
		selectedBin,
		setSelectedBin,
		newMovementOrder,
        cameraRef,
		gridCellSize,
		setGridCellSize,
		moveCameraToPosition
	};

	return (
		<warehouseContext.Provider value={value}>
			{children}
		</warehouseContext.Provider>
	);
}

export function useWarehouseData() {
	const context = useContext(warehouseContext);
	if (!context) {
		throw new Error(
			"warehouseDetails must be used within an warehouseProvider"
		);
	}
	return context;
}
