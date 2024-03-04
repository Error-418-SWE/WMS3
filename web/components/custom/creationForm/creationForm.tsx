"use client";
import { SetStateAction, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { manualCreationSchema, svgCreationSchema } from "./zodScheme";

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
import { ProcessingContext } from "@/components/providers/formContextProvider";

interface CreationFormProps {
	updateCardHeading: (choice: string) => void;
	titleMap: Record<string, string>;
	descriptionMap: Record<string, string>;
	setSubmitted: (isSubmitted: boolean) => void;
	setFormData: (formData: object) => void;
}

export function CreationForm({
	updateCardHeading,
	titleMap,
	descriptionMap,
	setSubmitted,
	setFormData
}: CreationFormProps) {
	const [choice, setChoice] = useState("manuale");
	const [showNext, setShowNext] = useState(false);
	const { isProcessing } = useContext(ProcessingContext);

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
					setFormData(data);
					setSubmitted(true);
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
