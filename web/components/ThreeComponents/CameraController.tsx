import { CameraControls, useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Ref, RefObject } from "react";
import { Camera, Vector3 } from "three";

interface CameraControllerProps {
	setIsNavigating: (boolean: boolean) => void;
	setCameraPosition: (position: Vector3) => void;
	cameraRef: RefObject<CameraControls>;
}

export function CameraController({
	setIsNavigating,
	setCameraPosition,
	cameraRef,
}: CameraControllerProps) {

	const [,get] = useKeyboardControls();
	const {camera } = useThree();
	let prevTarget = new Vector3(); // Store the previous target

	useFrame((state) => {
		const { forward, backward, left, right, quick } = get();
		const moveSpeed = quick ? 0.75 : 0.25;
		const target = new Vector3(); // The point to look at
	
		// Update position
		camera.position.set(
			camera.position.x + (right ? moveSpeed : 0) + (left ? -moveSpeed : 0),
			camera.position.y,
			camera.position.z + (backward ? moveSpeed : 0) + (forward ? -moveSpeed : 0)
		);
	
		// Update target based on its previous position and the direction of movement
		target.set(
			prevTarget.x + (right ? moveSpeed : 0) + (left ? -moveSpeed : 0),
			prevTarget.y,
			prevTarget.z + (backward ? moveSpeed : 0) + (forward ? -moveSpeed : 0)
		);
	
		camera.lookAt(target);
	
		// Store the current target for the next frame
		prevTarget.copy(target);
	
		cameraRef.current?.setPosition(camera.position.x, camera.position.y, camera.position.z);
	});
	
	
	
	return (
		<></>
	);
}