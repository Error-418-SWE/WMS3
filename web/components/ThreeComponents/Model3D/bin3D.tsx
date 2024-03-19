import React, { useEffect, useRef, useState } from 'react';
import { Box, Edges } from '@react-three/drei';
import { Bin } from '@/model/bin';
import * as THREE from 'three';
import { useElementDetails } from '@/components/providers/UI-Providers/ElementDetailsProvider';
import BinItemDetails from '@/components/custom/panels/Bin/binItemDetails';
import { ThreeEvent, useThree } from '@react-three/fiber';
import { useWarehouseData } from '@/components/providers/Threejs/warehouseProvider';
import { useDrag } from '@use-gesture/react';
import { Group, Object3D, Object3DEventMap, Plane, Raycaster, Vector2, Vector3 } from 'three';

interface Bin3DProps {
	bin: Bin;
	position: THREE.Vector3;
	parentRef: any;
	orientation: boolean,
}

const selectedColor = 0xff0000;
const defaultColor = 0x5f5f5f;
const notEmptyColor = 0x4169e1;

export function Bin3D({ bin, position, parentRef, orientation }: Bin3DProps) {
	const { setElementDetails, setShowElementDetails } = useElementDetails();
	const { selectedBin, setSelectedBin, setIsDragging } = useWarehouseData();
	const [draggable, setDraggable] = useState(bin.getProduct());
	const [currentPosition, setCurrentPosition] = useState(position);

	const groupRef = useRef<Group<Object3DEventMap> | null>(null);

	const binGeometry = new THREE.BoxGeometry(bin.getWidth(), bin.getHeight(), bin.getLength());

	const handleClick = (event: ThreeEvent<MouseEvent>) => {
		event.stopPropagation();
		setSelectedBin(bin);
		setElementDetails(<BinItemDetails bin={bin} />);
		setShowElementDetails(true);
	};

	const { gl, scene, camera, size } = useThree();
	const initialPosition = new Vector3(position.x, position.y, position.z);
	/*
		const bind = useDrag((state: any) => {
			if (draggable) {
				setIsDragging(true);
				const raycaster = new Raycaster();
				const rect = gl.domElement.getBoundingClientRect();
				const x = ((state.event as PointerEvent).clientX - rect.left) / rect.width * 2 - 1;
				const y = -((state.event as PointerEvent).clientY - rect.top) / rect.height * 2 + 1;
				raycaster.setFromCamera(new Vector2(x, y), camera);
				const floorMesh = scene.getObjectByName("floor");

				// Get all zone objects in the scene, excluding the currently dragged bin
				const zones = scene.children.filter(child => child.name === 'bin' && child !== groupRef.current);

				let target = new Vector3();
				let intersects = raycaster.intersectObjects(zones);
				if (intersects.length > 1) {
					// If the bin is over a zone, use the intersection point with the zone
					target.copy(intersects[1].point);
				} else {
					// If the bin is not over a zone, intersect the ray with the floor
					intersects = raycaster.intersectObject(floorMesh!);
					if (intersects.length > 0) {
						target.copy(intersects[0].point);
					}
				}

				// Update the position of the bin
				if(orientation){
					target.x = -target.x;
					target.z = -target.z;
				}
				target.sub(parentRef.current.position);
				setCurrentPosition(target);

				// If the drag event ends, check for collision and trigger an alert
				if (state.last) {
					setIsDragging(false);
					setCurrentPosition(initialPosition);
					if (false) { // replace with your collision detection logic
						alert('Collision detected!');
						// Reset the position of the bin to its previous position
						position.copy(initialPosition);
					}
				}
			}
		});
	*/

	/*
	const bind = useDrag((state: any) => {
		if (draggable && groupRef.current) {
			setIsDragging(true);
			const raycaster = new Raycaster();
			const rect = gl.domElement.getBoundingClientRect();
			const x = ((state.event as PointerEvent).clientX - rect.left) / rect.width * 2 - 1;
			const y = -((state.event as PointerEvent).clientY - rect.top) / rect.height * 2 + 1;
			raycaster.setFromCamera(new Vector2(x, y), camera);
			const floorMesh = scene.getObjectByName("floor");

			// Get all bin objects in the scene
			const bins = scene.children.flatMap(child =>
				child.name === 'zone'
					? child.children.filter(bin => bin !== groupRef.current)
					: []
			);

			let target = new Vector3();

			// Temporarily hide the bin while calculating the intersection point
			groupRef.current.visible = false;

			let intersects = raycaster.intersectObjects(bins);
			if (intersects.length > 0) {
				// If the bin is over another bin, use the intersection point with the bin
				target.copy(intersects[0].point);
			} else {
				// If the bin is not over another bin, intersect the ray with the floor
				intersects = raycaster.intersectObject(floorMesh!);
				if (intersects.length > 0) {
					target.copy(intersects[0].point);
				}
			}

			// Make the bin visible again after calculating the intersection point
			groupRef.current.visible = true;

			// Update the position of the bin considering the zone's orientation
			if (orientation) {
				let tmp = target.x;
				target.x = target.z;
				target.z = tmp;
				target.z = -target.z;
			}
			if (orientation) {
				target.x -= parentRef.current.position.z;
				target.z -= parentRef.current.position.x;
			}
			else
				target.sub(parentRef.current!.position);
			setCurrentPosition(target);

			// If the drag event ends, check for collision and trigger an alert
			if (state.last) {
				setIsDragging(false);
				setCurrentPosition(initialPosition);
				if (false) { // replace with your collision detection logic
					alert('Collision detected!');
					// Reset the position of the bin to its previous position
					position.copy(initialPosition);
				}
			}
		}
	});

	*/

	const bind = useDrag((state: any) => {
		if (draggable && groupRef.current) {
			setIsDragging(true);
			const raycaster = new Raycaster();
			const rect = gl.domElement.getBoundingClientRect();
			const x = ((state.event as PointerEvent).clientX - rect.left) / rect.width * 2 - 1;
			const y = -((state.event as PointerEvent).clientY - rect.top) / rect.height * 2 + 1;
			raycaster.setFromCamera(new Vector2(x, y), camera);
			const floorMesh = scene.getObjectByName("floor");

			// Get all bin objects in the scene
			const bins = scene.children.flatMap(child =>
				child.name === 'zone'
					? child.children.filter(bin => bin !== groupRef.current)
					: []
			);

			let target = new Vector3();

			// Temporarily hide the bin while calculating the intersection point
			groupRef.current.visible = false;

			let intersects = raycaster.intersectObjects(bins);
			if (intersects.length > 0) {
				// If the bin is over another bin, use the intersection point with the bin
				target.copy(intersects[0].point);
			} else {
				// If the bin is not over another bin, intersect the ray with the floor
				intersects = raycaster.intersectObject(floorMesh!);
				if (intersects.length > 0) {
					target.copy(intersects[0].point);
				}
			}

			// Make the bin visible again after calculating the intersection point
			groupRef.current.visible = true;

			// Update the position of the bin considering the zone's orientation
			if (orientation) {
				let angle = Math.PI / 2; // 90 degrees
				let pivot = parentRef.current.position;

				// Rotate the target position around the pivot point
				let direction = new THREE.Vector3().subVectors(target, pivot);
				direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
				target = pivot.clone().add(direction);
			}

			target.sub(parentRef.current!.position);
			setCurrentPosition(target);

			// If the drag event ends, check for collision and trigger an alert
			if (state.last) {
				setIsDragging(false);
				setCurrentPosition(initialPosition);
				if (false) { // replace with your collision detection logic
					alert('Collision detected!');
					// Reset the position of the bin to its previous position
					position.copy(initialPosition);
				}
			}
		}
	});


	return (
		//@ts-ignore
		<group name="bin" position={currentPosition} {...bind()} ref={groupRef}>
			<Box geometry={binGeometry}>
				<meshBasicMaterial attach="material" color={bin === selectedBin ? selectedColor : (bin.getProduct() ? notEmptyColor : defaultColor)} transparent={true} opacity={0.5} />
			</Box>
			<Edges geometry={binGeometry} color="black" />
		</group>
	);
}
