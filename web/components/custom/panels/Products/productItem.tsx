import { Product } from "@/model/product";
import ProductItemDetails from "./productItemDetails";
import { useElementDetails } from "@/components/providers/UI-Providers/ElementDetailsProvider";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";

interface ProductItemProps {
	product: Product;
}

const imageButtonSize = 15;

export default function ProductItem({ product }: ProductItemProps) {

	const {elementDetails, setElementDetails, showElementDetails, setShowElementDetails} = useElementDetails();

	return (
		<div
		className={"flex p-3 gap-3 items-center hover:bg-slate-300 rounded-md"}
		>
			<div className={"grow flex flex-col items-left"} >
				<span className={"grow font-bold"}>{product.getName()}</span>
				<span className={"text-slate-500 text-sm"}>{product.getId()} | {product.getCategories().join(" ")}</span>
			</div>
			<div className={"shrink-0"}>
			<Button
				className={buttonVariants({ variant: "secondary" })}
				onClick={() => {
					setElementDetails(<ProductItemDetails product={product} />);
					setShowElementDetails(true);
				}}
			>
				<Image
					src="/icons/visualize.svg"
					width={imageButtonSize}
					height={imageButtonSize}
					alt="Add"
				/>
			</Button>
			</div>
		</div>
	);
}
