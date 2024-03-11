import { Product } from "@/model/product";
import Image from "next/image";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import Panel from "../panel";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import { useProductsData } from "@/components/providers/productsProvider";
import { useElementDetails } from "@/components/providers/UI-Providers/ElementDetailsProvider";

interface ProductItemProps {
	product: Product;
}
const imageButtonSize = 15;

export default function ProductItemDetails({ product }: ProductItemProps) {

	const { setElementDetails, setShowElementDetails } = useElementDetails();

	return (
		// <Sheet>
		// 	<SheetTrigger>
		// 		<Image
		// 			src="/icons/visualize.svg"
		// 			width={imageButtonSize}
		// 			height={imageButtonSize}
		// 			alt="Add"
		// 		/>
		// 	</SheetTrigger>
		// 	<SheetContent>
		// 		<SheetHeader>
		// 			<SheetTitle>{product.getName()}</SheetTitle>
		// 			<SheetDescription>Informazioni del prodotto</SheetDescription>
		// 		</SheetHeader>

		// 		<div className={"grid items-center grid-cols-3 grid-rows-3 gap-y-2 mt-2"}>
		// 			<Label>ID</Label><span className={"col-span-2"}>{product.getId()}</span>
		// 			<Label>Categorie</Label><span className={"col-span-2"}>Categorie</span>
		// 			<Label>Dimensioni</Label>
		// 			<span>{product.getLength()}</span>
		// 			<span>{product.getWidth()}</span>
		// 			<Label>Peso</Label>
		// 			<span className={"col-span-2"}>{product.getWeight()}</span>
		// 		</div>

        //         <hr className={"my-5"}/>
		// 	</SheetContent>
		// </Sheet>

		<div className={"flex flex-col h-full mx-5"}>
			<div className={"flex items-center mt-2 justify-between"}>
			  <span className={"font-bold"}>{product.getId()}</span>
			  <Button className={buttonVariants({variant : "secondary"}) + " border"} onClick={() => {
				setShowElementDetails(false);
			  }}>
				X
			  </Button>
			</div>
			<span className={"text-sm text-muted-foreground"}>Informazioni del prodotto</span>
			<div className={"grid items-center grid-cols-3 grid-rows-2 gap-y-2 mt-2"}>
				<div className={"grid items-center grid-cols-3 grid-rows-3 gap-y-2 mt-2"}>
		 			<Label>ID</Label><span className={"col-span-2"}>{product.getId()}</span>
		 			<Label>Categorie</Label><span className={"col-span-2"}>Categorie</span>
		 			<Label>Dimensioni</Label>
		 			<span>{product.getLength()}</span>
		 			<span>{product.getWidth()}</span>
		 			<Label>Peso</Label>
		 			<span className={"col-span-2"}>{product.getWeight()}</span>
		 		</div>
			</div>

			<hr className={"my-5"}/>
	  	</div>
	);
}
