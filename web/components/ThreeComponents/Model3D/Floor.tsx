import { DoubleSide, Vector3, GridHelper } from "three";
import { useFloorData } from "../../providers/floorProvider";
import { extend } from "@react-three/fiber";

// This makes GridHelper usable as a JSX element.
extend({ GridHelper });

const inclination = Math.PI / 2;

export default function Floor() {
	const { floor } = useFloorData();

	if (floor) {
		return (
			<>
				<mesh
					name="floor"
					position={new Vector3(floor.getWidth() / 2, 0, floor.getLength() / 2)}
					rotation={[inclination, 0, 0]}
				>
					<planeGeometry args={[floor.getWidth(), floor.getLength()]} />
					<meshBasicMaterial side={DoubleSide} />
				</mesh>
				<gridHelper
					args={[
						floor.getWidth(), // size of the grid
						floor.getWidth() / 2, // number of divisions
					]}
					position={[floor.getWidth() / 2, 0.01, floor.getLength() / 2]} // slightly above the floor
					scale={[1, 1, floor.getLength() / floor.getWidth()]} // scale the grid to make it rectangular
				/>
			</>
		);
	}
}
