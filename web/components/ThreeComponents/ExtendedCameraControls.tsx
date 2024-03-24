import { CameraControls, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RefObject, useEffect } from "react";
import { Box3, Vector3 } from "three";
import { useFloorData } from "../providers/floorProvider";

interface ExtendedCameraControlsProps {
	cameraRef: RefObject<CameraControls>;
}

export function ExtendedCameraControls({
	cameraRef,
}: ExtendedCameraControlsProps) {

	const [,get] = useKeyboardControls();
	const { floor } = useFloorData();

	useFrame(() => {

		if(cameraRef.current?.enabled) {
			const { forward, backward, left, right, quick } = get();
			const moveSpeed = quick ? 0.75 : 0.25;

			cameraRef.current?.forward((forward ? moveSpeed : 0) + (backward ? -moveSpeed : 0));
			cameraRef.current?.truck((right ? moveSpeed : 0) + (left ? -moveSpeed : 0), 0);
		}

	});

	const bound = 10;

	useEffect(() => {
		cameraRef.current?.setBoundary(
			new Box3(
				new Vector3(-bound, 0, -bound),
				new Vector3(floor.getWidth() + bound, 20, floor.getLength() + bound)
			)
		)
	  })

	return (
		<></>
	);
}