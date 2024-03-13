import * as THREE from "three";
import { DoubleSide } from "three";
import { useFloorData } from "../providers/floorProvider";
import React from "react";

// PARAMETRI
const inclination = Math.PI / 2;

// PIANO CON SVG
interface SvgPlaneProps {
	svgContent: string;
	width: number;
	length: number;
}

const SvgPlane: React.FC<SvgPlaneProps> = ({ svgContent, width, length }) => {
	const texture = new THREE.TextureLoader().load(
		`data:image/svg+xml;base64,${btoa(svgContent)}`
	);
	return (
		<group>
			<mesh position={[0.1, -inclination, -4]} rotation={[inclination, 0, 0]}>
				<planeGeometry args={[width, length]} />
				<meshBasicMaterial color={"white"} side={DoubleSide} />
			</mesh>
			<mesh position={[0.1, -inclination, -4]} rotation={[inclination, 0, 0]}>
				<planeGeometry args={[width, length]} />
				<meshBasicMaterial
					color="white"
					map={texture}
					side={DoubleSide}
					transparent={true}
				/>
			</mesh>
		</group>
	);
};

// COMPONENT RICHIAMATO IN WAREHOUSE
export default function Floor() {
	const { floor } = useFloorData();

	if (floor && floor.getSVG() == "") {
		return (
			<mesh position={[0.1, -inclination, -4]} rotation={[inclination, 0, 0]}>
				<planeGeometry args={[floor.getWidth(), floor.getLength()]} />
				<meshBasicMaterial color="white" side={DoubleSide} />
			</mesh>
		);
	}
	if (floor && floor.getSVG() != "") {
		return (
			<SvgPlane
				svgContent={floor.getSVG()!}
				width={floor.getWidth()!}
				length={floor.getLength()!}
			/>
		);
	}
}
