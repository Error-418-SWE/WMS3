import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { DropFileArea } from "@/components/custom/creationForm/dropFileArea";
import { Input } from "@/components/ui/input";

interface SVGCreationFrameProps {
	form: UseFormReturn<any>;
}

export function SVGCreationFrame({ form }: SVGCreationFrameProps) {
	return (
		<>
			<DropFileArea form={form} />
			<FormField
				name="latoMaggiore"
				control={form.control}
				defaultValue=""
				render={({ field }) => (
					<>
						<FormItem>
							<FormLabel>Lato maggiore</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="number"
									placeholder="In metri"
									min={1}
									step={0.01}
								/>
							</FormControl>
							<FormDescription>Il lato minore sarà determinato in modo automatico.</FormDescription>
							<FormMessage />
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
								<Checkbox checked={field.value} onCheckedChange={field.onChange}/>
							</FormControl>
							<FormLabel className={"pl-2"}>Importa gli scaffali dal database</FormLabel>
						</FormItem>
					</>
				)}
			/>
		</>
	);
}
