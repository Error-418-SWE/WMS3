import { useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

interface CameraControllerProps {
	setIsNavigating: (boolean: boolean) => void;
	setCameraPosition: (position: Vector3) => void;
}

export function CameraController({
	setIsNavigating,
	setCameraPosition
}: CameraControllerProps) {

	const [,get] = useKeyboardControls();
	const camera = useThree();

	useFrame((state) => {
		const { forward, backward, left, right, quick } = get()
		const moveSpeed = quick ? 0.75 : 0.25;

		setIsNavigating(forward || backward || left || right || false);

		state.camera.position.set(
			camera.camera.position.x + (right ? moveSpeed : 0) + (left ? -moveSpeed : 0),
			camera.camera.position.y,
			camera.camera.position.z + (backward ? moveSpeed : 0) + (forward ? -moveSpeed : 0)
		);

		setCameraPosition(state.camera.position);
		state.camera.updateProjectionMatrix();
	});
	return (
		<></>
	);
}