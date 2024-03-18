import { DoubleSide, Vector3 } from "three";
import { useFloorData } from "../../providers/floorProvider";

const inclination = Math.PI / 2;

export default function Floor() {
	const { floor } = useFloorData();

	if (floor) {
		return (
			<mesh position={new Vector3(floor.getWidth() / 2, 0, floor.getLength() / 2)} rotation={[inclination, 0, 0]}>
				<planeGeometry args={[floor.getWidth(), floor.getLength()]} />
				<meshBasicMaterial color="white" side={DoubleSide} />
			</mesh>
		);
	}
}
