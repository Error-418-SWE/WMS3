import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface ManualCreationFrameProps {
	form: UseFormReturn;
}

export function ManualCreationFrame({ form }: ManualCreationFrameProps) {
	return (
		<>
			<FormField
				name="larghezza"
				control={form.control}
                defaultValue=""
				render={({ field }) => (
					<>
						<FormItem>
							<FormLabel>Larghezza</FormLabel>
							<FormControl>
								<Input placeholder="Larghezza" {...field}/>
							</FormControl>
						</FormItem>
					</>
				)}
			/>
			<FormField
				name="profodita"
				control={form.control}
                defaultValue=""
				render={({ field }) => (
					<>
						<FormItem>
							<FormLabel>Profondità</FormLabel>
							<FormControl>
								<Input placeholder="Profondità" {...field}/>
							</FormControl>
						</FormItem>
					</>
				)}
			/>
		</>
	);
}
