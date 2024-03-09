import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Floor from "./Floor";
import { useSearchParams } from "next/navigation";

export default function Warehouse() {

	const choice_mode = useSearchParams()?.get("choice");
	const floor_width: number = +useSearchParams()?.get("larghezza")!;
	const floor_depth: number = +useSearchParams()?.get("profondita")!;

	return (
		<div className="h-screen">
			<Canvas
				className={"h-screen, bg-BurlyWood"}
			>

				<PerspectiveCamera />
				if(choice_mode != undefinde | choice_mode != null){
				<Floor
					choice_mode={choice_mode!}
					floor_width={floor_width}
					floor_depth={floor_depth}/>
				}
				<ambientLight />
				<OrbitControls />
			</Canvas>
		</div>
	);
}

