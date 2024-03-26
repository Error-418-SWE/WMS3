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
import { SetStateAction, use, useEffect, useState } from "react";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { UseFormReturn, get, useForm } from "react-hook-form";
import { Bin } from "@/model/bin";
import LevelItem from "./levelItem";
import { z } from "zod";
import { customColumns, equalColumns } from "./zoneZodSchemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useZonesData } from "@/components/providers/zonesProvider";
import { ListPlus, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

function checkIfEqualColumns(zone: Zone) {
	const firstLevelBins = zone.getLevels()[0];

	if (firstLevelBins.length <= 1) {
		return true;
	}

	for (let i = 1; i < firstLevelBins.length; i++) {
		if (firstLevelBins[i].getWidth() != firstLevelBins[i - 1].getWidth()) {
			return false;
		}
	}

	return true;
}

function ColumnCreation(form: any, zone?: Zone) {
	const [customColumns, setCustomColumns] = useState(
		zone ? !checkIfEqualColumns(zone) : false
	);
	console.log(
		zone
			?.getLevels()[0]
			.map((bin) => bin.getWidth().toFixed(2))
			.join(" ")
	);
	console.log(zone?.getLevels()[0]);

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
								className={"gap-4"}
								defaultValue={
									zone ? (!customColumns ? "equal" : "custom") : "equal"
								}
								onValueChange={(value: SetStateAction<string>) => {
									field.onChange(value);
									setCustomColumns(value == "custom" ? true : false);
								}}
							>
								<div className={"flex gap-x-2 content-center"}>
									<RadioGroupItem value="equal" id="equal" className={"mt-1"}/>
									<FormField
										name="nColumns"
										control={form.control}
										defaultValue={
											zone
												? !customColumns
												? zone.getLevels()[0].length
												: "1"
												: "1"
											}
											render={({ field }) => (
												<>
												<FormItem>
													<FormLabel>
														Dividi in parti uguali
													</FormLabel>
													<FormControl>
														<Input
															placeholder="N°"
															{...field}
															type="number"
															min={zone ? zone.getMaxUsedColumn() : 1}
															disabled={customColumns}
															onChange={(e) => {
																form.clearErrors("customColumns");
																if (zone) {
																	if (
																		parseInt(e.target.value) >=
																		zone.getMaxUsedColumn()
																		) {
																			field.onChange(e);
																			form.clearErrors("nColumns");
																		} else {
																		console.log(parseInt(e.target.value));
																		console.log(zone.getMaxUsedColumn());
																		form.setError("nColumns", {
																			type: "manual",
																			message:
																			"La zona necessita di almeno " +
																			zone.getMaxUsedColumn() +
																			" colonne",
																		});
																	}
																} else {
																	field.onChange(e);
																}
															}}
														/>
													</FormControl>
													<FormMessage />
													<FormDescription>
														Indica il numero di colonne in cui dividere la zona.
													</FormDescription>
												</FormItem>
											</>
										)}
									/>
								</div>

								<div className={"flex gap-x-2 content-center"}>
									<RadioGroupItem value="custom" id="custom" className={"mt-1"}/>
									<FormField
										name="customColumns"
										control={form.control}
										defaultValue={
											zone
												? zone
													.getLevels()[0]
													.map((bin) => bin.getWidth().toFixed(2))
													.join(" ")
												: ""
										}
										render={({ field }) => (
											<>
												<FormItem>
													<FormLabel>
														Colonne personalizzate
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															placeholder="x x x..."
															disabled={!customColumns}
															onChange={(e) => {
																form.clearErrors("nColumns");
																if (
																	zone &&
																	e.target.value.trim().split(" ").length <
																	zone.getMaxUsedColumn()
																) {
																	form.setError("customColumns", {
																		type: "manual",
																		message:
																			"Inserire almeno " +
																			zone.getMaxUsedColumn() +
																			" colonne",
																	});
																} else {
																	form.clearErrors("customColumns");
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
																}
															}}
														/>
													</FormControl>
													<FormMessage />
													<FormDescription>
														Inserisci la larghezza delle colonne separando i
														valori con uno spazio.
													</FormDescription>
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

export default function ZoneCreationFrame({
	zoneToModify,
}: {
	zoneToModify?: Zone;
}) {
	const { addZone, modifyZoneById, getZoneById } = useZonesData();
	const { setShowElementDetails } = useElementDetails();
	const [zone, setZone] = useState(zoneToModify);
	const [zoneHeight, setZoneHeight] = useState(zone?.getHeight() || 1);

	useEffect(() => {
		setZone(zoneToModify);
	}, [zoneToModify]);

	useEffect(() => {
		//Update form fields when zone changes
		form.setValue("id", zone ? zone.getId() : 0);
		form.setValue(
			"direction",
			zone ? (zone.getOrientation() ? "NS" : "EW") : "NS"
		);
		form.setValue("length", zone ?	parseFloat(zone.getLength().toFixed(2)) : 1);
		form.setValue("width", zone ? 	parseFloat(zone.getWidth().toFixed(2)) : 1);
		form.setValue("height", zone ? 	parseFloat(zone.getHeight().toFixed(2)) : 1);
		form.setValue(
			"columnsType",
			zone ? (checkIfEqualColumns(zone) ? "equal" : "custom") : "equal"
		);
		form.setValue(
			"customColumns",
			zone
				? zone
					.getLevels()[0]
					.map((bin) => bin.getWidth().toFixed(2))
					.join(" ")
				: ""
		);
		form.setValue("nColumns", zone ? zone.getLevels()[0].length : 1);
		setLevels(
			zone
				?.getColumns()[0]
				.map((bin) => ({
					id: Math.random(),
					height: parseFloat(bin.getHeight().toFixed(2)) || 0,
				})) || [{ id: Math.random(), height: 1 }]
		);
	}, [zone]);

	const formSchema = z.discriminatedUnion("columnsType", [
		equalColumns,
		customColumns,
	]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		shouldUnregister: true,
	});

	const [levels, setLevels] = useState(
		zone
			?.getColumns()[0]
			.map((bin) => ({ id: Math.random(), height: bin.getHeight() || 0 })) || [
			{ id: Math.random(), height: 1 },
		]
	);

	useEffect(() => {
		const totalHeight = levels.reduce((acc, level) => acc + level.height, 0);
		setZoneHeight(totalHeight);
		form.setValue("height", totalHeight);
	}, [zone, levels]);

	function handleSubmit() {
		if (
			!zone &&
			getZoneById(parseInt(form.getValues("id") + "")) != undefined
		) {
			alert("ID già esistente");
			return;
		}

		//create bins
		const columns =
			form.getValues("columnsType") == "equal"
				? form.getValues("nColumns")
				: form.getValues("customColumns").split(" ").length;
		const rows = levels.length;

		//bins as a single array
		var bins = [];
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				bins.push(
					new Bin(
						form.getValues("id") + "_" + i + "_" + j,
						i,
						j,
						levels[i].height,
						form.getValues("length"),
						form.getValues("columnsType") == "equal"
							? (form.getValues("width") / form.getValues("nColumns"))
							: parseFloat(form.getValues("customColumns").split(" ")[j]),
						null
					)
				);
			}
		}

		if (zone) {
			for (let i = 0; i < bins.length; i++) {
				for (let j = 0; j < zone.getBins().length; j++) {
					if (
						bins[i].getColumn() == zone.getBins()[j].getColumn() &&
						bins[i].getLevel() == zone.getBins()[j].getLevel()
					) {
						bins[i].setId(zone.getBins()[j].getId());
						bins[i].setProduct(zone.getBins()[j].getProduct());
					}
				}
			}
		}

		const newZone = new Zone(
			parseInt(form.getValues("id") + ""),
			0,
			0,
			form.getValues("height"),
			form.getValues("length"),
			form.getValues("width"),
			bins,
			form.getValues("direction") == "NS"
		);

		if (!zone) {
			addZone(newZone);
		} else {
			console.log("MODIFY ZONE");
			modifyZoneById(parseInt(form.getValues("id") + ""), newZone);
		}

		setShowElementDetails(false);
	}

	return (
		<div className={"flex flex-col h-full mx-5 my-2"}>
			<div className={"flex items-center justify-between mb-4"}>
				<div>
					<h1 className={"grow font-bold text-2xl"}>
						{zone ? "Zona: " + zone.getId() : "Nuova zona"}
					</h1>
					<span className={"text-sm text-muted-foreground"}>
						{zone ? "Modifica" : "Definisci"} le proprietà della zona
					</span>
				</div>
				<Button
					className={buttonVariants({ variant: "secondary" })}
					onClick={() => {
						setShowElementDetails(false);
					}}
				>
					<X size={16} />
				</Button>
			</div>

		<ScrollArea>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-wrap gap-4 content-start h-full">
						<div className="w-1/3 flex-auto">
							<FormField
								control={form.control}
								name="id"
								defaultValue={zone ? zone.getId() : 0}
								render={({ field }) => (
									<FormItem>
										<FormLabel>ID</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="ID"
												disabled={zone ? true : false}
												type={"number"}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-1/3 flex-auto">
							<FormField
								control={form.control}
								name="direction"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Direzione</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={
												zone ? (zone.getOrientation() ? "NS" : "EW") : "NS"
											}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Direzione" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="NS">Nord ↔ Sud</SelectItem>
												<SelectItem value="EW">Est ↔ Ovest</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-1/4 flex-auto">
							<FormField
								control={form.control}
								name="length"
								defaultValue={zone ? parseFloat(zone.getLength().toFixed(2)) : 1}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Lunghezza</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="In m"
												type="number"
												min={1}
												step={0.1}
											></Input>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-1/4 flex-auto">
							<FormField
								control={form.control}
								name="width"
								defaultValue={zone ? parseFloat(zone.getWidth().toFixed(2)) : 1}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Larghezza</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="number"
												min={1}
												step={0.1}
												placeholder="In m"
												disabled={form.getValues("columnsType") != "equal"}
											></Input>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-1/4 flex-auto">
							<FormField
								control={form.control}
								name="height"
								defaultValue={zone ? parseFloat(zone.getHeight().toFixed(2)) : 1}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Altezza</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="number"
												min={1}
												placeholder="In m"
												disabled
											></Input>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="w-full">
							<Label>Colonne</Label>
							{ColumnCreation(form, zone)}
						</div>

						<hr className="w-full"/>

						<div className={"flex w-full justify-between items-center sticky top-0 bg-slate-50 pb-2"}>
							<span className={"font-bold"}>
								{zone?.getColumns()[0].length || "0"}{" "}
								{zone?.getColumns()[0].length != 1 ? "livelli" : "livello"}
							</span>
							<Button
								type="button"
								className={buttonVariants({ variant: "outline" }) + " text-black"}
								onClick={() => {
									setLevels([...levels, { id: Math.random(), height: 1 }]);
								}}>
								<ListPlus size={16} className="mr-2" />
								Aggiungi
							</Button>
						</div>

						<div
							className={
								"flex flex-col gap-2 mb-16"
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
									removable={zone ? index > zone.getMaxUsedLevel() : index > 0}
								/>
							))}
						</div>

					<Button
						type="submit"
						className={"w-full absolute bottom-4 z-10"}
					>
						{zone ? "Salva le modifiche alla " : "Crea "} zona
					</Button>
				</form>
			</Form>
			</ScrollArea>
		</div>
	);
}
