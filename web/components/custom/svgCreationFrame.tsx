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
	Select,
	SelectItem,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { DropFileArea } from "@/components/custom/dropFileArea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ZodBoolean, ZodEnum, ZodString, z } from "zod";

const selectOptions: Record<string, string> = {
	custom: "SVG personalizzato",
	magazzino: "Centro Distribuzione",
	materia: "Materia Prima",
}

interface SVGCreationFrameProps {
	form: UseFormReturn<any>;
}

export function SVGCreationFrame({ form }: SVGCreationFrameProps) {

	const [svgChoice, setSvgChoice] = useState("custom");
	return (
		<>
			<FormField
				name="svgChoice"
				control={form.control}
				defaultValue={"custom"}
				render={({ field }) => (
					<>
						<FormItem>
							<FormLabel>Scegli la planimetria</FormLabel>
							<Select onValueChange={(value) => {
								field.onChange(value);
								setSvgChoice(value);
								form.clearErrors();
								form.setValue("svgContent", undefined);
							} } defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder={selectOptions.custom}/>
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{Object.keys(selectOptions).map((key) => (
										<SelectItem key={key} value={key}>
											{selectOptions[key]}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</FormItem>
					</>
				)}
			/>
			{svgChoice == "custom" ? <DropFileArea form={form} /> : ""}
			<FormField
				name="latoMaggiore"
				control={form.control}
				defaultValue=""
				render={({ field }) => (
					<>
						<FormItem className={"flex justify-around gap-2 items-center"}>
							<FormLabel>Lato maggiore</FormLabel>
							<div>
								<FormControl>
									<Input
										{...field}
										type="number"
										placeholder="Lato maggiore"
									/>
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					</>
				)}
			/>
			<FormField
				name="loadScaffali"
				control={form.control}
				defaultValue={false}
				render={({ field }) => (
					<>
						<FormItem>
							<FormControl>
								<Checkbox onCheckedChange={field.onChange}/>
							</FormControl>
							<FormLabel className={"pl-2"}>Importa gli scaffali dal database</FormLabel>
						</FormItem>
					</>
				)}
			/>
		</>
	);
}
