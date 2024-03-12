"use client";

import OrdersPanel from "@/components/custom/panels/Orders/ordersPanel";
import ProductsPanel from "@/components/custom/panels/Products/productsPanel";
import SettingsPanel from "@/components/custom/panels/Settings/settingsPanel";
import ZonePanel from "@/components/custom/panels/Zone/zonePanel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import Warehouse from "@/components/three.js/Warehouse";
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
import { FloorDataProvider, useFloorData } from "@/components/providers/floorProvider";
import { useSearchParams } from "next/navigation";
import { Floor } from "@/model/floor";
import { readSavedSVG } from "@/ServerActions/SVG/readSavedSVG";

const iconSize = 30;

export default function App() {
	return (
		<ZonesDataProvider>
			<BinsDataProvider>
				<ProductsDataProvider>
					<OrdersDataProvider>
						<FloorDataProvider>
							<ElementDetailsProvider>
								<Suspense>
									<Main />
								</Suspense>
							</ElementDetailsProvider>
						</FloorDataProvider>
					</OrdersDataProvider>
				</ProductsDataProvider>
			</BinsDataProvider>
		</ZonesDataProvider>
	);
}

function Main() {
	const [showPanel, setShowPanel] = useState(false);
	const [panel, setPanel] = useState(<></>);
	const { zones } = useZonesData();
	const { bins } = useBinsData();
	const { products } = useProductsData();
	const { orders } = useOrdersData();
	const { floor, setFloor } = useFloorData();
	const { elementDetails, showElementDetails } = useElementDetails();

	const choice_mode = useSearchParams()?.get("choice");
	const floor_width: number = +useSearchParams()?.get("larghezza")!;
	const floor_depth: number = +useSearchParams()?.get("profondita")!;

	useEffect(() => {
		if (choice_mode && choice_mode === "manuale" && floor_width && floor_depth) {
			setFloor(new Floor(floor_width, floor_width, ""));
		} else if (choice_mode && choice_mode === "custom") {
			const fetchSVGContent = async () => {
				const svg_content = await readSavedSVG();
				setFloor(new Floor(floor_width, floor_width, svg_content));
			};
			console.log("fetchSVGContent");
			fetchSVGContent();
		}
	}, [choice_mode, floor_width, floor_depth]);
	

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
					className={`flex flex-col items-center w-full h-auto ${
						panel.type === ZonePanel && showPanel ? "invert grayscale" : ""
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
					className={`flex flex-col items-center w-full h-auto ${
						panel.type === ProductsPanel && showPanel ? "invert grayscale" : ""
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
					className={`flex flex-col items-center w-full h-auto ${
						panel.type === OrdersPanel && showPanel ? "invert grayscale" : ""
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
					className={`mt-auto flex flex-col items-center w-full h-auto ${
						panel.type === SettingsPanel && showPanel ? "invert grayscale" : ""
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
				<Warehouse />
			</div>
			{showElementDetails ? (
				<Panel className={"right-0"}>{elementDetails}</Panel>
			) : (
				<></>
			)}
		</main>
	);
}
