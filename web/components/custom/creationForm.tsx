"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface CreationFormProps {
	updateTitle: (choice: string) => void;
	titleMap: Record<string, string>;
	descriptionMap: Record<string, string>;
}

export function CreationForm({ updateTitle, titleMap, descriptionMap }: CreationFormProps) {
	const [choice, setChoice] = useState("manuale");
	const [showNext, setShowNext] = useState(false);

	const form = useForm();

	const handleFirstChoice = (value: any) => {
		setChoice(value);
	};

	function createLabelForRadioGroupItem(idFor: string, title:string, description:string) {
		return (
			<Label htmlFor={idFor}>
				<Card
					className={
						choice === idFor
							? "rounded-md border-2 border-primary"
							: "rounded-md"
					}
				>
					<CardHeader>
						<CardTitle>{title}</CardTitle>
						<CardDescription style={{ whiteSpace: 'pre-line' }}>
							{description}
						</CardDescription>
					</CardHeader>
				</Card>
			</Label>
		); 
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((data) => console.log(data))}
				className={"space-y-8"}
			>
				{!showNext ? (
					<>
					<FormItem>
						<RadioGroup onValueChange={handleFirstChoice} className={"flex flex-col gap-y-5"}>
							<RadioGroupItem id="manuale" value="manuale" className={"sr-only"} />
							{createLabelForRadioGroupItem("manuale", titleMap["manuale"], descriptionMap["manuale"])}
							
							<RadioGroupItem id="custom" value="custom" className={"sr-only"} />
							{createLabelForRadioGroupItem("custom", titleMap["custom"], descriptionMap["custom"])}
						</RadioGroup>
					</FormItem>
						<div className={"flex justify-end"}>
							<Button
								type="button"
								onClick={() => {
									setShowNext(true);
									updateTitle(choice);
								}}
							>
								Next
							</Button>
						</div>
					</>
				) : (
					<>
						{choice === "manuale" ? (
							<p>Creazione Manuale</p>
						) : (
							<p>Creazione SVG</p>
						)}
						<div className={"flex justify-end"}>
							<Button
								className={buttonVariants({ variant: "secondary" }) + " mr-3"}
								type="button"
								onClick={() => {
									setShowNext(false);
									updateTitle("default");
								}}
							>
								Indietro
							</Button>
							<Button type="submit">Submit</Button>
						</div>
					</>
				)}
			</form>
		</Form>
	);
}
