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

const selectOptions: Record<string, string> = {
	custom: "SVG personalizzato",
	magazzino: "Centro Distribuzione",
	materia: "Materia Prima",
}

interface SVGCreationFrameProps {
	form: UseFormReturn;
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
								console.log(value);
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
						<FormItem className={"flex items-center"}>
							<FormLabel className={"grow"}>Lato maggiore</FormLabel>
							<FormControl className={"w-2/3"}>
								<Input
									{...field}
									type="number"
									min={"0"}
									placeholder="Lato maggiore"
								/>
							</FormControl>
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
