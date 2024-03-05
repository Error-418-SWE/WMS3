import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ZonePanel() {
	return (
		<aside className={"flex flex-col h-screen w-1/5 shadow-xl gap-y-2 shrink-0 z-10  absolute bg-secondary"}>
			<div className={"flex m-5 items-end"}>
				<h1 className={"grow font-bold text-2xl"}>Prodotti</h1>
				<Button
					onClick={() => {
						//TODO reload products
					}}
				>
					<Image src="/icons/reload.svg" width={13} height={13} alt="Add" />
				</Button>
			</div>
			<div className={"mx-5 mt-1"}>
				<Label className={"sr-only"}>Ricerca prodotti</Label>
				<Input
					onChange={() => {
						//TODO search products
					}}
					placeholder="Nome, descrizione..."
				/>
			</div>
			<div className={"mx-5 mt-1"}>
				<Label className={"sr-only"}>Categoria Prodotti</Label>
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Categoria Prodotti" />
					</SelectTrigger>
					<SelectContent>
                        TODO load categories
					</SelectContent>
				</Select>
			</div>
			<Tabs defaultValue="collocated" className={"mx-5 my-2"}>
				<TabsList className={"flex w-full"}>
					<TabsTrigger value="collocated" className={"grow"}>Collocati</TabsTrigger>
					<TabsTrigger value="notCollocated" className={"grow"}>Non collocati</TabsTrigger>
				</TabsList>
				<TabsContent value="collocated">
					<div id={"collocatedProducts"}>Lista collocati</div>
				</TabsContent>
				<TabsContent value="notCollocated">
					<div id={"notCollocatedProducts"}>Lista non collocati</div>
				</TabsContent>
			</Tabs>
		</aside>
	);
}
