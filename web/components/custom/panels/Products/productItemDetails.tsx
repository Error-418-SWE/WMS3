import { Product } from "@/model/product";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import { useElementDetails } from "@/components/providers/UI-Providers/ElementDetailsProvider";

interface ProductItemProps {
	product: Product;
}

export default function ProductItemDetails({ product }: ProductItemProps) {
	const { setElementDetails, setShowElementDetails } = useElementDetails();

	return (
		<div className={"flex flex-col h-full mx-5"}>
			<div className={"flex items-center mt-2 justify-between"}>
				<span className={"font-bold"}>{product.getName()}</span>
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
				Informazioni del prodotto
			</span>
			<div className={"grid items-center grid-cols-3 grid-rows-3 gap-y-2 mt-2"}>
				<Label>ID</Label>
				<span className={"col-span-2 dataSpan"}>{product.getId()}</span>
				<Label>Categorie</Label>
				<span className={"col-span-2"}>
					{product.getCategories().join(", ")}
				</span>
				<Label>Dimensioni</Label>
				<div className={"grid items-center grid-cols-3 col-span-2 gap-2"}>
					<span className="dataSpan">{product.getLength()}</span>
					<span className="dataSpan">{product.getWidth()}</span>
					<span className="dataSpan">{product.getHeight()}</span>
				</div>
				<Label>Peso</Label>
				<span className={"col-span-2 dataSpan"}>{product.getWeight()}</span>
			</div>

			<hr className={"my-5"} />
		</div>
	);
}
