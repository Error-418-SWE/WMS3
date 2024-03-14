import React from 'react';
import { Box, Edges } from '@react-three/drei';
import { Bin } from '@/model/bin';
import * as THREE from 'three';

interface Bin3DProps {
	bin: Bin;
	position: THREE.Vector3;
}

export function Bin3D({ bin, position}: Bin3DProps) {
	const binGeometry = new THREE.BoxGeometry(bin.getWidth(), bin.getHeight(), bin.getLength());
	return (
		<group position={position} onClick={ () =>
			alert("Bin: " + bin.getId())
		}>
			<Box geometry={binGeometry}>
				<meshBasicMaterial attach="material" color={bin.getProduct() ? 0x4169e1 : 0x5f5f5f} transparent={true} opacity={0.5}/>
			</Box>
			<Edges geometry={binGeometry} color="black" />
		</group>
	);
}