import { useBinsData } from "@/components/providers/binsProvider";
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
	const { refresh:  refreshBins } = useBinsData();
	const { refresh:  refreshProducts } = useProductsData();
	const { refresh:  refreshOrders } = useOrdersData();


	function handleRisincronizza() {
		setIsOpen(false);
		refreshZones();
		refreshBins();
		refreshProducts();
		refreshOrders();
	}

	function handleReimposta() {
		router.push("/");
	}

	return (
		<div>
			<h2 className={"font-bold mt-4"}>Demo</h2>
			<p>Reimposta la demo di WMS3. <br /> Non è possibile annullare l&apos;operazione</p>

			<div className={"flex justify-end gap-x-2"}>
				<Dialog open={isOpen}>
					<DialogTrigger className={buttonVariants({ variant: "secondary" }) + " w-min border-2"} onClick={
						() => {
							setIsOpen(true);
						}
					}>
						Risincronizza
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Risincronizza dati</DialogTitle>
							<DialogDescription>
								Questa azione non può essere annullata. I dati saranno riportati ai loro valori iniziali: le zone, i prodotti, la lista movimenti e la planimetria verranno ripristinati al loro stato inziale.
							</DialogDescription>
						</DialogHeader>
						<Button onClick={handleRisincronizza} className={buttonVariants({ variant: "destructive" }) + " w-min ml-auto"}>Risincronizza</Button>
					</DialogContent>
				</Dialog>
				<Dialog>
					<DialogTrigger className={buttonVariants({ variant: "destructive" }) + " w-min"}>
						Reimposta
					</DialogTrigger>

					<DialogContent>
						<DialogHeader>
							<DialogTitle>Reimposta l&apos;ambiente</DialogTitle>
							<DialogDescription>
								Questa azione non può essere annullata. Abbandonerai la pagina tornando alla definizione dell&apos;ambiente. Tutti i dati verranno persi.
							</DialogDescription>
						</DialogHeader>
						<Button onClick={handleReimposta} className={buttonVariants({ variant: "destructive" }) + " w-min ml-auto"}>Reimposta</Button>
					</DialogContent>
				</Dialog>
			</div>
		</div>);
}