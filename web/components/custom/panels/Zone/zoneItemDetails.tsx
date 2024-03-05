import { Zone } from "@/model/zone";
import Image from "next/image";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {columns} from './bin_columns';
import { DataTable } from "@/components/ui/data-table";

interface ZoneItemProps {
	zone: Zone;
}
const imageButtonSize = 15;

export default function ZoneItemDetails({ zone }: ZoneItemProps) {
	return (
		<Sheet>
			<SheetTrigger>
				<Image
					src="/icons/visualize.svg"
					width={imageButtonSize}
					height={imageButtonSize}
					alt="Add"
				/>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{zone.getId()}</SheetTitle>
					<SheetDescription>Informazioni della zona</SheetDescription>
				</SheetHeader>
				<div className={"grid items-center grid-cols-3 grid-rows-2 gap-y-2 mt-2"}>
					<Label>Direzione</Label>
					<Input className={"col-span-2"} value={zone.getOrientation() ? "NS" : "EW"}></Input>

					<Label>Dimensioni</Label>
					<div className={"flex col-span-2 gap-2"}>
						<Input value={zone.getLength()}></Input>
						<Input value={zone.getWidth()}></Input>
						<Input value={zone.getHeight()}></Input>
					</div>
				</div>

                <hr className={"my-5"}/>

                <DataTable columns={columns} data={zone.getBins()}/>
			</SheetContent>
		</Sheet>
	);
}
