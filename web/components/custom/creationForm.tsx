"use client";
import { SetStateAction, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Schema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ManualCreationFrame } from "./manualCreationFrame";
import { SVGCreationFrame } from "./svgCreationFrame";
import { ProcessingContext } from "@/components/providers/SvgProcessingProvider";

const manualCreationSchema = z.object({
	choice: z.literal("manuale"),
	loadProdotti: z.boolean(),
	larghezza: z
		.string()
		.refine((value) => value.trim() !== "", {
			message: "Necessario inserire un valore",
		})
		.transform((value) => parseFloat(value))
		.refine((value) => !Number.isNaN(value), {
			message: "Il valore deve essere un numero",
		})
		.refine((value) => value > 0, {
			message: "Il valore deve essere maggiore di 0",
		}),
	profondita: z
		.string()
		.refine((value) => value.trim() !== "", {
			message: "Necessario inserire un valore",
		})
		.transform((value) => parseFloat(value))
		.refine((value) => !Number.isNaN(value), {
			message: "Il valore deve essere un numero",
		})
		.refine((value) => value > 0, {
			message: "Il valore deve essere maggiore di 0",
		}),
});

const svgCreationSchema = z.object({
	choice: z.literal("custom"),
	loadProdotti: z.boolean(),
	loadScaffali: z.boolean(),
	latoMaggiore: z
		.string()
		.refine((value) => value.trim() !== "", {
			message: "Necessario inserire un valore",
		})
		.transform((value) => parseFloat(value))
		.refine((value) => !Number.isNaN(value), {
			message: "Il valore deve essere un numero",
		})
		.refine((value) => value > 0, {
			message: "Il valore deve essere maggiore di 0",
		}),
	svgContent: z.string({
		required_error: "Necessario caricare un file SVG",
		invalid_type_error: "Necessario caricare un file SVG",
	}).min(1),
});

interface CreationFormProps {
	updateCardHeading: (choice: string) => void;
	titleMap: Record<string, string>;
	descriptionMap: Record<string, string>;
	setIsSubmitted: React.Dispatch<SetStateAction<boolean>>;
}

export function CreationForm({
	updateCardHeading,
	titleMap,
	descriptionMap,
	setIsSubmitted,
}: CreationFormProps) {
	const [choice, setChoice] = useState("manuale");
	const [showNext, setShowNext] = useState(false);
	const {isProcessing} = useContext(ProcessingContext);

	const formSchema = z.discriminatedUnion("choice", [
		manualCreationSchema,
		svgCreationSchema,
	]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	function createLabelForRadioGroupItem(
		idFor: string,
		title: string,
		description: string
	) {
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
						<CardDescription style={{ whiteSpace: "pre-line" }}>
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
				onSubmit={form.handleSubmit((data: z.infer<typeof formSchema>) => {
					console.log(data);
					setIsSubmitted(true);
				})}
				className={"space-y-8"}
			>
				{!showNext ? (
					<>
						<FormField
							control={form.control}
							name="choice"
							defaultValue={choice as "custom" | "manuale"}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<RadioGroup
											onValueChange={(value: SetStateAction<string>) => {
												field.onChange(value);
												setChoice(value);
											}}
											className={"flex flex-col gap-y-5"}
										>
											<FormItem>
												<FormControl>
													<RadioGroupItem
														id="manuale"
														value="manuale"
														className={"sr-only"}
													/>
												</FormControl>
												{createLabelForRadioGroupItem(
													"manuale",
													titleMap.manuale,
													descriptionMap.manuale
												)}
											</FormItem>

											<FormItem>
												<FormControl>
													<RadioGroupItem
														id="custom"
														value="custom"
														className={"sr-only"}
													/>
												</FormControl>
												{createLabelForRadioGroupItem(
													"custom",
													titleMap.custom,
													descriptionMap.custom
												)}
											</FormItem>
										</RadioGroup>
									</FormControl>
								</FormItem>
							)}
						/>
						<div className={"flex justify-end"}>
							<Button
								type="button"
								onClick={() => {
									setShowNext(true);
									updateCardHeading(choice);
								}}
							>
								Next
							</Button>
						</div>
					</>
				) : (
					<>
						{choice === "manuale" ? (
							<ManualCreationFrame form={form} />
						) : (
							<SVGCreationFrame form={form} />
						)}

						<FormField
							name="loadProdotti"
							control={form.control}
							defaultValue={false}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Checkbox onCheckedChange={field.onChange} />
									</FormControl>
									<FormLabel className={"pl-2"}>
										Importa i prodotti dal database
									</FormLabel>
								</FormItem>
							)}
						/>
						<div className={"flex justify-end"}>
							<Button
								className={buttonVariants({ variant: "secondary" }) + " mr-3"}
								type="button"
								onClick={() => {
									setShowNext(false);
									updateCardHeading("default");
									form.reset();
								}}
							>
								Indietro
							</Button>
							<Button type="submit" disabled={isProcessing}>Submit</Button>
						</div>
					</>
				)}
			</form>
		</Form>
	);
}
