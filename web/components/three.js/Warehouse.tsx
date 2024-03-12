import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Floor from "./Floor";
import { Suspense } from "react";
import { useFloorData } from "../providers/floorProvider";

export default function Warehouse() {
	const {floor} = useFloorData();
	return (
		<div className="h-screen">
			<Canvas
				className={"h-screen, bg-BurlyWood"}
			>
				<PerspectiveCamera />
				<Suspense>
					<Floor/>
				</Suspense>
				<ambientLight />
				<OrbitControls />
			</Canvas>
		</div>
	);
}

