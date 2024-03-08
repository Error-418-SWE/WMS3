import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Floor from "./Floor";
import "./ThreeStyle.css"

export default function Warehouse() {
	return (
		<div id="canvas-container">
			<Canvas
				className={"styledcanvas"}
			>
				<PerspectiveCamera />
				<Floor />
				<ambientLight />
				<OrbitControls />
			</Canvas>
		</div>
	);
}

