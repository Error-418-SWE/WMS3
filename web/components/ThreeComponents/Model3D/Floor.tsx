import { DoubleSide, Vector3, Texture, TextureLoader } from "three";
import { useFloorData } from "../../providers/floorProvider";
import React, { useEffect, useState } from "react";

const inclination = Math.PI / 2;

interface SvgPlaneProps {
	svgContent: string;
	width: number;
	length: number;
}

const SvgPlane: React.FC<SvgPlaneProps> = ({ svgContent, width, length }) => {
	const [texture, setTexture] = useState<Texture>();

	useEffect(() => {
		setTexture(
			new TextureLoader().load(`data:image/svg+xml;base64,${btoa(svgContent)}`),
		);
	}, [svgContent]);

	return (
		<mesh
			position={new Vector3(width / 2, 0.0025, length / 2)}
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
				name="floor"
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
			</>
		);
	}
}
