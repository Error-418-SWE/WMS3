import { Button, buttonVariants } from "@/components/ui/button";
import { Zone } from "@/model/zone";
import Image from "next/image";
import ZoneItemDetails from "./zoneItemDetails";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useElementDetails } from "@/components/providers/UI-Providers/ElementDetailsProvider";
import { useZonesData } from "@/components/providers/zonesProvider";

const imageButtonSize = 15;

interface ZoneItemProps {
	zone: Zone;
}

export default function ZoneItem({ zone }: ZoneItemProps) {

	const {setElementDetails, setShowElementDetails} = useElementDetails();
	const {deleteZone} = useZonesData();

	return (
		<div
			className={"flex p-3 gap-3 items-center hover:bg-slate-300 rounded-md"}
		>
			<span className={"grow font-bold"}>{zone.getId()}</span>
			<Button
				className={buttonVariants({ variant: "secondary" })}
				onClick={() => {
					setElementDetails(<ZoneItemDetails zone={zone} />);
					setShowElementDetails(true);
				}}
			>
				<Image
					src="/icons/visualize.svg"
					width={imageButtonSize}
					height={imageButtonSize}
					alt="Add"
				/>
			</Button>
			<Dialog>
				<DialogTrigger >
					<Image
						src="/icons/delete.svg"
						width={imageButtonSize}
						height={imageButtonSize}
						alt="Add"
					/>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Eliminazione scaffale</DialogTitle>
						<DialogDescription>
							Questa azione non può essere annullata. Sei sicuro di voler eliminare la zona {zone.getId()}?
						</DialogDescription>
					</DialogHeader>
					<Button onClick={() => {
						deleteZone(zone.getId());
						setShowElementDetails(false);
						close();
					}}className={buttonVariants({variant: "destructive"}) + " w-min ml-auto"}>Elimina</Button>
				</DialogContent>
			</Dialog>


		</div>
	);
}
