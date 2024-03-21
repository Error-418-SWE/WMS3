import { Canvas } from "@react-three/fiber";
import { CameraControls, KeyboardControls, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import Floor from "./Model3D/Floor";
import { useFloorData } from "../providers/floorProvider";
import { Vector3 } from "three";
import { useZonesData } from "../providers/zonesProvider";
import { Zone } from "@/model/zone";
import { Zone3D } from "./Model3D/zone3D";
import { CameraController } from "./CameraController";
import { useState } from "react";

export default function Warehouse() {
	const { floor } = useFloorData();
	const { zones } = useZonesData();

	const [isDragging, setIsDragging] = useState(false);
	const [isNavigating, setIsNavigating] = useState(false);
	const [cameraPosition, setCameraPosition] = useState({ x: floor.getWidth(), y: 60, z: floor.getLength() });

	return (
		<KeyboardControls
			map={[
				{ name: "forward", keys: ["ArrowUp", "w", "W"] },
				{ name: "backward", keys: ["ArrowDown", "s", "S"] },
				{ name: "left", keys: ["ArrowLeft", "a", "A"] },
				{ name: "right", keys: ["ArrowRight", "d", "D"] },
				{ name: "quick", keys: ["ShiftLeft", "ShiftRight"]}
			]}>
			<Canvas
				className={"h-screen, w-screen, bg-BurlyWood"}
				camera={{
					position: [cameraPosition.x, cameraPosition.y, cameraPosition.z],
					rotation: [Math.PI / 2, Math.PI / 2, Math.PI / 2]
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
								setIsDragging={setIsDragging}
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
					dollySpeed={1}
					dollyDragInverted
					dollyToCursor
					enabled={!isDragging && !isNavigating}
					/>

				<CameraController
					setIsNavigating={setIsNavigating}
					setCameraPosition={setCameraPosition}
					/>
			</Canvas>
		</KeyboardControls>
	);
}