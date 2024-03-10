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
import { SetStateAction, useEffect, useState } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { UseFormReturn, get, useForm } from "react-hook-form";
import { Bin } from "@/model/bin";
import LevelItem from "./levelItem";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { z } from "zod";
import { customColumns, equalColumns } from "./zoneZodSchemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useZonesData } from "@/components/providers/zonesProvider";

function checkIfEqualColumns(zone: Zone) {
	const firstLevelBins = zone.getColumns()[0];

	for (let i = 1; i < firstLevelBins.length; i++) {
		if (firstLevelBins[i].getWidth() != firstLevelBins[i - 1].getWidth()) {
			return false;
		}
	}

	return true;
}

function columnCreation(form: any, zone?: Zone) {
	const [customColumns, setCustomColumns] = useState(false);

	return (
		<>
			<FormField
				control={form.control}
				name="columnsType"
				defaultValue={
					zone ? (checkIfEqualColumns(zone) ? "equal" : "custom") : "equal"
				}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<RadioGroup
								defaultValue={
									zone
										? checkIfEqualColumns(zone)
											? "equal"
											: "custom"
										: "equal"
								}
								onValueChange={(value: SetStateAction<string>) => {
									field.onChange(value);
									setCustomColumns(value == "custom" ? true : false);
								}}
							>
								<div className={"flex items-center space-x-2"}>
									<RadioGroupItem value="equal" id="equal" />
									<div className={"flex items-center w-full justify-between"}>
										<FormField
											name="nColumns"
											control={form.control}
											defaultValue={
												zone
													? !customColumns
														? zone.getColumns()[0].length
														: "1"
													: "1"
											}
											render={({ field }) => (
												<>
													<FormItem className={"flex"}>
														<div className={"grid grid-cols-3 items-center"}>
															<FormLabel className={"col-span-2"}>
																# colonne uguali
															</FormLabel>
															<FormControl>
																<Input
																	className={"w-content"}
																	placeholder="N°"
																	{...field}
																	type="number"
																	min={1}
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
									<RadioGroupItem value="custom" id="custom" />
									<FormField
										name="customColumns"
										control={form.control}
										defaultValue=""
										render={({ field }) => (
											<>
												<FormItem className={"flex flex-col"}>
													<FormLabel className={"col-span-2"}>
														Colonne personalizzate
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															className={"w-content"}
															placeholder=" x x x..."
															defaultValue={
																zone
																	? zone.getColumns()[0]
																			.map((bin) => bin.getWidth())
																			.join(" ")
																	: ""
															}
															disabled={!customColumns}
															onChange={(e) => {
																field.onChange(e);
																if (e.target.value.trim().length == 0) {
																	form.setValue("width", 1);
																} else {
																	form.setValue(
																		"width",
																		e.target.value
																			.trim()
																			.split(" ")
																			.reduce(
																				(acc, val) => acc + parseFloat(val),
																				0
																			)
																	);
																}
															}}
														/>
													</FormControl>
													<FormMessage />
													<span className={"text-sm text-muted-foreground"}>
														Inserisci la larghezza delle colonne separando i
														valori con uno spazio.
													</span>
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
	const {addZone, getZoneById} = useZonesData();
	
	const formSchema = z.discriminatedUnion("columnsType", [
		equalColumns,
		customColumns,
	]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		shouldUnregister: true,
	});

	const { setShowElementDetails } = useElementDetails();
	const [zoneHeight, setZoneHeight] = useState(zone?.getHeight() || 1);

	const [levels, setLevels] = useState(
		zone
			?.getColumns()[0]
			.map((bin) => ({ id: Math.random(), height: bin.getHeight() || 0 })) || [
			{ id: Math.random(), height: 1 },
		]
	);

	useEffect(() => {
		console.log("USE EFFECT " + levels);
		const totalHeight = levels.reduce((acc, level) => acc + level.height, 0);
		setZoneHeight(totalHeight);
		form.setValue("height", totalHeight);
	}, [levels]);

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

						if(getZoneById(parseInt(form.getValues("id") + "")) != undefined){
							alert("ID già esistente");
							return;
						}

						//create bins
						const columns = form.getValues("columnsType") == "equal" ? form.getValues("nColumns") : form.getValues("customColumns").split(" ").length;
						const rows = levels.length;

						//bins as a single array
						var bins = [];
						for (let i = 0; i < rows; i++) {
							for (let j = 0; j < columns; j++) {
								bins.push(new Bin(
									form.getValues("id") + "_" + (i+1) + "_" + (j+1),
									i+1,
									j+1,
									levels[i].height,
									parseFloat(form.getValues("length") + ""),
									form.getValues("columnsType") == "equal"
										? zoneHeight / rows
										: parseFloat(form.getValues("customColumns").split(" ")[j]),
									null
								));
							}
						}

						const zone = new Zone(
							form.getValues("id"),
							0,
							0,
							form.getValues("height"),
							form.getValues("length"),
							form.getValues("width"),
							bins, 
							form.getValues("direction") == "NS"
						);

						addZone(zone);

						console.log(form.getValues());
						setShowElementDetails(false);
					})}
					className="space-y-8"
				>
					<div className={"flex flex-col gap-y-4 mt-2"}>
						<FormField
							control={form.control}
							name="id"
							render={({ field }) => (
								<FormItem className={"grid items-center grid-cols-3"}>
									<FormLabel>ID</FormLabel>
									<FormControl>
										<Input
											className={"col-span-2"}
											{...field}
											placeholder="ID"
											defaultValue={zone ? zone.getId() : ""}
											disabled={zone ? true : false}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="direction"
							defaultValue={zone ? (zone.getOrientation() ? "NS" : "EW") : "NS"}
							render={({ field }) => (
								<FormItem className={"grid items-center grid-cols-3"}>
									<FormLabel>Direzione</FormLabel>

									<Select
										onValueChange={field.onChange}
										defaultValue={
											zone ? (zone.getOrientation() ? "NS" : "EW") : "NS"
										}
									>
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
									defaultValue={zone ? zone.getLength() : 1}
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													placeholder="Depth"
													type="number"
													min={1}
													step={0.1}
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
									defaultValue={zone ? zone.getWidth() : 1}
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													type="number"
													min={1}
													step={0.1}
													placeholder="Length"
													disabled={form.getValues("columnsType") != "equal"}
												></Input>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="height"
									defaultValue={zone ? zone.getHeight() : 1}
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													{...field}
													type="number"
													min={1}
													placeholder="Height"
													disabled
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

						<hr />

						<div className={"flex justify-between"}>
							<span className={"font-bold"}>
								{zone?.getColumns()[0].length || "0"}{" "}
								{zone?.getColumns()[0].length != 1 ? "Livelli" : "Livello"}
							</span>
							<Button
								type="button"
								className={
									buttonVariants({ variant: "secondary" }) + " border-2"
								}
								onClick={() => {
									setLevels([...levels, { id: Math.random(), height: 1 }]);
								}}
							>
								+
							</Button>
						</div>

						<div
							className={
								"h-80 flex flex-col gap-2 flex-grow overflow-y-auto mb-10"
							}
						>
							{levels.map((level, index) => (
								<LevelItem
									key={level.id}
									form={form}
									level={level}
									levels={levels}
									setLevels={setLevels}
									levelOrder={index}
								/>
							))}
						</div>

						<Button type="submit">Crea Zona</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
