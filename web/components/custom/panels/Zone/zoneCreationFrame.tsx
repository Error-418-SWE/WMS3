import { Button, buttonVariants } from "@/components/ui/button";
import { Zone } from "@/model/zone";
import { useElementDetails } from "@/components/providers/UI-Providers/ElementDetailsProvider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SetStateAction, useState } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Bin } from "@/model/bin";

function checkIfEqualColumns(zone: Zone) {
	const firstLevelBins = zone.getLevels()[0];

	for (let i = 1; i < firstLevelBins.length; i++) {
		if (firstLevelBins[i].getWidth() != firstLevelBins[i - 1].getWidth()) {
			return false;
		}
	}

	return true;
}

function columnCreation(form: any, zone?: Zone) {

	const sameColumns = zone ? checkIfEqualColumns(zone) : false;
	const [customColumns, setCustomColumns] = useState(false);

	return (
		<>
			<FormField
				control={form.control}
				name="columnsType"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<RadioGroup
								defaultValue={zone ? (checkIfEqualColumns(zone) ? "equal" : "custom") : "equal"}
								onValueChange={(value: SetStateAction<string>) => {
									field.onChange(value);
									setCustomColumns(value == "custom" ? true : false);
								}}
							>
								<div className={"flex items-center space-x-2"}>
									<RadioGroupItem value="equal" id="equal" />
									<div className={"flex items-center w-full justify-between"}>
										<FormField
											name="larghezza"
											control={form.control}
											defaultValue=""
											render={({ field }) => (
												<>
													<FormItem
														className={"flex"}
													>
														<div className={"grid grid-cols-3 items-center"}>
														<FormLabel className={"col-span-2"}># colonne uguali</FormLabel>
															<FormControl>
																<Input
																	className={"w-content"}
																	placeholder="N°"
																	{...field}
																	type="number"
																	min={1}
																	value = {zone && !customColumns ? zone.getLevels()[0].length : ""}
																	disabled={customColumns}
																/>
															</FormControl>
															<FormMessage />
														</div>
													</FormItem>
												</>
											)}
										/>
									</div>
								</div>
								<div className={"flex items-start space-x-2"}>
									<RadioGroupItem value="custom" id="customCols" />
										<FormField
											name="customCols"
											control={form.control}
											defaultValue=""
											render={({ field }) => (
												<>
													<FormItem
														className={"flex flex-col"}
													>
														<FormLabel className={"col-span-2"}>Colonne personalizzate</FormLabel>
															<FormControl>
																<Input
																	className={"w-content"}
																	placeholder=" x x x..."
																	{...field}
																	value={zone ? zone.getLevels()[0].map((bin) => bin.getWidth()).join(" ") : ""}
																	disabled={!customColumns}
																/>
															</FormControl>
															<FormMessage />
															<span className={"text-sm text-muted-foreground"}>Inserisci la larghezza delle colonne separando i valori con uno spazio.</span>
													</FormItem>
												</>
											)}
										/>
									</div>
							</RadioGroup>
						</FormControl>
					</FormItem>
				)}
			/>
		</>
	);
}

export default function ZoneCreationFrame({ zone }: { zone?: Zone }) {
	const form = useForm();
	const { setShowElementDetails } = useElementDetails();

/*
	const bin = new Bin(
		1,
		1,
		1,
		1,
		1,
		1,
		null
	);
	
	zone = new Zone(
		1,
		1,
		1,
		3,
		2,
		6,
		[
			new Bin(
				2,
				1,
				3,
				2,
				2,
				3,
				null
			),
			new Bin(
				1,
				1,
				2,
				2,
				2,
				2,
				null
			),
			new Bin(
				1,
				1,
				3,
				2,
				2,
				2,
				null
			)
			
		],
		false
	);

	console.log(checkIfEqualColumns(zone));*/


	return (
		<div className={"flex flex-col h-full mx-5"}>
			<div className={"flex items-center mt-2 justify-between"}>
				<h1 className={"grow font-bold text-2xl"}>Nuova Zona</h1>
				<Button
					className={buttonVariants({ variant: "secondary" })}
					onClick={() => {
						setShowElementDetails(false);
					}}
				>
					X
				</Button>
			</div>
			<span className={"text-sm text-muted-foreground"}>
				Definisci le proprietà della zona
			</span>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(() => {
						//TODO sarà da modificare e aggiungere lo scaffale al magazzino
						console.log(form.getValues());
					})}
					className="space-y-8"
				>
					<div className={"flex flex-col gap-y-4 mt-2"}>
						<FormField
							control={form.control}
							name="direction"
							defaultValue={zone ? (zone.getOrientation() ? "NS" : "EW") : "NS"}
							render={({ field }) => (
								<FormItem className={"grid items-center grid-cols-3"}>
									<FormLabel>Direzione</FormLabel>

									<Select onValueChange={field.onChange} defaultValue={zone ? (zone.getOrientation() ? "NS" : "EW") : "NS"}>
										<FormControl>
											<SelectTrigger className={"col-span-2"}>
												<SelectValue placeholder="Direzione" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="NS">NS</SelectItem>
											<SelectItem value="EW">EW</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className={"grid items-center grid-cols-3"}>
							<Label>Dimensioni</Label>
							<div className={"flex col-span-2 gap-x-2"}>
								<FormField
									control={form.control}
									name="length"
									defaultValue={zone ? zone.getLength() : "0"}
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													value={zone?.getLength()}
													placeholder="Depth"
													disabled={zone ? true : false}
												></Input>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="width"
									defaultValue={zone ? zone.getWidth() : "0"}
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													value={zone?.getWidth()}
													placeholder="Length"
													disabled={zone ? true : false}
												></Input>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="height"
									defaultValue={zone ? zone.getHeight() : "0"}
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													value={zone?.getHeight()}
													placeholder="Height"
													disabled={zone ? true : false}
												></Input>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className={"grid items-center grid-cols-3"}>
							<Label>Colonne</Label>
							<div className={"col-span-2"}>{columnCreation(form, zone)}</div>
						</div>

						<hr/>


						<Button type="submit">Crea Zona</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
