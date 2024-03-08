import {
	FormControl,
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
