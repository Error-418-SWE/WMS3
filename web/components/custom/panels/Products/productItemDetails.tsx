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
import { Label } from "@/components/ui/label";

interface ProductItemProps {
	product: Product;
}
const imageButtonSize = 15;

export default function ProductItemDetails({ product }: ProductItemProps) {
	return (
		<Sheet>
			<SheetTrigger>
				<Image
					src="/icons/visualize.svg"
					width={imageButtonSize}
					height={imageButtonSize}
					alt="Add"
				/>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{product.getName()}</SheetTitle>
					<SheetDescription>Informazioni del prodotto</SheetDescription>
				</SheetHeader>

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
			</SheetContent>
		</Sheet>
	);
}
