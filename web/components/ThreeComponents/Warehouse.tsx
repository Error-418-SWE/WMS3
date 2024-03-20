import { Canvas, useThree } from "@react-three/fiber";
import { KeyboardControls, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Floor from "./Model3D/Floor";
import { useFloorData } from "../providers/floorProvider";
import { Camera, Vector3 } from "three";
import { useZonesData } from "../providers/zonesProvider";
import { Zone } from "@/model/zone";
import { Zone3D } from "./Model3D/zone3D";
import { useWarehouseData } from "../providers/Threejs/warehouseProvider";
import { useState } from "react";
import { CameraController } from "./CameraController";

export default function Warehouse() {
	const { floor } = useFloorData();
	const { zones } = useZonesData();

	const [isDragging, setIsDragging] = useState(false);
	const [isNavigating, setIsNavigating] = useState(false);
	// const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 0 });

	console.log(setIsNavigating);
	console.log(isNavigating);

	return (
		<KeyboardControls
			map={[
				{ name: "forward", keys: ["ArrowUp", "w", "W"] },
				{ name: "backward", keys: ["ArrowDown", "s", "S"] },
				{ name: "left", keys: ["ArrowLeft", "a", "A"] },
				{ name: "right", keys: ["ArrowRight", "d", "D"] },
				{ name: "quick", keys: ["ShiftLeft", "ShiftRight"]}
			]}>
			<Canvas className={"h-screen, bg-BurlyWood"}>
				<PerspectiveCamera
					makeDefault
					position={[floor.getWidth() / 2, 60, floor.getLength()]}
					rotation={[Math.PI / 2, Math.PI / 2, Math.PI / 2]}
					/>

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

				{/* <OrbitControls
					minAzimuthAngle={-Math.PI / 3}
					maxAzimuthAngle={Math.PI / 3}
					enablePan={true}
					enabled={!isDragging && !isNavigating}
				/> */}

				<OrbitControls
				screenSpacePanning={false}
					minPolarAngle={Math.PI / 5}
					maxPolarAngle={Math.PI / 2.3}
					maxDistance={100}
					minDistance={5}
					dampingFactor={0.05}
					zoomSpeed={2}
					enabled={!isDragging && !isNavigating}
					/>

				<CameraController
					setIsNavigating={setIsNavigating}
					// setCameraPosition={setCameraPosition}
					/>
			</Canvas>
		</KeyboardControls>
	);
}