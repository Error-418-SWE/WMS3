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
			  <Button className={buttonVariants({variant : "secondary"}) + " border"} onClick={() => {
				setShowElementDetails(false);
			  }}>
				X
			  </Button>
			</div>
			<span className={"text-sm text-muted-foreground"}>Informazioni del prodotto</span>
			<div className={"grid items-center grid-cols-3 grid-rows-3 gap-y-2 mt-2"}>
		 		<Label>ID</Label><span className={"col-span-2"}>{product.getId()}</span>
		 		<Label>Categorie</Label><span className={"col-span-2"}>Categorie</span>
		 		<Label>Dimensioni</Label>
		 		<span>{product.getLength()}</span>
		 		<span>{product.getWidth()}</span>
		 		<Label>Peso</Label>
		 		<span className={"col-span-2"}>{product.getWeight()}</span>
			</div>

			<hr className={"my-5"}/>
	  	</div>
	);
}
