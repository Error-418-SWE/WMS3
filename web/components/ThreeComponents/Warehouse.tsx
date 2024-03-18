	import { Canvas } from "@react-three/fiber";
	import {
		OrbitControls,
		PerspectiveCamera,
	} from "@react-three/drei";
	import Floor from "./Model3D/Floor";
	import { useFloorData } from "../providers/floorProvider";
	import { Vector3 } from "three";
	import { useZonesData } from "../providers/zonesProvider";
	import { useBinsData } from "../providers/binsProvider";
	import { Zone } from "@/model/zone";
	import { Zone3D } from "./Model3D/zone3D";
	import { useWarehouseData } from "../providers/Threejs/warehouseProvider";
	import { useState, useCallback } from "react";


	export default function Warehouse() {
		const { floor } = useFloorData();
		const { zones, addZone } = useZonesData();
		const { bins } = useBinsData();

		const [ floor3D, setFloor3D ] = useState(<Floor />);
		const {currentZone, setCurrentZone} = useWarehouseData();
		const [isDragging, setIsDragging] = useState(false);

		return (
			<div className="h-screen">
				<Canvas className={"h-screen, bg-BurlyWood"}>
					<PerspectiveCamera
						makeDefault
						position={[floor.getWidth() / 2, 60, floor.getLength()]}
						rotation={[Math.PI / 2, Math.PI / 2, Math.PI / 2]}
					/>
					{floor3D}

					{zones.map((zone: Zone, index: number) => {
						const zonePosition = new Vector3(
							zone.getXcoordinate(),
							0,
							zone.getYcoordinate()
						);
						return <Zone3D key={zone.getId()} zone={zone} position={zonePosition} floor3D={floor3D} setIsDragging={setIsDragging}/>;
					})}

					<ambientLight />
					<OrbitControls
						dampingFactor={0.05}
						screenSpacePanning={false}
						minPolarAngle={Math.PI / 5}
						maxPolarAngle={Math.PI / 2.3}
					/>
				</Canvas>
			</div>
		);
	}