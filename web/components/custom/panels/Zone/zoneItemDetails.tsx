import { Zone } from "@/model/zone";
import { Label } from "@/components/ui/label";
import { columns } from "./bin_columns";
import { DataTable } from "@/components/ui/data-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { useElementDetails } from "@/components/providers/UI-Providers/ElementDetailsProvider";
import { useWarehouseData } from "@/components/providers/Threejs/warehouseProvider";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import ZoneCreationFrame from "./zoneCreationFrame";
import { useZonesData } from "@/components/providers/zonesProvider";
import { MapPin, X } from "lucide-react";

interface ZoneItemProps {
	zone: Zone;
}
export default function ZoneItemDetails({ zone }: ZoneItemProps) {
	const { setElementDetails, setShowElementDetails } = useElementDetails();
	const { deleteZone } = useZonesData();
	const { moveCameraToPosition } = useWarehouseData();

	return (
		<div className={"flex flex-col h-full mx-5"}>
			<div className={"flex items-center mt-2 justify-between"}>
				<h1 className={"grow font-bold text-2xl"}>{zone.getId()}</h1>
				<Button
					variant="ghost"
					onClick={() => {
						setShowElementDetails(false);
					}}
				>
					<X size={16} />
				</Button>
			</div>
			<span className={"text-sm text-muted-foreground"}>
				Informazioni sulla zona
			</span>
			<div className={"grid items-center grid-cols-3 grid-rows-2 gap-y-2 mt-4"}>
				<Label>Direzione</Label>
				<span className={"col-span-2 dataSpan"}>
					{zone.isNSOriented() ? "NS" : "EW"}
				</span>

				<Label>Dimensioni</Label>
				<div className={"grid items-center grid-cols-3 col-span-2 gap-2"}>
					<span className="dataSpan">{zone.getLength()}</span>
					<span className="dataSpan">{zone.getWidth()}</span>
					<span className="dataSpan">{zone.getHeight()}</span>
				</div>
			</div>

			<hr className={"my-5"} />

			<div className={"flex-grow overflow-y-auto mb-10"}>
				<DataTable columns={columns} data={zone.getBins()} />
			</div>

			<div className={"flex justify-end gap-x-2 mb-4"}>
				<Button
					className={buttonVariants({ variant: "secondary" }) + " border"}
					onClick={() => {
						if (zone.isNSOriented()) {
							moveCameraToPosition(
								zone.getXcoordinate() + zone.getLength() / 2,
								zone.getYcoordinate() + zone.getWidth() / 2,
								);
							} else {
								moveCameraToPosition(
								zone.getXcoordinate() - zone.getWidth() / 2,
								zone.getYcoordinate() - zone.getLength() / 2,
							);
						}
					}}
				>
					<MapPin size={16} className={"mr-2"} />
					Localizza
				</Button>
				<Button
					className={buttonVariants({ variant: "secondary" }) + " border"}
					onClick={() => {
						setElementDetails(<ZoneCreationFrame zoneToModify={zone} />);
					}}
				>
					Modifica
				</Button>

				<Dialog>
					<DialogTrigger className={buttonVariants({ variant: "destructive" })}>
						Elimina
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Eliminazione scaffale</DialogTitle>
							<DialogDescription>
								Questa azione non può essere annullata. Vuoi davvero
								eliminare la zona {zone.getId()}?
							</DialogDescription>
						</DialogHeader>
						<Button
							onClick={() => {
								deleteZone(zone.getId());
								setShowElementDetails(false);
								close();
							}}
							className={
								buttonVariants({ variant: "destructive" }) + " w-min ml-auto"
							}
						>
							Elimina
						</Button>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
