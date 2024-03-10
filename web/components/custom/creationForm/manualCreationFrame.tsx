import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface ManualCreationFrameProps {
	form: UseFormReturn<any>;
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
						<FormItem className={"flex justify-around items-center gap-2"}>
							<FormLabel>Larghezza</FormLabel>
							<div>
								<FormControl>
									<Input placeholder="Larghezza" {...field} type="number" min={1}/>
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					</>
				)}
			/>
			<FormField
				name="profondita"
				control={form.control}
				defaultValue=""
				render={({ field }) => (
					<>
						<FormItem className={"flex justify-around items-center gap-2"}>
							<FormLabel>Profondità</FormLabel>
							<div >
								<FormControl>
									<Input placeholder="Profondità" {...field} type="number" min={1}/>
								</FormControl>
								<FormMessage />
							</div>
						</FormItem>
					</>
				)}
			/>
		</>
	);
}
