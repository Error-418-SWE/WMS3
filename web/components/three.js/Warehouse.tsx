import { Canvas } from "@react-three/fiber";
import Camera from "./Camera";
import Floor from "./Floor";
import { Suspense } from "react";
import { useFloorData } from "../providers/floorProvider";

export default function Warehouse() {
	const { floor } = useFloorData();
	return (
		<div className="h-screen">
			<Canvas className={"h-screen, bg-BurlyWood"}>
				<Camera />

				<Suspense>
					<Floor />
				</Suspense>
				<ambientLight />
			</Canvas>
		</div>
	);
}
