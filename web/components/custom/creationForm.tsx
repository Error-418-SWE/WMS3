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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function ConditionalForm() {
	const [choice, setChoice] = useState("");
	const [nextChoice, setNextChoice] = useState("");
	const [showNext, setShowNext] = useState(false);

	const form = useForm();

	const handleFirstChoice = (value: any) => {
		setChoice(value);
	};

	const handleNextChoice = (value: any) => {
		setNextChoice(value);
	};

	const handleNextClick = () => {
		setShowNext(true);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((data) => console.log(data))}
				className="space-y-8"
			>
				{!showNext ? (
					<>
						<RadioGroup onValueChange={handleFirstChoice} className={"flex flex-col gap-y-5"}>
							<RadioGroupItem id="option1" value="option1" className="hidden" />
							<Label htmlFor="option1">
								<Card className={(choice === "option1") ? "rounded-md border-2 border-primary" : "rounded-md"}>
									<CardHeader>
										<CardTitle>Planimetria rettangolare</CardTitle>
										<CardDescription>
                                        Definisci le dimensioni del magazzino.
								<br />È possibile definire solo magazzini a pianta rettangolare.
										</CardDescription>
									</CardHeader>
								</Card>
							</Label>
							<RadioGroupItem id="option2" value="option2" className="hidden" />
							<Label htmlFor="option2">
								<Card className={(choice === "option2") ? "rounded-md border-2 border-primary" : "rounded-md"}>
									<CardHeader>
										<CardTitle>Planimetria personalizzata</CardTitle>
										<CardDescription>
                                        Carica la planimetria o parti da un magazzino predefinito.
										</CardDescription>
									</CardHeader>
								</Card>
							</Label>
						</RadioGroup>

                        <div className="flex justify-end">
						<Button type="button" onClick={handleNextClick}>
							Next
						</Button>
                        </div>
					</>
				) : (
					<>
						{choice === "option1" ? (
							<p>Creazione Manuale</p>
						) : (
							<p>Creazione SVG</p>
						)}
						<Button type="submit">Submit</Button>
					</>
				)}
			</form>
		</Form>
	);
}
