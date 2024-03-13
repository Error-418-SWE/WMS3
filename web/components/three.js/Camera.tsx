import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

const Camera: React.FC = () => {
	const cameraRef = React.useRef<THREE.PerspectiveCamera>(null);
	const planeRef = React.useRef<THREE.Mesh>(null);
	const radius = 5; // Raggio dell'orbita

	// Movimento attorno al piano
	useFrame(({ clock }) => {
		const elapsedTime = clock.getElapsedTime();
		if (cameraRef.current && planeRef.current) {
			cameraRef.current.position.x = Math.cos(elapsedTime) * radius;
			cameraRef.current.position.z = Math.sin(elapsedTime) * radius;
			cameraRef.current.lookAt(planeRef.current.position);
		}
	});

	return (
		<>
			<perspectiveCamera
				ref={cameraRef}
				position={[0, 0, radius]} // Inizialmente posizionata lungo l'orbita
				fov={75}
				aspect={window.innerWidth / window.innerHeight}
				near={0.1}
				far={1000}
			>
				<OrbitControls />
			</perspectiveCamera>
		</>
	);
};

export default Camera;
