import { Button, buttonVariants } from "@/components/ui/button";
import Panel from "../panel";
import RestoreItem from "./restoreItem";
import FloorDimensionsItem from "./floorDimensionsItem";

export default function ZonePanel() {
	return (
		<Panel>
			<div className={"m-5"}>
				<h1 className={"font-bold text-2xl"}>Impostazioni</h1>
				<h2 className={"font-bold my-4"}>Informazioni</h2>
				<p className={"text-muted-foreground"}>WMS3 è realizzato da Error_418 (gruppo 7) nell'ambito del corso di Ingegneria del Software (Università degli Studi di Padova, A.A. 2023/2024).</p>

				<hr className={"my-6"}/>

				<FloorDimensionsItem/>

				<hr className={"my-6"}/>

				<RestoreItem />
			</div>
		</Panel>
	);
}
