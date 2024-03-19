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

const iconSize = 30;

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
	const { floor, setFloor } = useFloorData();
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
	}, [params]);

	const dataLoaded = zonesLoaded && productsLoaded && binsLoaded && floor;
	const progress = (+zonesLoaded + +binsLoaded + +productsLoaded + (floor ? 1 : 0)) / 4 * 100;

	if (!dataLoaded) {
		return (
			<div className={"flex flex-col gap-y-2 justify-center items-center m-auto w-[60%] h-screen"}>
				<Progress value={progress} className="[60%]" />
				<span>Caricamento in corso ...</span>
			</div>)
	}

	return (
		<main className={"h-screen flex"}>
			<nav
				className={
					"flex flex-col h-screen bg-primary p-1.5 py-2 items-center gap-1"
				}
			>
				<Image
					src="/icons/logo.svg"
					alt="logo"
					width={50}
					height={50}
					className={"flex flex-col items-center"}
					priority
				/>
				<Button
					onClick={() => {
						setPanel(<ZonePanel />);
						setShowPanel(panel.type !== ZonePanel || !showPanel);
					}}
					className={`flex flex-col items-center w-full h-auto ${panel.type === ZonePanel && showPanel ? "invert grayscale" : ""
						}`}
				>
					<Image
						src="/icons/zone.svg"
						alt="Zone"
						width={iconSize}
						height={iconSize}
					/>
					<span>Zone</span>
				</Button>
				<Button
					onClick={() => {
						setPanel(<ProductsPanel />);
						setShowPanel(panel.type !== ProductsPanel || !showPanel);
					}}
					className={`flex flex-col items-center w-full h-auto ${panel.type === ProductsPanel && showPanel ? "invert grayscale" : ""
						}`}
				>
					<Image
						src="/icons/products.svg"
						alt="products"
						width={iconSize}
						height={iconSize}
					/>
					<span>Products</span>
				</Button>
				<Button
					onClick={() => {
						setPanel(<OrdersPanel />);
						setShowPanel(panel.type !== OrdersPanel || !showPanel);
					}}
					className={`flex flex-col items-center w-full h-auto ${panel.type === OrdersPanel && showPanel ? "invert grayscale" : ""
						}`}
				>
					<Image
						src="/icons/orders.svg"
						alt="orders"
						width={iconSize}
						height={iconSize}
					/>
					<span>Orders</span>
				</Button>
				<Button
					onClick={() => {
						setPanel(<SettingsPanel />);
						setShowPanel(panel.type !== SettingsPanel || !showPanel);
					}}
					className={`mt-auto flex flex-col items-center w-full h-auto ${panel.type === SettingsPanel && showPanel ? "invert grayscale" : ""
						}`}
				>
					<Image
						src="/icons/settings.svg"
						alt="settings"
						width={iconSize}
						height={iconSize}
					/>
					<span>Settings</span>
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
