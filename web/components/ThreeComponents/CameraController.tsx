import { useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useFloorData } from "../providers/floorProvider";
import { useState } from "react";

interface CameraControllerProps {
	setIsNavigating?: (boolean: boolean) => void;
	setCameraPosition?: (position: Vector3) => void;
}

export function CameraController({
	setIsNavigating,
}: CameraControllerProps) {

	const [,get] = useKeyboardControls();
	const camera = useThree();
	const { floor } = useFloorData();
	const moveSpeed = 0.25;

	const [cameraPosition, setCameraPosition] = useState(camera.camera.position.clone());

	useFrame(() => {
		const { forward, backward, left, right, quick } = get()
		setIsNavigating(forward || backward || left || right || false);

		const speedModifier = quick ? 3 : 1;
		const movement = new Vector3(
			(right ? moveSpeed*speedModifier : 0) + (left ? -moveSpeed*speedModifier : 0),
			0,
			(backward ? moveSpeed*speedModifier : 0) + (forward ? -moveSpeed*speedModifier : 0)
		);

		const newCameraPosition = camera.camera.position.clone().add(movement);
		setCameraPosition(newCameraPosition);

		camera.camera.position.copy(newCameraPosition);
	})
	console.log('Current camera position:', cameraPosition);
	return null;
}