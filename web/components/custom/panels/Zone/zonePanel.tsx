import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import ZoneItem from "@/components/custom/panels/Zone/zoneItem";
import { useZonesData } from "@/components/providers/zonesProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import Panel from "@/components/custom/panels/panel";
import { useElementDetails } from "@/components/providers/UI-Providers/ElementDetailsProvider";
import ZoneCreationFrame from "@/components/custom/panels/Zone/zoneCreationFrame";
import { set } from "zod";

export default function ZonePanel() {

	const { zones } = useZonesData();
	const { setElementDetails, setShowElementDetails } = useElementDetails();

	return (
		<Panel>
			<div className={"flex m-5 items-end"}>
				<h1 className={"grow font-bold text-2xl"}>Zone</h1>
				<Button onClick={() => {
					setElementDetails(<ZoneCreationFrame />);
					setShowElementDetails(true);
				}}>
					<Image src="/icons/add.svg" width={16} height={16} alt="Crea zona" />
				</Button>
			</div>
			<div className={"mx-5 mt-1"}>
				<Label className={"sr-only"}>Ricerca le zone</Label>
				<Input placeholder="Cerca per ID..." />
			</div>
			<ScrollArea id="zoneList" className={"flex flex-col mx-5 mt-6 mb-4 gap-2"}>
				{zones.length > 0 ? zones.map((zone) => (
						<ZoneItem key={zone.getId()} zone={zone} />
				)) : <div className={"text-center text-muted-foreground"}>Nessuna zona trovata</div>}
			</ScrollArea>
		</Panel>
	);
}
