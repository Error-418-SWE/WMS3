import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import ZoneItem from "@/components/custom/panels/Zone/zoneItem";
import { Zone } from "@/model/zone";
import { Bin } from "@/model/bin";
import { Product } from "@/model/product";

export default function ZonePanel() {
	const zones = [
		new Zone(1, 1, 1, 1, 1, 1, [
			new Bin(1, 1, 1, 1, 1, 1, 
			new Product(1, "prodotto1", 1,1,1)),
			new Bin(2, 1, 1, 1, 1, 1, 
			new Product(1, "prodotto2", 1,1,1)),
			new Bin(3, 1, 1, 1, 1, 1, 
			new Product(1, "prodotto3", 1,1,1)),
			new Bin(4, 1, 1, 1, 1, 1, null)
		], true),

		new Zone(2, 2, 2, 2, 2, 2, [
			new Bin(2, 2, 2, 2, 2, 2, 
			new Product(2, "prodotto5", 2,2,2)),
		], true),

		new Zone(3, 3, 3, 3, 3, 3, [
			new Bin(3, 3, 3, 3, 3, 3, 
			new Product(3, "prodotto6", 3,3,3)),
		], true),

		new Zone(4, 4, 4, 4, 4, 4, [
			new Bin(4, 4, 4, 4, 4, 4, 
			new Product(4, "prodotto7", 4,4,4)),
		], true),

		new Zone(5, 5, 5, 5, 5, 5, [
			new Bin(5, 5, 5, 5, 5, 5, null),
		], true),
	];

	return (
		<aside
			className={
				"flex flex-col h-screen w-1/5 h-screen shadow-xl shrink-0 z-10 absolute bg-secondary"
			}
		>
			<div className={"flex m-5 items-end"}>
				<h1 className={"grow font-bold text-2xl"}>Zone</h1>
				<Button>
					<Image src="/icons/add.svg" width={13} height={13} alt="Add" />
				</Button>
			</div>
			<div className={"mx-5 mt-1"}>
				<Label className={"sr-only"}>Ricerca le zone</Label>
				<Input placeholder="Search..." />
			</div>
			<div id="zoneList" className={"flex flex-col mx-5 mt-4 gap-2"}>
				{zones.map((zone) => (
					<ZoneItem zone={zone} />
				))}
			</div>
		</aside>
	);
}
