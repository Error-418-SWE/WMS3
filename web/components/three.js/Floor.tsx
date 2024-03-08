import { useSearchParams } from "next/navigation";
import { DoubleSide } from "three";

const choice_mode = useSearchParams()?.get("choice");
const floor_width: number = +useSearchParams()?.get("larghezza")!;
const floor_depth: number = +useSearchParams()?.get("profondita")!;

export default function Floor() {

	if (choice_mode != null) {
		if (
			choice_mode == "manuale"
			&& floor_depth != null
			&& floor_width !=null
			) {
			return (
				<mesh
					position={[0.1, -0.5 * Math.PI, 0]}
					rotation={[Math.PI / 2, 0, 0]}
					scale={[2, 2, 2]}
				>
					<planeGeometry args={[floor_width, floor_depth]} />
					<meshBasicMaterial color="white" side={DoubleSide} />
				</mesh>
			);
		}
	}
}