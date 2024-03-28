import { useFloorData } from "@/components/providers/floorProvider";
import { useOrdersData } from "@/components/providers/ordersProvider";
import { useProductsData } from "@/components/providers/productsProvider";
import { useZonesData } from "@/components/providers/zonesProvider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogDescription  } from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function RestoreItem() {

	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const { refresh:  refreshZones } = useZonesData();
	const { refresh:  refreshProducts } = useProductsData();
	const { refresh:  refreshOrders } = useOrdersData();
	const { floorRefresher, setFloorRefresher } = useFloorData();


	function handleRisincronizza() {
		setIsOpen(false);
		refreshZones();
		refreshProducts();
		refreshOrders();
		setFloorRefresher( floorRefresher + 1);
	}

	function handleReimposta() {
		router.push("/");
	}

	return (
		<div>
			<h2 className={"font-bold my-4"}>Demo</h2>
			<p className={"text-muted-foreground"}>
				Reimposta la demo di WMS3.
				<br />
				Non è possibile annullare l&apos;operazione.
			</p>

			<div className={"flex justify-end mt-4 gap-x-2"}>
				<Dialog>
					<DialogTrigger className={buttonVariants({ variant: "outline" })}>
						Risincronizza
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Risincronizza dati</DialogTitle>
							<DialogDescription>
								Questa azione non può essere annullata. I dati saranno riportati ai loro valori iniziali: le zone, i prodotti, la lista movimenti e la planimetria saranno ripristinati al loro stato inziale.
							</DialogDescription>
						</DialogHeader>
						<Button onClick={handleRisincronizza} className={buttonVariants({ variant: "destructive" }) + " w-min ml-auto"}>Risincronizza</Button>
					</DialogContent>
				</Dialog>
				<Dialog>
					<DialogTrigger className={buttonVariants({ variant: "destructive" })}>
						Reimposta
					</DialogTrigger>

					<DialogContent>
						<DialogHeader>
							<DialogTitle>Reimposta l&apos;ambiente</DialogTitle>
							<DialogDescription>
								Questa azione non può essere annullata. Sarai reindirizzato alla pagina di configurazione di un nuovo &apos;ambiente. Tutti i dati andranno perduti.
							</DialogDescription>
						</DialogHeader>
						<Button onClick={handleReimposta} className={buttonVariants({ variant: "destructive" }) + " w-min ml-auto"}>Reimposta</Button>
					</DialogContent>
				</Dialog>
			</div>
		</div>);
}