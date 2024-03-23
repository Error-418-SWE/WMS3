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
						<FormItem>
							<FormLabel>Larghezza</FormLabel>
							<FormControl>
								<Input placeholder="In metri" {...field} type="number" min={1} step={0.01}/>
							</FormControl>
							<FormMessage />
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
						<FormItem>
							<FormLabel>Lunghezza</FormLabel>
							<FormControl>
								<Input placeholder="In metri" {...field} type="number" min={1} step={0.01}/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</>
				)}
			/>
		</>
	);
}
