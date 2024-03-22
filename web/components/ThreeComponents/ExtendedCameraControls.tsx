import { CameraControls, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RefObject } from "react";

interface ExtendedCameraControlsProps {
	cameraRef: RefObject<CameraControls>;
}

export function ExtendedCameraControls({
	cameraRef,
}: ExtendedCameraControlsProps) {

	const [,get] = useKeyboardControls();

	useFrame(() => {

		const { forward, backward, left, right, quick } = get();

		const moveSpeed = quick ? 0.75 : 0.25;

		cameraRef.current?.forward((forward ? moveSpeed : 0) + (backward ? -moveSpeed : 0));
		cameraRef.current?.truck((right ? moveSpeed : 0) + (left ? -moveSpeed : 0), 0);

	});

	return (
		<></>
	);
}