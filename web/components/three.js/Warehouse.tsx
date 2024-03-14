import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Floor from "./Model3D/Floor";
import { useFloorData } from "../providers/floorProvider";
import { Bin } from "@/model/bin";
import { Bin3D } from "./Model3D/bin3D";
import Camera from "./Camera";

export default function Warehouse() {
	const { floor } = useFloorData();
	return (
		<div className="h-screen">
			<Canvas className={"h-screen, bg-BurlyWood"}>
				<Camera />
				<Floor />

				<Bin3D bin={new Bin("1", 1, 1, 1, 1, 1, null)} />

				<ambientLight />
			</Canvas>
		</div>
	);
}
