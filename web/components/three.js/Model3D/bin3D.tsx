import React from 'react';
import { Box, Edges } from '@react-three/drei';
import { Bin } from '@/model/bin';
import * as THREE from 'three';

interface Bin3DProps {
	bin: Bin;
}

export function Bin3D({ bin }: Bin3DProps) {
	const binGeometry = new THREE.BoxGeometry(bin.getWidth(), bin.getLength(), bin.getHeight());
	return (
		<group>
			<Box geometry={binGeometry}>
				<meshBasicMaterial attach="material" color={0x4169e1} />
			</Box>
			<Edges geometry={binGeometry} color="black" />
		</group>
	);
}