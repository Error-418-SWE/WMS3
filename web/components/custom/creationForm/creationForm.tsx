"use client";
import { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { manualCreationSchema, svgCreationSchema } from "./zodScheme";
import { LoaderCircle } from "lucide-react";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ManualCreationFrame } from "./manualCreationFrame";
import { SVGCreationFrame } from "./svgCreationFrame";
import { useRouter } from "next/navigation";
import { useProcessingContext } from "@/components/providers/UI-Providers/formContextProvider";

interface CreationFormProps {
	updateCardHeading: (choice: string) => void;
	titleMap: Record<string, string>;
	descriptionMap: Record<string, string>;
}

export function CreationForm({
	updateCardHeading,
	titleMap,
	descriptionMap,
}: CreationFormProps) {
	const [choice, setChoice] = useState("manuale");
	const [showNext, setShowNext] = useState(false);
	const { isProcessing } = useProcessingContext();

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
		description: string,
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

	const router = useRouter();

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((data: z.infer<typeof formSchema>) => {
					const dataAsString = Object.fromEntries(
						Object.entries(data).map(([key, value]) => [key, String(value)]),
					);

					router.push(
						"/main" + "?" + new URLSearchParams(dataAsString).toString(),
					);
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
													descriptionMap.manuale,
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
													descriptionMap.custom,
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
								Avanti
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
							defaultValue={true}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
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
							<Button type="submit" disabled={isProcessing}>
								{isProcessing && (
									<LoaderCircle size={16} className="mr-2 animate-spin" />
								)}
								Conferma
							</Button>
						</div>
					</>
				)}
			</form>
		</Form>
	);
}
