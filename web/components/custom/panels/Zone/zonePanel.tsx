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
import { Zone } from "@/model/zone";
import { SearchStrategyFactory } from "@/model/SearchEngine/searchStrategyFactory";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

export default function ZonePanel() {

	const { zones } = useZonesData();
	const { setElementDetails, setShowElementDetails } = useElementDetails();
	const [zonesToShow, setZonesToShow] = useState<Zone[]>([]);

	useEffect(() => {
		setZonesToShow(zones);
	}, [zones]);

	function handleEmptySearch() {
		setZonesToShow(zones);
	}

	const searchEngine = SearchStrategyFactory.createSearchStrategy<Zone>("Zone");

	return (
		<Panel>
			<div className={"flex m-5 items-end"}>
				<h1 className={"grow font-bold text-2xl"}>Zone</h1>
				<Button onClick={() => {
					setElementDetails(<ZoneCreationFrame />);
					setShowElementDetails(true);
				}}>
					<Plus size={16} className={"mr-2"} />
					Nuova
				</Button>
			</div>
			<div className={"mx-5 mt-1"}>
				<Label className={"sr-only"}>Ricerca le zone</Label>
				<Input placeholder="Cerca per ID..." onChange={
					(event) => {
						const query = event.target.value;
						if (query === "") {
							handleEmptySearch();
						} else {
							setZonesToShow(searchEngine.search(zones, query, "id"));
						}
					}
				}/>
			</div>
			<ScrollArea id="zoneList" className={"flex flex-col mx-5 mt-6 mb-4 gap-2"}>
				{zonesToShow.length > 0 ? zonesToShow.map((zone) => (
						<ZoneItem key={zone.getId()} zone={zone} />
				)) : <div className={"text-center text-muted-foreground"}>Nessuna zona trovata</div>}
			</ScrollArea>
		</Panel>
	);
}
