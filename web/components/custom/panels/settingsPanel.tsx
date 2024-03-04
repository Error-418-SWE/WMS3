import { Button, buttonVariants } from "@/components/ui/button";
export default function ZonePanel() {
	return (
		<aside className={"w-1/5 h-screen shadow-xl shrink-0 z-10"}>
			<div className={"m-5"}>
				<h1 className={"font-bold text-2xl"}>Impostazioni</h1>
				<h2 className={"font-bold mt-4"}>Informazioni</h2>
				<p>Versione WMS3</p>
                <h2 className={"font-bold mt-4"}>Demo</h2>
                <p>Reimposta la demo di WMS3. <br/> Non è possibile annullare l'operazione</p>
                <Button className={buttonVariants({ variant: "destructive" }) + " mt-2 float-right"}>Reimposta</Button>
            </div>
		</aside>
	);
}
