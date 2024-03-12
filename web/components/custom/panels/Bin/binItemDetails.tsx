import { Bin } from "@/model/bin";
import ProductItemDetails from "../Products/productItemDetails";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import { useElementDetails } from "@/components/providers/UI-Providers/ElementDetailsProvider";
import { Input } from "@/components/ui/input";

interface ProductItemProps {
	bin: Bin;
}

export default function BinItemDetails({ bin }: ProductItemProps) {
	const { setElementDetails, setShowElementDetails } = useElementDetails();
	const product = bin.getProduct();

	return (
		<div className={"flex flex-col h-full mx-5"}>
			<div className={"flex items-center mt-2 justify-between"}>
				<span className={"font-bold"}>{bin.getId()}</span>
				<Button
					className={buttonVariants({ variant: "secondary" }) + " border"}
					onClick={() => {
						setShowElementDetails(false);
					}}
				>
					X
				</Button>
			</div>
			<span className={"text-sm text-muted-foreground"}>
				Informazioni del Bin e del prodotto
			</span>
			<div className={"grid items-center grid-cols-3 grid-rows-3 gap-y-2 mt-2"}>
				<Label>ID</Label>
				<span className={"col-span-2 dataSpan"}>{bin.getId()}</span>
				<Label>Dimensioni</Label>
				<div className={"grid items-center grid-cols-3 col-span-2 gap-2"}>
					<span className="dataSpan">{bin.getLength()}</span>
					<span className="dataSpan">{bin.getWidth()}</span>
					<span className="dataSpan">{bin.getHeight()}</span>
				</div>
			</div>

			<hr />

			{(product && ProductItemDetails({ product: product })) || (
				<div className={"flex flex-col items-center justify-center"}>
					<span className={"text-muted-foreground"}>
						Nessun prodotto presente
					</span>
				</div>
			)}
		</div>
	);
}