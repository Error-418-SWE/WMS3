import { useProductsData } from "@/components/providers/productsProvider";
import { useZonesData } from "@/components/providers/zonesProvider";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Bin } from "@/model/bin";
import { Product } from "@/model/product";
import { useEffect, useState } from "react";

interface ProductComboboxProps {
	bin: Bin;
	setProduct: (product: Product) => void;
}

export default function ProductCombobox({
	bin,
	setProduct,
}: ProductComboboxProps) {
	const { products } = useProductsData();
	const { zones } = useZonesData();
	const [collocatedProducts] = useState<Product[]>(
		zones
			.flatMap((zone) => zone.getBins().flatMap((bin) => bin.getProduct()))
			.filter((product) => product !== null) as Product[]
	);
	const [notCollocatedProducts, setNotCollocatedProducts] = useState<Product[]>(
		[]
	);
	const [open, setOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	useEffect(() => {
		setNotCollocatedProducts(
			products.filter(
				(product) =>
					collocatedProducts.filter(
						(collocatedProduct) => collocatedProduct.getId() === product.getId()
					).length === 0
			)
		);
	}, [collocatedProducts]);

	function handleConfirmProduct() {
		if (selectedProduct) {
			bin.setProduct(selectedProduct);
			setProduct(selectedProduct);
		}
	}

	return (
		<div className="flex flex-col w-full">
			<p className="text-sm text-muted-foreground w-full text-left mb-3">
				Nessun prodotto presente nel bin. Seleziona un prodotto da inserire.
			</p>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" className="w-full text-ellipsis">
						{selectedProduct ? (
							<>{selectedProduct.getName()}</>
						) : (
							<>-- Seleziona --</>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0" side="right" align="start">
					<Command>
						<CommandInput placeholder="Cerca un prodotto" />
						<CommandList>
							<CommandEmpty>Nessun risultato.</CommandEmpty>
							<CommandGroup>
								{notCollocatedProducts.map((product) => (
									<CommandItem
										key={product.getId() + " | " + product.getName()}
										value={String(product.getId()) + " | " + product.getName()}
										onSelect={() => {
											setSelectedProduct(product);
											setOpen(false);
										}}
									>
										{product.getId() + " | " + product.getName()}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			<div className={"flex flex-col justify-end gap-1 mt-4"}>
        <span className={"text-sm text-muted-foreground w-full"}>Attenzione: una volta confermata la selezione di un prodotto, questo verrà trattato come elemento collocato.</span>
				<Button className={"w-[30%] ml-auto"} onClick={handleConfirmProduct}>Conferma</Button>
			</div>
		</div>
	);
}
