import { Button, buttonVariants } from "@/components/ui/button";
import Panel from "../panel";
import RestoreItem from "./restoreItem";
export default function ZonePanel() {
	return (
		<Panel>
			<div className={"m-5"}>
				<h1 className={"font-bold text-2xl"}>Impostazioni</h1>
				<h2 className={"font-bold mt-4"}>Informazioni</h2>
				<p>Versione WMS3</p>

				<RestoreItem />
			</div>
		</Panel>
	);
}
