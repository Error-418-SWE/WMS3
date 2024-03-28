"use client";
import { CreationForm } from "@/components/custom/creationForm/creationForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

const titleMap: Record<string, string> = {
	default: "Definizione dell'ambiente 3D",
	manuale: "Planimetria rettangolare",
	custom: "Planimetria personalizzata",
};

const descriptionMap: Record<string, string> = {
	default: "Ti diamo il benvenuto in WMS3! Scegli come definire l'ambiente 3D.",
	manuale:
		"Definisci le dimensioni di un magazzino con planimetria rettangolare.",
	custom: "Carica la planimetria in formato SVG.",
};

export default function Home() {
	const [title, setTitle] = useState("Definizione dell'ambiente 3D");
	const [description, setDescription] = useState("");

	const updateCardHeading = (value: string) => {
		setTitle(titleMap[value]);
		setDescription(descriptionMap[value]);
	};

	return (
		<main className={"h-screen flex items-center justify-center bg-slate-300"}>
			<Card className={"max-w-sm mx-auto"}>
				<CardHeader>
					<CardTitle className={"text-3xl"}>{title}</CardTitle>
					<CardDescription
						className={"pt-3"}
						style={{ whiteSpace: "pre-line" }}
					>
						{description}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<CreationForm
						updateCardHeading={updateCardHeading}
						titleMap={titleMap}
						descriptionMap={descriptionMap}
					/>
				</CardContent>
			</Card>
		</main>
	);
}
