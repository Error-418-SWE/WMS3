import { useSearchParams } from "next/navigation";
import { DoubleSide } from "three";

const position_x=0.1;
const position_y=-0.5 * Math.PI;
const position_z=0;

const euler_x=Math.PI / 2;
const euler_y=0;
const euler_z=0;

const scale_x=2;
const scale_y=2;
const scale_z=2;

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
					position={[position_x, position_y, position_z]}
					rotation={[euler_x, euler_y, euler_z]}
					scale={[scale_x, scale_y, scale_z]}
				>
					<planeGeometry args={[floor_width, floor_depth]} />
					<meshBasicMaterial color="white" side={DoubleSide} />
				</mesh>
			);
		}
	}
}