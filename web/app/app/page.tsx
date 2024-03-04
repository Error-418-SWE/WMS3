"use client";

import OrdersPanel from "@/components/custom/panels/ordersPanel";
import ProductsPanel from "@/components/custom/panels/productsPanel";
import ZonePanel from "@/components/custom/panels/zonePanel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { set } from "zod";

const iconSize = 30;

export default function app() {
	const [showPanel, setShowPanel] = useState(false);
	const [panel, setPanel] = useState(<></>);

	return (
		<main className={"h-screen flex"}>
			<nav className="flex flex-col h-screen bg-primary pt-2 items-center gap-6">
				<Image
					src="/icons/logo.svg"
					alt="logo"
					width={50}
					height={50}
					className="flex flex-col items-center"
					priority
				/>
				<Button
					onClick={() => {
						setPanel(<ZonePanel />);
						setShowPanel(panel.type !== ZonePanel || !showPanel);
					}}
					className="flex flex-col items-center"
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
					className="flex flex-col items-center"
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
					className="flex flex-col items-center"
				>
					<Image
						src="/icons/orders.svg"
						alt="products"
						width={iconSize}
						height={iconSize}
					/>
					<span>Orders</span>
				</Button>
			</nav>
			{showPanel && panel}
		</main>
	);
}
