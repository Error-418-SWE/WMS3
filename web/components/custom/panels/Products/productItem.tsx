import { Product } from "@/model/product";
import ProductItemDetails from "./productItemDetails";

interface ProductItemProps {
	product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
	return (
		<div
		className={"flex p-3 gap-3 items-center hover:bg-slate-300 rounded-md"}
		>
			<div className={"grow flex flex-col items-left"} >
				<span className={"grow font-bold"}>{product.getName()}</span>
				<span className={"text-slate-500 text-sm"}>{product.getId()} | {product.getCategories()}</span>
			</div>
			<ProductItemDetails product={product}/>
		</div>
	);
}
