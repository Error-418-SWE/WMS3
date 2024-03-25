import { Canvas } from "@react-three/fiber";
import { CameraControls, Grid, KeyboardControls } from "@react-three/drei";
import Floor from "./Model3D/Floor";
import { useFloorData } from "../providers/floorProvider";
import { Vector3 } from "three";
import { useZonesData } from "../providers/zonesProvider";
import { Zone } from "@/model/zone";
import { Zone3D } from "./Model3D/zone3D";
import { useWarehouseData } from "../providers/Threejs/warehouseProvider";
import { ExtendedCameraControls } from "./ExtendedCameraControls";

export default function Warehouse() {
	const { floor } = useFloorData();
	const { zones } = useZonesData();

	const { orbitRef } = useWarehouseData();

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
					position: [floor.getWidth(), 50, floor.getLength()],
				}}>

				<Floor />

				<Grid
					cellSize={gridCellSize}
					cellThickness={0.5}
					cellColor={"#334155"}
					sectionSize={1}
					sectionThickness={1}
					sectionColor={"#475569"}
					visible={(gridCellSize === 0) ? false : true}
					fadeDistance={50}
					args={[floor.getWidth(), floor.getLength()]}
					position={[floor.getWidth() / 2, 0, floor.getLength() / 2]}
				/>

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
					dampingFactor={0.1}
					boundaryFriction={0.1}
					ref={orbitRef}
				/>

				<ExtendedCameraControls
					cameraRef={orbitRef}
					/>
			</Canvas>
		</KeyboardControls>
	);
}
