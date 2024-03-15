import React, { useEffect, useState } from 'react';
import { Box, Edges } from '@react-three/drei';
import { Bin } from '@/model/bin';
import * as THREE from 'three';
import { useElementDetails } from '@/components/providers/UI-Providers/ElementDetailsProvider';
import BinItemDetails from '@/components/custom/panels/Bin/binItemDetails';
import { ThreeEvent } from '@react-three/fiber';

interface Bin3DProps {
	bin: Bin;
	position: THREE.Vector3;
}

const selectedColor = 0xff0000;
const defaultColor = 0x5f5f5f;
const notEmptyColor = 0x4169e1;

export function Bin3D({ bin, position }: Bin3DProps) {
  const { elementDetails, setElementDetails, showElementDetails, setShowElementDetails } = useElementDetails();
  const [isSelected, setIsSelected] = useState(false);

  const binGeometry = new THREE.BoxGeometry(bin.getWidth(), bin.getHeight(), bin.getLength());

  const handleClick = (event : ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setIsSelected(true);
    setElementDetails(<BinItemDetails bin={bin} />);
    setShowElementDetails(true);
  };

  useEffect(() => {
    if (!showElementDetails) {
      setIsSelected(false);
    }
  }, [showElementDetails]);

  return (
    <group position={position} onClick={handleClick}>
      <Box geometry={binGeometry}>
        <meshBasicMaterial attach="material" color={isSelected ? selectedColor : (bin.getProduct() ? notEmptyColor : defaultColor)} transparent={true} opacity={0.5} />
      </Box>
      <Edges geometry={binGeometry} color="black" />
    </group>
  );
}
