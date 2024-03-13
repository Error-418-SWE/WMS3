import * as THREE from 'three';
import { DoubleSide } from "three";
import { useFloorData } from "../providers/floorProvider";
import React from "react";

const inclination = Math.PI / 2;

const SvgPlane: React.FC<{svgContent: string}> = ({ svgContent }) => {
	const texture= new THREE.TextureLoader().load(`data:image/svg+xml;base64,${btoa(svgContent)}`);
	return (
		<mesh position={[0.1, -inclination, -4]} rotation={[inclination, 0, 0]}>
			<planeGeometry args={[10,10]}/>
			<meshBasicMaterial map={texture} side={DoubleSide}/>
		</mesh>
	);
};
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
			<SvgPlane svgContent={floor.getSVG()!}/>
		)
	}
}
