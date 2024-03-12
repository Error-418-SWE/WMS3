import { DoubleSide } from "three";
import { useFloorData } from "../providers/floorProvider";

const inclination = Math.PI / 2;

export default function Floor() {
	const { floor } = useFloorData();
	
	if (floor) {
		return (
			<mesh position={[0.1, -inclination, -4]} rotation={[inclination, 0, 0]}>
				<planeGeometry args={[floor.getWidth(), floor.getLength()]} />
				<meshBasicMaterial color="white" side={DoubleSide} />
			</mesh>
		);
	}
}
