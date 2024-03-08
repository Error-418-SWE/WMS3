"use client";

import OrdersPanel from "@/components/custom/panels/Orders/ordersPanel";
import ProductsPanel from "@/components/custom/panels/Products/productsPanel";
import SettingsPanel from "@/components/custom/panels/Settings/settingsPanel";
import ZonePanel from "@/components/custom/panels/Zone/zonePanel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Suspense, useState } from "react";
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

const iconSize = 30;

export default function App() {
	return (
		<ZonesDataProvider>
			<BinsDataProvider>
				<ProductsDataProvider>
					<Main />
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
						alt="products"
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
						alt="products"
						width={iconSize}
						height={iconSize}
					/>
					<span>Settings</span>
				</Button>
			</nav>
			<div className={"flex-grow relative"}>
				{showPanel && <Suspense>{panel}</Suspense>}
				<canvas id="canvas" className={"w-full h-full bg-primary"}></canvas>
			</div>
		</main>
	);
}
