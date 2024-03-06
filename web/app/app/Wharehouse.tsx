import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { DoubleSide } from "three";
import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";

export default function Wharehouse() {
	return (
		<div id="canvas">
			<Canvas
				style={{
					height: "100vh",
					width: "100%",
					background: "#C09373",
				}}
			>
				<PerspectiveCamera />
				<Floor />
				<ambientLight />
				<OrbitControls />
			</Canvas>
		</div>
	);
}

function Floor() {
	return (
		<mesh
			position={[0.1, -0.5 * Math.PI, 0]}
			rotation={[Math.PI / 2, 0, 0]}
			scale={[2, 2, 2]}
		>
			<planeGeometry args={[5, 5]} />
			<meshBasicMaterial color="white" side={DoubleSide} />
		</mesh>
	);
}
