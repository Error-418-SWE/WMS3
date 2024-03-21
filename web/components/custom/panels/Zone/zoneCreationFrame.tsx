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
import { useWarehouseData } from "@/components/providers/Threejs/warehouseProvider";

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
			.map((bin) => bin.getWidth())
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
								defaultValue={
									zone ? (!customColumns ? "equal" : "custom") : "equal"
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
														? zone.getLevels()[0].length
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
															<FormMessage className={"col-span-3"} />
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
										defaultValue={
											zone
												? zone
														.getLevels()[0]
														.map((bin) => bin.getWidth())
														.join(" ")
												: ""
										}
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
		form.setValue("length", zone ? zone.getLength() : 1);
		form.setValue("width", zone ? zone.getWidth() : 1);
		form.setValue("height", zone ? zone.getHeight() : 1);
		form.setValue(
			"columnsType",
			zone ? (checkIfEqualColumns(zone) ? "equal" : "custom") : "equal"
		);
		form.setValue(
			"customColumns",
			zone
				? zone
						.getLevels()[0]
						.map((bin) => bin.getWidth())
						.join(" ")
				: ""
		);
		form.setValue("nColumns", zone ? zone.getLevels()[0].length : 1);
		setLevels(
			zone
				?.getColumns()[0]
				.map((bin) => ({
					id: Math.random(),
					height: bin.getHeight() || 0,
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
		console.log("USE EFFECT " + levels);
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
						parseFloat(form.getValues("length") + ""),
						form.getValues("columnsType") == "equal"
							? form.getValues("width") / form.getValues("nColumns")
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

		console.log(form.getValues());
		setShowElementDetails(false);
	}

	return (
		<div className={"flex flex-col h-full mx-5"}>
			<div className={"flex items-center mt-2 justify-between"}>
				<h1 className={"grow font-bold text-2xl"}>
					{zone ? "Zona: " + zone.getId() : "Nuova zona"}
				</h1>
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
				{zone ? "Modifica" : "Definisci"} le proprietà della zona
			</span>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
					<div className={"flex flex-col gap-y-4 mt-2"}>
						<FormField
							control={form.control}
							name="id"
							defaultValue={zone ? zone.getId() : 0}
							render={({ field }) => (
								<FormItem className={"grid items-center grid-cols-3"}>
									<FormLabel>ID</FormLabel>
									<FormControl>
										<Input
											className={"col-span-2"}
											{...field}
											placeholder="ID"
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
							<div className={"col-span-2"}>{ColumnCreation(form, zone)}</div>
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
									removable={zone ? index > zone.getMaxUsedLevel() : index > 0}
								/>
							))}
						</div>

						<Button type="submit">
							{zone ? "Salva le modifiche alla " : "Crea "} zona
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
