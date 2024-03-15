import React from 'react';
import { Box, Edges, Line } from '@react-three/drei';
import { Zone } from '@/model/zone';
import * as THREE from 'three';
import { Bin3D } from './bin3D';

interface Zone3DProps {
	zone: Zone;
	position: THREE.Vector3;
}

export function Zone3D({ zone, position}: Zone3DProps) {
	const zoneGeometry = new THREE.BoxGeometry(zone.getWidth(), zone.getHeight(), zone.getLength());
	return (
		<group position={[
			position.x + (zone.getOrientation() ? zone.getLength() / 2 : zone.getWidth() / 2),
			position.y + zone.getHeight() / 2,
			position.z + (zone.getOrientation() ? zone.getWidth() / 2 : -zone.getLength() / 2),
			]} rotation={[0,zone.getOrientation()? Math.PI / 2 : 0, 0]}>
			
			{
				zone.getLevels().map((level, levelIndex) => {
					let levelVerticalPosition = 0;
					let levelsHeights = zone.getColumns()[0];
					for (let i = 0; i < levelIndex; i++) {
						levelVerticalPosition += levelsHeights[i].getHeight();
					}

					return level.map((bin) => {
						let binHorizontalPosition = 0;
						for (let i = 0; i < bin.getColumn(); i++) {
							binHorizontalPosition += (level[i].getWidth());
						}
						const binPosition = new THREE.Vector3(
							binHorizontalPosition + bin.getWidth()/2 - zone.getWidth()/2,
							levelVerticalPosition + bin.getHeight()/2 - zone.getHeight()/2,
							bin.getLength()/2 - zone.getLength()/2
						);
						return <Bin3D bin={bin} position={binPosition}/>
					});
				})
			}
			<Edges geometry={zoneGeometry} color="black" />
		</group>
	);
}




