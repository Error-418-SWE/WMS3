import { Zone } from "@/model/zone";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { columns } from "./bin_columns";
import { DataTable } from "@/components/ui/data-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { useElementDetails } from "@/components/providers/UI-Providers/ElementDetailsProvider";
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

const imageButtonSize = 15;

interface ZoneItemProps {
	zone: Zone;
}
export default function ZoneItemDetails({ zone }: ZoneItemProps) {
	const { setElementDetails, setShowElementDetails } = useElementDetails();
	const { deleteZone } = useZonesData();

	return (
		<div className={"flex flex-col h-full mx-5"}>
			<div className={"flex items-center mt-2 justify-between"}>
				<span className={"font-bold"}>{zone.getId()}</span>
				<Button
					variant="ghost"
					onClick={() => {
						setShowElementDetails(false);
					}}
				>
					X
				</Button>
			</div>
			<span className={"text-sm text-muted-foreground"}>
				Informazioni della zona
			</span>
			<div className={"grid items-center grid-cols-3 grid-rows-2 gap-y-2 mt-2"}>
				<Label>Direzione</Label>
				<span className={"col-span-2 dataSpan"}>
					{zone.getOrientation() ? "NS" : "EW"}
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
								Questa azione non può essere annullata. Sei sicuro di voler
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
