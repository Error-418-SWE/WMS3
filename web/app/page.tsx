"use client";
import styles from "./page.module.css";
import { CreationForm } from "@/components/custom/creationForm";
import { SvgProcessingProvider } from "@/components/providers/SvgProcessingProvider";
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
	default: "",
	manuale:
		"Definisci le dimensioni del magazzino. \n È possibile definire solo magazzini a pianta rettangolare.",
	custom: "Carica la planimetria o parti da un magazzino predefinito.",
};

export default function Home() {
	const [title, setTitle] = useState("Definizione dell'ambiente 3D");
	const [description, setDescription] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const updateCardHeading = (value: string) => {
		setTitle(titleMap[value]);
		setDescription(descriptionMap[value]);
	};

	return (
		<main className={"h-screen flex items-center justify-center"}>
			<Card className={"max-w-sm mx-auto"}>
				<CardHeader>
					<CardTitle className={"text-4xl"}>{title}</CardTitle>
					<CardDescription
						className={"pt-3"}
						style={{ whiteSpace: "pre-line" }}
					>
						{description}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{!isSubmitted ? (
						<SvgProcessingProvider>
							<CreationForm
								updateCardHeading={updateCardHeading}
								titleMap={titleMap}
								descriptionMap={descriptionMap}
								setIsSubmitted={setIsSubmitted}
							/>
						</SvgProcessingProvider>
					) : (
						//loading component
						"Grazie per aver inviato il form!"
					)}
				</CardContent>
			</Card>
		</main>
	);
}
