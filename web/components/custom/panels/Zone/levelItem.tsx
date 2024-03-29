import { Button, buttonVariants } from "@/components/ui/button";
import {
	FormField,
	FormItem,
	FormControl,
	FormMessage,
	FormLabel,
} from "@/components/ui/form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ListX } from "lucide-react";

export default function LevelItem({
	form,
	level,
	levels,
	setLevels,
	levelOrder,
	removable,
  }: {
	form: any;
	level: {id: number, height: number};
	levels: {id: number, height: number}[];
	setLevels: any;
	levelOrder: number;
	removable: boolean;
  }) {

	const height = level.height;
	return (
	  <div className={"border p-3 rounded-md bg-slate-100 group hover:bg-slate-200 focus-within:bg-slate-200"}>
		<div className={"flex justify-between items-center h-8"}>
			<span>
				<span className="text-muted-foreground">#</span>
				{levelOrder}
			</span>
			{removable ?
				<Button
					type="button"
					className={buttonVariants({ variant: "outline" }) + " text-black hover:bg-destructive focus:bg-destructive hover:text-white focus:text-white"}
					onClick={() => {
						var newlist = levels.filter(l => l.id !== level.id);
						setLevels(newlist);
						form.unregister("level_height_" + level.id);
						console.log(levels);
						console.log(newlist);
					}}>
					<ListX size={16} className={"text-inherit"}/>
				</Button> : <></>
			}
		</div>
		<div className={"mt-2"}>
			<FormField
				control={form.control}
				name={"level_height_" + level.id}
				defaultValue={height ? height : 1}
				render={({ field }) => (
					<FormItem className={"grid grid-cols-3 items-center"}>
						<FormLabel>Altezza</FormLabel>
						<FormControl>
							<Input
								className={"col-span-2"}
								{...field}
								type="number"
								placeholder="In m"
								step={0.01}
								min={1}
								onChange={(e) => {
								field.onChange(e);
								const newLevels = levels.map(l => l.id === level.id ? {...l, height: parseFloat(e.target.value)} : l);
								setLevels(newLevels);
								}}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	</div>
	);
  }

