import { Button, buttonVariants } from "@/components/ui/button";
import { Zone } from "@/model/zone";
import Image from "next/image";
import ZoneItemDetails from "./zoneItemDetails";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const imageButtonSize = 15;

interface ZoneItemProps {
	zone: Zone;
}

export default function ZoneItem({ zone }: ZoneItemProps) {
	return (
		<div
			className={"flex p-3 gap-3 items-center hover:bg-slate-300 rounded-md"}
		>
			<span className={"grow font-bold"}>{zone.getId()}</span>
			<ZoneItemDetails zone={zone} />
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
						//TODO elimination logic
						console.log("Elimina zona con id: " + zone.getId());
					}}className={buttonVariants({variant: "destructive"}) + " w-min ml-auto"}>Elimina</Button>
				</DialogContent>
			</Dialog>


		</div>
	);
}
