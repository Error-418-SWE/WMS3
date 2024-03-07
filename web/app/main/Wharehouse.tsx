import { Canvas } from "@react-three/fiber";
import { DoubleSide } from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useSearchParams } from "next/navigation";

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
	const urlParams = useSearchParams()?.get("choice");
	if (urlParams != null) {
		if (urlParams == "manuale") {
			var larghezza_piano: number = +useSearchParams()?.get("larghezza")!;
			var profondita_piano: number = +useSearchParams()?.get("profondita")!;
			return (
				<mesh
					position={[0.1, -0.5 * Math.PI, 0]}
					rotation={[Math.PI / 2, 0, 0]}
					scale={[2, 2, 2]}
				>
					<planeGeometry args={[larghezza_piano, profondita_piano]} />
					<meshBasicMaterial color="white" side={DoubleSide} />
				</mesh>
			);
		}
	}
}