import { Canvas } from "@react-three/fiber";
import { CameraControls, KeyboardControls, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import Floor from "./Model3D/Floor";
import { useFloorData } from "../providers/floorProvider";
import { Vector3 } from "three";
import { useZonesData } from "../providers/zonesProvider";
import { Zone } from "@/model/zone";
import { Zone3D } from "./Model3D/zone3D";
import { CameraController } from "./CameraController";
import { useRef, useState } from "react";

export default function Warehouse() {
	const { floor } = useFloorData();
	const { zones } = useZonesData();

	const [isDragging, setIsDragging] = useState(false);
	let cameraRef = useRef<CameraControls>(null);

	return (
		<KeyboardControls
			map={[
				{ name: "forward", keys: ["ArrowUp", "w", "W"] },
				{ name: "backward", keys: ["ArrowDown", "s", "S"] },
				{ name: "left",	keys: ["ArrowLeft", "a", "A"] },
				{ name: "right", keys: ["ArrowRight", "d", "D"] },
				{ name: "quick", keys: ["ShiftLeft", "ShiftRight"] },
			]}>
			<Canvas
				className={"h-screen, w-screen, bg-BurlyWood"}
				camera={{
					position: [floor.getWidth(), 60, floor.getLength()],
				}}>

				<Floor />

				{zones.map((zone: Zone, index: number) => {
					const zonePosition = new Vector3(
						zone.getXcoordinate(),
						0,
						zone.getYcoordinate()
						);
						return (
							<Zone3D
								key={zone.getId()}
								zone={zone}
								position={zonePosition}
								//setIsDragging={setIsDragging}
							/>
							);
						})}

				<CameraControls
					minPolarAngle={Math.PI / 10}
					maxPolarAngle={Math.PI / 3}
					minDistance={5}
					maxDistance={100}
					minZoom={5}
					maxZoom={100}
					enabled={!isDragging}
					ref={cameraRef}
					/>

				<CameraController
					cameraRef={cameraRef}
					/>
			</Canvas>
		</KeyboardControls>
	);
}