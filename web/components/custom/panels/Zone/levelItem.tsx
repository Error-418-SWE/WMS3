import { Button, buttonVariants } from "@/components/ui/button";
import {
	FormField,
	FormItem,
	FormControl,
	FormMessage,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

export default function LevelItem(
	form: UseFormReturn,
	levelOrder: number,
	removeLevel: any,
	height?: number
) {
	return (
		<div className={"border p-3"}>
			<div className={"flex justify-between"}>
				<span>Level: {levelOrder}</span>
				<Button
                    className={buttonVariants({variant : "secondary"}) + " border-2"}
					onClick={removeLevel}
				>
					-
				</Button>
			</div>
			<div className={"mt-2"}>
				<FormField
					control={form.control}
					name={"level_height_" + levelOrder}
					defaultValue={height ? height : "0"}
					render={({ field }) => (
						<FormItem className={"grid grid-cols-3 items-center"}>
                            <FormLabel>Altezza</FormLabel>
							<FormControl>
								<Input
                                    className={"col-span-2"}
                                    {...field}
								></Input>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
}
