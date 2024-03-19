import React, { useEffect, useRef, useState } from "react";
import { Box, Edges } from "@react-three/drei";
import { Bin, BinState } from "@/model/bin";
import * as THREE from "three";
import { useElementDetails } from "@/components/providers/UI-Providers/ElementDetailsProvider";
import BinItemDetails from "@/components/custom/panels/Bin/binItemDetails";
import { ThreeEvent, useThree } from "@react-three/fiber";
import { useWarehouseData } from "@/components/providers/Threejs/warehouseProvider";
import { useDrag } from "@use-gesture/react";
import {
	Group,
	Object3D,
	Object3DEventMap,
	Plane,
	Raycaster,
	Vector2,
	Vector3,
} from "three";


interface Bin3DProps {
	bin: Bin;
	position: THREE.Vector3;
	parentRef: any;
	orientation: boolean;
}

const selectedColor = 0xff0000;
const defaultColor = 0x5f5f5f;
const notEmptyColor = 0x4169e1;
const productIncomingColor = 0x00ff00;
const productOutgoingColor = 0xffa500;

export function Bin3D({ bin, position, parentRef, orientation }: Bin3DProps) {
	const { setElementDetails, setShowElementDetails } = useElementDetails();
	const { selectedBin, setSelectedBin, isDragging, setIsDragging, newMovementOrder } = useWarehouseData();
	const [draggable, setDraggable] = useState(bin.getProduct() && bin.getBinState() === BinState.Idle);
	const [currentPosition, setCurrentPosition] = useState(position);

	const groupRef = useRef<Group<Object3DEventMap> | null>(null);

	const binGeometry = new THREE.BoxGeometry(
		bin.getWidth(),
		bin.getHeight(),
		bin.getLength()
	);

	const handleClick = (event: ThreeEvent<MouseEvent>) => {
		event.stopPropagation();
		if(!isDragging){
			setSelectedBin(bin);
			setElementDetails(<BinItemDetails bin={bin} />);
			setShowElementDetails(true);
		}
	};

	const { gl, scene, camera } = useThree();
	const initialPosition = new Vector3(position.x, position.y, position.z);

	let lastIntersectedBin: THREE.Object3D<THREE.Object3DEventMap>;
	let intersectedBin: THREE.Object3D<THREE.Object3DEventMap>;

	const getIntersectedObject = (raycaster : Raycaster, objects : Object3D[]) => {
		const intersects = raycaster.intersectObjects(objects);
		if (intersects.length > 0) {
			return intersects[0].object;
		}
		return null;
	}
	
	const getIntersectedPoint = (raycaster : Raycaster, objects : Object3D[]) => {
		const intersects = raycaster.intersectObjects(objects);
		if (intersects.length > 0) {
			return intersects[0].point;
		}
		return null;
	}
	
	const rotateTargetPosition = (target : Vector3, pivot : Vector3, angle : number) => {
		let direction = new THREE.Vector3().subVectors(target, pivot);
		direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
		return pivot.clone().add(direction);
	}
	
	const bind = useDrag(async (state: any) => {
		if (draggable && groupRef.current) {
			setIsDragging(true);
			const raycaster = new Raycaster();
			const rect = gl.domElement.getBoundingClientRect();
			const x = (((state.event as PointerEvent).clientX - rect.left) / rect.width) * 2 - 1;
			const y = (-((state.event as PointerEvent).clientY - rect.top) / rect.height) * 2 + 1;
			raycaster.setFromCamera(new Vector2(x, y), camera);
			const floorMesh = scene.getObjectByName("floor");
	
			const bins = scene.children.flatMap((child) =>
				child.name === "zone"
					? child.children.filter((bin) => bin !== groupRef.current)
					: []
			);
	
			let target = new Vector3();
			groupRef.current.visible = false;
	
			intersectedBin = getIntersectedObject(raycaster, bins)!;
			if (intersectedBin) {
				target.copy(getIntersectedPoint(raycaster, bins)!);
				if (lastIntersectedBin !== intersectedBin) {
					lastIntersectedBin = intersectedBin;
				}
			} else {
				target.copy(getIntersectedPoint(raycaster, [floorMesh!])!);
			}
	
			groupRef.current.visible = true;
	
			if (orientation) {
				target = rotateTargetPosition(target, parentRef.current.position, Math.PI / 2);
			}
	
			target.sub(parentRef.current!.position);
			target.y += bin.getHeight() / 2;
			setCurrentPosition(target);
	
			if (state.last) {
				if(intersectedBin){
					const result = await newMovementOrder(bin.getId(), intersectedBin.userData.id, bin.getProduct()!.getId());
					if(result){
						setDraggable(false);
					}
				}
				setIsDragging(false);
				setCurrentPosition(initialPosition);
			}
		}
	}, {threshold: 5});
	

	return (
		//@ts-ignore
		<group name="bin" position={currentPosition} {...bind()} ref={groupRef} onClick={handleClick} 
		onPointerOver={(e) => {
			if(draggable){
				document.body.style.cursor = "grab";
			}
		}} onPointerOut={(e) => {
			e.stopPropagation();
			document.body.style.cursor = "auto";
		}}
		>
			<Box geometry={binGeometry} userData={{ id: bin.getId() }}>
				<meshBasicMaterial
					attach="material"
					color={
						bin === selectedBin
							? selectedColor
							: bin.getBinState() === BinState.ProductIncoming
							? productIncomingColor
							: bin.getBinState() === BinState.ProductOutgoing
							? productOutgoingColor
							: bin.getProduct()
							? notEmptyColor
							: defaultColor
					}
					transparent={true}
					opacity={0.5}
				/>
			</Box>
			<Edges geometry={binGeometry} color="black"/>
		</group>
	);
}
