import { Bin } from "@/model/bin";
import ProductItemDetails from "../Products/productItemDetails";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import { useElementDetails } from "@/components/providers/UI-Providers/ElementDetailsProvider";
import { useWarehouseData } from "@/components/providers/Threejs/warehouseProvider";
import { X } from "lucide-react";
import ProductCombobox from "./productCombobox";
import { useEffect, useState } from "react";

interface ProductItemProps {
	bin: Bin;
}

export default function BinItemDetails({ bin }: ProductItemProps) {
	const { setElementDetails, setShowElementDetails } = useElementDetails();
	const { setSelectedBin } = useWarehouseData();
	const [product, setProduct] = useState(bin.getProduct());

	useEffect(() => {
		setProduct(bin.getProduct());
	}, [bin]);

	return (
		<>
			<div className={"flex flex-col mx-5"}>
				<div className={"flex items-center mt-2 justify-between"}>
					<span className={"font-bold"}>{bin.getId()}</span>
					<Button
						className={buttonVariants({ variant: "secondary" }) + " border"}
						onClick={() => {
							setShowElementDetails(false);
							setSelectedBin(null);
						}}
					>
						<X size={16} />
					</Button>
				</div>
				<span className={"text-sm text-muted-foreground"}>
					Informazioni del Bin e del prodotto
				</span>
				<div
					className={"grid items-center grid-cols-3 grid-rows-3 gap-y-2 mt-2"}
				>
					<Label>ID</Label>
					<span className={"col-span-2 dataSpan"}>{bin.getId()}</span>
					<Label>Dimensioni</Label>
					<div className={"grid items-center grid-cols-3 col-span-2 gap-2"}>
						<span className="dataSpan">{bin.getLength().toFixed(2)}</span>
						<span className="dataSpan">{bin.getWidth().toFixed(2)}</span>
						<span className="dataSpan">{bin.getHeight().toFixed(2)}</span>
					</div>
				</div>
			</div>
			<hr className={"mx-5"}/>
			{product && <>{ProductItemDetails({ product: product, showCloseButton : false })}</>}

			{!product ? (
				<div className={"flex flex-col mx-5 mt-6"}>
					<span className={"font-bold"}>Nessun prodotto presente</span>
					<ProductCombobox bin={bin} setProduct={setProduct} />
				</div>
			) : (
				<></>
			)}
		</>
	);
}
