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
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";

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
					<SheetTitle>{product.getId()}</SheetTitle>
					<SheetDescription>Informazioni del prodotto</SheetDescription>
				</SheetHeader>
				<div className={"grid items-center grid-cols-3 grid-rows-2 gap-y-2 mt-2"}>

					<Label>Dimensioni</Label>
					<div className={"flex col-span-2 gap-2"}>
						<Input value={product.getLength()} disabled></Input>
						<Input value={product.getWidth()} disabled></Input>
					</div>
				</div>

                <hr className={"my-5"}/>
			</SheetContent>
		</Sheet>
	);
}
