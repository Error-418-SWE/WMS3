import { Button, buttonVariants } from "@/components/ui/button";
import { Zone } from "@/model/zone";
import Image from "next/image";
import ZoneItemDetails from "./zoneItemDetails";

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
			<Button
				onClick={() => {
					//TODO logic
					console.log(zone);
				}}
				className={
					buttonVariants({ variant: "secondary" }) +
					"bg-transparent shadow-none"
				}
			>
				<Image
					src="/icons/delete.svg"
					width={imageButtonSize}
					height={imageButtonSize}
					alt="Add"
				/>
			</Button>
		</div>
	);
}
