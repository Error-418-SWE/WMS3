import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Floor from "./Model3D/Floor";
import { useFloorData } from "../providers/floorProvider";
import { Bin } from "@/model/bin";
import { Bin3D } from "./Model3D/bin3D";
import { Vector3 } from "three";
import { useZonesData } from "../providers/zonesProvider";
import { useBinsData } from "../providers/binsProvider";
import { Zone } from "@/model/zone";
import { Zone3D } from "./Model3D/zone3D";
export default function Warehouse() {
	const { floor } = useFloorData();
	const { zones } = useZonesData();
	const { bins } = useBinsData();

	// Calculate the center of the warehouse
	const center = new Vector3(floor.getWidth() / 2, 0, floor.getLength() / 2);

	console.log("Warehouse", zones);

	return (
		<div className="h-screen">
			<Canvas
				className={"h-screen, bg-BurlyWood"}
			>
				<PerspectiveCamera makeDefault position={[floor.getWidth() / 2, 60, floor.getLength() * 1.5]} />
				<Floor />

				{
					zones.map((zone: Zone, index: number) => {
						const zonePosition = new Vector3(zone.getXcoordinate(), 0, zone.getYcoordinate());
						return <Zone3D zone={zone} position={zonePosition} />
					})
				}

				<ambientLight />
				<OrbitControls target={center} />
			</Canvas>
		</div>
	);
}
