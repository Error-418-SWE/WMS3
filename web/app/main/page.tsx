"use client";

import OrdersPanel from "@/components/custom/panels/Orders/ordersPanel";
import ProductsPanel from "@/components/custom/panels/Products/productsPanel";
import SettingsPanel from "@/components/custom/panels/Settings/settingsPanel";
import ZonePanel from "@/components/custom/panels/Zone/zonePanel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Suspense, use, useEffect, useState } from "react";
import Warehouse from "@/components/ThreeComponents/Warehouse";
import {
	ZonesDataProvider,
	useZonesData,
} from "@/components/providers/zonesProvider";
import {
	BinsDataProvider,
	useBinsData,
} from "@/components/providers/binsProvider";
import {
	ProductsDataProvider,
	useProductsData,
} from "@/components/providers/productsProvider";
import {
	OrdersDataProvider,
	useOrdersData,
} from "@/components/providers/ordersProvider";
import Panel from "@/components/custom/panels/panel";
import {
	ElementDetailsProvider,
	useElementDetails,
} from "@/components/providers/UI-Providers/ElementDetailsProvider";
import {
	FloorDataProvider,
	useFloorData,
} from "@/components/providers/floorProvider";
import { useSearchParams } from "next/navigation";
import {
	FloorStrategyContext,
	StandardFloorStrategy,
	CustomFloorStrategy,
} from "@/Strategy/FloorStrategy";
import { Progress } from "@/components/ui/progress";
import { WarehouseDataProvider } from "@/components/providers/Threejs/warehouseProvider";
import { Toaster } from "@/components/ui/sonner";

const iconSize = 28;

export default function App() {
	return (
		<Suspense>
		<ZonesDataProvider>
			<BinsDataProvider>
				<ProductsDataProvider>
					<OrdersDataProvider>
						<FloorDataProvider>
							<ElementDetailsProvider>
								<WarehouseDataProvider>
									<Main />
								</WarehouseDataProvider>
							</ElementDetailsProvider>
						</FloorDataProvider>
					</OrdersDataProvider>
				</ProductsDataProvider>
			</BinsDataProvider>
		</ZonesDataProvider>
		</Suspense>
	);
}

function Main() {
	const params = useSearchParams();

	const [showPanel, setShowPanel] = useState(false);
	const [panel, setPanel] = useState(<></>);
	const { zones, zonesLoaded } = useZonesData();
	const { bins, binsLoaded } = useBinsData();
	const { products, productsLoaded } = useProductsData();
	const { orders } = useOrdersData();
	const { floor, setFloor, floorRefresher } = useFloorData();
	const { elementDetails, showElementDetails } = useElementDetails();

	useEffect(() => {
		if (params) {
			const choice_mode = params.get("choice");
			const floorStrategyContext = new FloorStrategyContext(
				choice_mode === "custom"
					? new CustomFloorStrategy()
					: new StandardFloorStrategy()
			);

			const createFloor = async () => {
				const floor = await floorStrategyContext.createFloor(params);
				setFloor(floor);
			};

			createFloor();
		}
	}, [params, floorRefresher]);

	const dataLoaded = zonesLoaded && productsLoaded && binsLoaded && floor;
	const progress = (+zonesLoaded + +binsLoaded + +productsLoaded + (floor ? 1 : 0)) / 4 * 100;

	if (!dataLoaded) {
		return (
			<div className={"flex flex-col gap-y-2 justify-center items-center m-auto w-[40%] h-screen"}>
				<Progress value={progress} className="[40%]" />
				<span>Caricamento in corso...</span>
			</div>)
	}

	return (
		<main className={"h-screen flex"}>
			<Toaster />
			<nav
				className={
					"flex flex-col h-screen bg-primary px-1.5 py-4 items-center gap-4"
				}
			>
				<Image
					src="/icons/logo.svg"
					alt=""
					width={50}
					height={50}
					priority
				/>
				<Button
					onClick={() => {
						setPanel(<ZonePanel />);
						setShowPanel(panel.type !== ZonePanel || !showPanel);
					}}
					className={`flex flex-col gap-1.5 p-1 items-center p-2 w-16 h-16 hover:bg-slate-600 group ${panel.type === ZonePanel && showPanel ? "bg-slate-700" : "" }`}
				>
					<Image
						src="/icons/zone.svg"
						alt=""
						width={iconSize}
						height={iconSize}
					/>
					<span className={"sr-only group-hover:not-sr-only"}>Zone</span>
				</Button>
				<Button
					onClick={() => {
						setPanel(<ProductsPanel />);
						setShowPanel(panel.type !== ProductsPanel || !showPanel);
					}}
					className={`flex flex-col gap-1.5 items-center p-2 w-16 h-16 hover:bg-slate-600 group ${panel.type === ProductsPanel && showPanel ? "bg-slate-700" : "" }`}
				>
					<Image
						src="/icons/products.svg"
						alt=""
						width={iconSize}
						height={iconSize}
					/>
					<span className={"sr-only group-hover:not-sr-only"}>Prodotti</span>
				</Button>
				<Button
					onClick={() => {
						setPanel(<OrdersPanel />);
						setShowPanel(panel.type !== OrdersPanel || !showPanel);
					}}
					className={`flex flex-col gap-1.5 items-center p-2 w-16 h-16 hover:bg-slate-600 group ${panel.type === OrdersPanel && showPanel ? "bg-slate-700" : "" }`}
				>
					<Image
						src="/icons/orders.svg"
						alt=""
						width={iconSize}
						height={iconSize}
					/>
					<span className={"sr-only group-hover:not-sr-only"}>Ordini</span>
				</Button>
				<Button
					onClick={() => {
						setPanel(<SettingsPanel />);
						setShowPanel(panel.type !== SettingsPanel || !showPanel);
					}}
					className={`mt-auto flex flex-col gap-1.5 items-center p-2 w-16 h-16 hover:bg-slate-600 group ${panel.type === SettingsPanel && showPanel ? "bg-slate-700" : "" }`}
				>
					<Image
						src="/icons/settings.svg"
						alt=""
						width={iconSize}
						height={iconSize}
					/>
					<span className={"sr-only"}>Impostazioni</span>
				</Button>
			</nav>
			<div className={"flex-grow relative"}>
				{showPanel && <Suspense>{panel}</Suspense>}
				{dataLoaded && <Warehouse />}
			</div>
			{showElementDetails ? (
				<Panel className={"right-0"}>{elementDetails}</Panel>
			) : (
				<></>
			)}
		</main>
	);
}
