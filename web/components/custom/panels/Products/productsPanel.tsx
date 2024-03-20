import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { useProductsData } from "@/components/providers/productsProvider";
import ProductItem from "./productItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import Panel from "@/components/custom/panels/panel";
import { SearchEngine } from "./SearchEngine/searchEngine";
import { use, useEffect, useRef, useState } from "react";
import { useZonesData } from "@/components/providers/zonesProvider";
import { Product } from "@/model/product";

export default function ProductsPanel() {

	const { products, categories } = useProductsData();
	const { zones } = useZonesData();
	const [collocatedProducts] = useState<Product[]>(zones.flatMap((zone) => zone.getBins().flatMap((bin) => bin.getProduct())).filter((product) => product !== null) as Product[]);
	const [notCollocatedProducts, setNotCollocatedProducts] = useState<Product[]>([]);
	const [collocatedToShow, setCollocatedToShow] = useState<Product[]>([]);
	const [notCollocatedToShow, setNotCollocatedToShow] = useState<Product[]>([]);

	useEffect(() => {
		setNotCollocatedProducts(products.filter((product) => collocatedProducts.filter((collocatedProduct) => collocatedProduct.getId() === product.getId()).length === 0));
	}, [collocatedProducts]);

	useEffect(() => {
		setNotCollocatedToShow([...notCollocatedProducts].sort((a, b) => a.getId() - b.getId()));
		setCollocatedToShow([...collocatedProducts]);
	}, [collocatedProducts, notCollocatedProducts]);

	const [searchType, setSearchType] = useState("id");
	const inputRef = useRef<HTMLInputElement>(null);

	function resetSearch() {
		setCollocatedToShow(collocatedProducts);
		setNotCollocatedToShow(notCollocatedProducts);
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	}

	return (
		<Panel>
			<div className={"flex m-5 items-end"}>
				<h1 className={"grow font-bold text-2xl"}>Prodotti</h1>
			</div>
			<div className={"mx-5 mt-1"}>
				<Label className={"sr-only"}>Ricerca prodotti</Label>
				<div className={"flex"}>
					<Select defaultValue={"id"} onValueChange={(event) => {
						resetSearch();
						setSearchType(event);
					}}>
						<SelectTrigger className={"w-24 rounded-tr-none rounded-br-none"}>
							<SelectValue placeholder="ID" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="id">ID</SelectItem>
							<SelectItem value="name">Nome</SelectItem>
						</SelectContent>
					</Select>
					<Input
						ref={inputRef}
						className={"rounded-tl-none rounded-bl-none"}
						onChange={(event) => {
							setCollocatedToShow(SearchEngine({ list: collocatedProducts, query: event.target.value, type: searchType }) || []);
							setNotCollocatedToShow(SearchEngine({ list: notCollocatedProducts, query: event.target.value, type: searchType }) || []);
						}}
					/>
				</div>
			</div>
			<div className={"mx-5 mt-1"}>
				<Label className={"sr-only"}>Categoria Prodotti</Label>
				<Select onValueChange={
					(value) => {
						setCollocatedToShow(SearchEngine({ list: collocatedProducts, query: value, type: "category" }) || []);
						setNotCollocatedToShow(SearchEngine({ list: notCollocatedProducts, query: value, type: "category" }) || []);
					}
				}

				>
					<SelectTrigger>
						<SelectValue placeholder="Categoria Prodotti" />
					</SelectTrigger>
					<SelectContent>
						{categories.map((category) => (
							<SelectItem key={category} value={category}>{category}</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<ScrollArea>
				<Tabs defaultValue="collocated" className={"mx-5 my-2"}>
					<TabsList className={"flex w-full"}>
						<TabsTrigger value="collocated" className={"grow"}>Collocati</TabsTrigger>
						<TabsTrigger value="notCollocated" className={"grow"}>Non collocati</TabsTrigger>
					</TabsList>
					<TabsContent value="collocated">
						<div id="productList">
							{collocatedToShow.map((product) => (
								<ProductItem key={product.getId()} product={product} />
							))}
						</div>
					</TabsContent>
					<TabsContent value="notCollocated">
						<div id={"notCollocatedProducts"}>
							{notCollocatedToShow.map((product) => (
								<ProductItem key={product.getId()} product={product} />
							))}
						</div>
					</TabsContent>
				</Tabs>
			</ScrollArea>
		</Panel>
	);
}
