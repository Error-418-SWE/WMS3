import { DoubleSide, Vector3, GridHelper } from "three";
import { useFloorData } from "../../providers/floorProvider";
import * as THREE from "three";
import React from "react";
import { extend } from "@react-three/fiber";

// This makes GridHelper usable as a JSX element.
extend({ GridHelper });

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
        name = "floor"
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
			<>
				<mesh
					name="floor"
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
