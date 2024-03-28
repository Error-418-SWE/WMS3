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
	ProductsDataProvider,
	useProductsData,
} from "@/components/providers/productsProvider";
import { OrdersDataProvider } from "@/components/providers/ordersProvider";
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
} from "@/model/FloorStrategy/FloorStrategy";
import { Progress } from "@/components/ui/progress";
import { WarehouseDataProvider } from "@/components/providers/Threejs/warehouseProvider";
import { Toaster } from "@/components/ui/sonner";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { LayoutDashboard, Package, Clipboard, Settings } from "lucide-react";

export default function App() {
	return (
		<Suspense>
			<ZonesDataProvider>
				<ProductsDataProvider>
					<FloorDataProvider>
						<ElementDetailsProvider>
							<Main />
						</ElementDetailsProvider>
					</FloorDataProvider>
				</ProductsDataProvider>
			</ZonesDataProvider>
		</Suspense>
	);
}

function Main() {
	const params = useSearchParams();
	const iconSize = 28;

	const [showPanel, setShowPanel] = useState(false);
	const [panel, setPanel] = useState(<></>);
	const { zonesLoaded } = useZonesData();
	const { productsLoaded } = useProductsData();
	const { floor, setFloor, floorRefresher } = useFloorData();
	const { elementDetails, showElementDetails } = useElementDetails();

	useEffect(() => {
		if (params) {
			const choice_mode = params.get("choice");
			const floorStrategyContext = new FloorStrategyContext(
				choice_mode === "custom"
					? new CustomFloorStrategy()
					: new StandardFloorStrategy(),
			);

			const createFloor = async () => {
				const floor = await floorStrategyContext.createFloor(params);
				setFloor(floor);
			};

			createFloor();
		}
	}, [params, floorRefresher, setFloor]);

	const dataLoaded = zonesLoaded && productsLoaded && floor;
	const progress =
		((+zonesLoaded + +productsLoaded + (floor ? 1 : 0)) / 3) * 100;

	if (!dataLoaded) {
		return (
			<div
				className={
					"flex flex-col gap-y-2 justify-center items-center m-auto w-[40%] h-screen"
				}
			>
				<Progress value={progress} className="[40%]" />
				<span>Caricamento in corso...</span>
			</div>
		);
	}

	return (
		<main className={"h-screen flex"}>
			<Toaster />
			<OrdersDataProvider>
				<TooltipProvider>
					<nav
						className={
							"flex flex-col flex-wrap justify-between h-screen bg-primary px-1.5 py-4 h-full"
						}
					>
						<div className={"flex flex-col gap-4 items-center"}>
							<Image
								src="/icons/logo.svg"
								alt=""
								width={50}
								height={50}
								priority
							/>
							<Tooltip delayDuration={300}>
								<TooltipTrigger>
									<Button
										onClick={() => {
											setPanel(<ZonePanel />);
											setShowPanel(panel.type !== ZonePanel || !showPanel);
										}}
										className={`p-2 w-16 h-16 hover:bg-slate-600 ${panel.type === ZonePanel && showPanel ? "bg-slate-700" : ""}`}
									>
										<LayoutDashboard size={iconSize} />
									</Button>
								</TooltipTrigger>
								<TooltipContent side="right" sideOffset={8}>
									<p>Zone</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip delayDuration={300}>
								<TooltipTrigger>
									<Button
										onClick={() => {
											setPanel(<ProductsPanel />);
											setShowPanel(panel.type !== ProductsPanel || !showPanel);
										}}
										className={`p-2 w-16 h-16 hover:bg-slate-600 ${panel.type === ProductsPanel && showPanel ? "bg-slate-700" : ""}`}
									>
										<Package size={iconSize} />
									</Button>
								</TooltipTrigger>
								<TooltipContent side="right" sideOffset={8}>
									<p>Prodotti</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip delayDuration={300}>
								<TooltipTrigger>
									<Button
										onClick={() => {
											setPanel(<OrdersPanel />);
											setShowPanel(panel.type !== OrdersPanel || !showPanel);
										}}
										className={`p-2 w-16 h-16 hover:bg-slate-600 ${panel.type === OrdersPanel && showPanel ? "bg-slate-700" : ""}`}
									>
										<Clipboard size={iconSize} />
									</Button>
								</TooltipTrigger>
								<TooltipContent side="right" sideOffset={8}>
									<p>Ordini di movimentazione</p>
								</TooltipContent>
							</Tooltip>
						</div>

						<div className={"flex flex-col gap-4"}>
							<Tooltip delayDuration={300}>
								<TooltipTrigger>
									<Button
										onClick={() => {
											setPanel(<SettingsPanel />);
											setShowPanel(panel.type !== SettingsPanel || !showPanel);
										}}
										className={`p-2 w-16 h-16 hover:bg-slate-600 ${panel.type === SettingsPanel && showPanel ? "bg-slate-700" : ""}`}
									>
										<Settings size={iconSize} />
									</Button>
								</TooltipTrigger>
								<TooltipContent side="right" sideOffset={8}>
									<p>Impostazioni</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</nav>
				</TooltipProvider>

				<WarehouseDataProvider>
					<div className={"flex-grow relative"}>
						{showPanel && <Suspense>{panel}</Suspense>}
						{dataLoaded && <Warehouse />}
					</div>
					{showElementDetails ? (
						<Panel className={"right-0"}>{elementDetails}</Panel>
					) : (
						<></>
					)}
				</WarehouseDataProvider>
			</OrdersDataProvider>
		</main>
	);
}
