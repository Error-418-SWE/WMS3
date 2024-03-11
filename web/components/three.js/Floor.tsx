import { DoubleSide } from "three";
import { useSearchParams } from "next/navigation";

const inclination=Math.PI/2;

export default function Floor() {

	const choice_mode = useSearchParams()?.get("choice");
	const floor_width: number = +useSearchParams()?.get("larghezza")!;
	const floor_depth: number = +useSearchParams()?.get("profondita")!;

	if (choice_mode != null) {
		if (
			choice_mode == "manuale"
			&& floor_depth != null
			&& floor_width !=null
			) {
			return (
				<mesh
					position={[0.1, -inclination, -4]}
					rotation={[inclination, 0, 0]}
				>
					<planeGeometry args={[floor_width, floor_depth]} />
					<meshBasicMaterial color="white" side={DoubleSide} />
				</mesh>
			);
		}
	}
}