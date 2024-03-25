import React, { useRef, useState } from "react";
import { Edges, Plane } from "@react-three/drei";
import { Zone } from "@/model/zone";
import * as THREE from "three";
import { Bin3D } from "./bin3D";
import { useDrag } from "@use-gesture/react";
import { Group, Object3DEventMap, Vector2, Vector3 } from "three";
import { ThreeEvent, useThree } from "@react-three/fiber";
import { useWarehouseData } from "@/components/providers/Threejs/warehouseProvider";
import ZoneItemDetails from "@/components/custom/panels/Zone/zoneItemDetails";
import { useElementDetails } from "@/components/providers/UI-Providers/ElementDetailsProvider";

interface Zone3DProps {
	zone: Zone;
	position: THREE.Vector3;
}

export function Zone3D({
	zone,
	position,
}: Zone3DProps) {
	const zoneGeometry = new THREE.BoxGeometry(
		zone.getWidth(),
		zone.getHeight(),
		zone.getLength()
	);

	const [currentPosition, setCurrentPosition] = useState(position);
	const { gl, camera, scene } = useThree();
	const [toDrag, setToDrag] = useState(false);
	const [lastValidPosition, setLastValidPosition] = useState(new Vector3( currentPosition.x, currentPosition.y, currentPosition.z ));
	const { orbitRef, gridCellSize } = useWarehouseData();
	const { setElementDetails, setShowElementDetails } = useElementDetails();
	const planeRef = useRef<THREE.Mesh | null>(null);
	const parentRef = useRef<Group<Object3DEventMap> | null>(null);

	const showRepositionButtonRef = useRef<THREE.Mesh>(null);

	// Function to calculate the target position
	const calculateTargetPosition = (state: any) => {
		const raycaster = new THREE.Raycaster();
		const rect = gl.domElement.getBoundingClientRect();
		const x =
			(((state.event as PointerEvent).clientX - rect.left) / rect.width) * 2 -
			1;
		const y =
			-(((state.event as PointerEvent).clientY - rect.top) / rect.height) * 2 +
			1;
		const mouse = new Vector2(x, y);
		raycaster.setFromCamera(mouse, camera);
		const floorMesh = scene.getObjectByName("floor");
		const pointerPosition = raycaster.intersectObject(floorMesh!);
		if (gridCellSize === 0) {
			return new Vector3(
				pointerPosition[0].point.x,
				pointerPosition[0].point.y,
				pointerPosition[0].point.z
				);
		} else {
			return new Vector3(
				Math.round(pointerPosition[0].point.x / gridCellSize) * gridCellSize,
				Math.round(pointerPosition[0].point.y / gridCellSize) * gridCellSize,
				Math.round(pointerPosition[0].point.z / gridCellSize) * gridCellSize
				);
		}
	};

	// Function to check for collision with other zones
	const checkCollision = () => {
		const zones = scene.children.filter((child) => child.name === "zone");
		const currentBoundingBox = planeRef.current ? new THREE.Box3().setFromObject(planeRef.current) : null;
		const collision = zones.some((otherZone) => {
			if (otherZone === planeRef.current?.parent) {
				return false;
			}
			const otherBoundingBox = new THREE.Box3().setFromObject(otherZone);
			return currentBoundingBox?.intersectsBox(otherBoundingBox);
		});
		return collision;
	};

	// Main drag function
	const bind = useDrag((state) => {
		state.event.stopPropagation();
		if (toDrag && planeRef.current) {
		  orbitRef.current.enabled = false;
		  planeRef.current.visible = true;
		  const target = calculateTargetPosition(state);
		  const collision = checkCollision();

		  // Always update the temporary position during a drag event
		  let tempPosition = new THREE.Vector3(target.x, target.y, target.z);
		  setCurrentPosition(tempPosition.clone());
		  if (!collision) {
			setLastValidPosition(tempPosition);
			(planeRef.current.material as THREE.MeshBasicMaterial).color.set("green");
		  } else {
			(planeRef.current.material as THREE.MeshBasicMaterial).color.set("red");
		  }

		  if (state.last) {
			planeRef.current.visible = false;
			state.event.stopPropagation();
			orbitRef.current.enabled = true;
			setToDrag(false);

			if (checkCollision()) {
			  // If the drag event ends and there's a collision, reset the position to the last valid position
			  setCurrentPosition(new Vector3(lastValidPosition.x, lastValidPosition.y, lastValidPosition.z));
			}

			zone.setCoordinateX(lastValidPosition.x);
			zone.setCoordinateY(lastValidPosition.z);
		  }
		}
	  }, { threshold: 1});

	return (
		//@ts-ignore
		<group
			position={[
				currentPosition.x +
					(zone.getOrientation() ? zone.getLength() / 2 : zone.getWidth() / 2),
				currentPosition.y + zone.getHeight() / 2,
				currentPosition.z +
					(zone.getOrientation() ? zone.getWidth() / 2 : -zone.getLength() / 2),
			]}
			rotation={[0, zone.getOrientation() ? -Math.PI / 2 : 0, 0]}
			{...bind()}
			onPointerEnter={(event : ThreeEvent<MouseEvent>) => {
				event.stopPropagation();
				showRepositionButtonRef.current!.visible = true;
			}}
			onPointerOut={(event : ThreeEvent<MouseEvent>) => {
				event.stopPropagation();
				showRepositionButtonRef.current!.visible = false;
			}}
			name="zone"
			ref={parentRef}
		>
			{zone.getLevels().map((level, levelIndex) => {
				let levelVerticalPosition = 0;
				let levelsHeights = zone.getColumns()[0];
				for (let i = 0; i < levelIndex; i++) {
					levelVerticalPosition += levelsHeights[i].getHeight();
				}

				return level.map((bin) => {
					let binHorizontalPosition = 0;
					for (let i = 0; i < bin.getColumn(); i++) {
						binHorizontalPosition += level[i].getWidth();
					}
					const binPosition = new THREE.Vector3(
						binHorizontalPosition + bin.getWidth() / 2 - zone.getWidth() / 2,
						levelVerticalPosition + bin.getHeight() / 2 - zone.getHeight() / 2,
						bin.getLength() / 2 - zone.getLength() / 2
					);
					return <Bin3D key={bin.getId()} bin={bin} position={binPosition} parentRef={parentRef} orientation={zone.getOrientation()}/>;
				});
			})}
			<Edges geometry={zoneGeometry} color="black" />

			<Plane
				ref={planeRef}
				args={[zone.getWidth(), zone.getLength()]}
				position={[0, -zone.getHeight() / 2 + 0.01, 0]}
				rotation={[-Math.PI / 2, 0, 0]}
			/>

			<mesh
				onDoubleClick={(event) => {
					event.stopPropagation();
					setElementDetails(<ZoneItemDetails zone={zone} />);
					setShowElementDetails(true);
				}}
				onPointerDown={(event) => {
					setToDrag(true);
				}}
				position={[
					-zone.getWidth() / 2,
					-zone.getHeight() / 2 + 0.25,
					zone.getLength() / 2,
				]}

				ref={showRepositionButtonRef}
				visible={false}
			>
				<boxGeometry args={[0.5, 0.5, 0.5]} />
				<meshBasicMaterial color="red" />
			</mesh>
		</group>
	);
}
