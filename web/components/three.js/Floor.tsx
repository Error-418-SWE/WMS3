import { DoubleSide } from "three";

type PropsType = {
	choice_mode: string
	floor_width: number
	floor_depth: number
}

const inclination=Math.PI/2;

export default function Floor({choice_mode, floor_width, floor_depth}: PropsType) {
	if (choice_mode != null) {
		if (
			choice_mode == "manuale"
			&& floor_depth != null
			&& floor_width !=null
			) {
			return (
				<mesh
					position={[0.1, inclination, 0]}
					rotation={[inclination, 0, 0]}
				>
					<planeGeometry args={[floor_width, floor_depth]} />
					<meshBasicMaterial color="white" side={DoubleSide} />
				</mesh>
			);
		}
	}
}