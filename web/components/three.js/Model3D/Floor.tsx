import { DoubleSide, Vector3 } from "three";
import { useFloorData } from "../../providers/floorProvider";
import * as THREE from "three";
import React from "react";

const inclination = Math.PI / 2;

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
		<mesh
			position={new Vector3(width / 2, 0.01, length / 2)}
			rotation={[inclination, 0, 0]}
		>
			<planeGeometry args={[width, length]} />
			<meshBasicMaterial
				color="white"
				map={texture}
				side={DoubleSide}
				transparent={true}
			/>
		</mesh>
	);
};

export default function Floor() {
	const { floor } = useFloorData();

	if (floor && floor.getSVG().getString() == "") {
		return (
			<mesh
				position={new Vector3(floor.getWidth() / 2, 0, floor.getLength() / 2)}
				rotation={[inclination, 0, 0]}
			>
				<planeGeometry args={[floor.getWidth(), floor.getLength()]} />
				<meshBasicMaterial color="white" side={DoubleSide} />
			</mesh>
		);
	}
	if (floor && floor.getSVG().getString() != "") {
		return (
			<group>
				<mesh
					position={new Vector3(floor.getWidth() / 2, 0, floor.getLength() / 2)}
					rotation={[inclination, 0, 0]}
				>
					<planeGeometry args={[floor.getWidth(), floor.getLength()]} />
					<meshBasicMaterial color="white" side={DoubleSide} />
				</mesh>
				<SvgPlane
					svgContent={floor.getSVG().getString()}
					width={floor.getSVG().getWidth()}
					length={floor.getSVG().getLength()}
				/>
			</group>
		);
	}
}
