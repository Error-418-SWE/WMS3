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

export default function LevelItem({
	form,
	level,
	levels,
	setLevels,
	levelOrder,
  }: {
	form: any;
	level: {id: number, height: number};
	levels: {id: number, height: number}[];
	setLevels: any;
	levelOrder: number;
  }) {
  
	const height = level.height;
	return (
	  <div className={"border p-3"}>
		<div className={"flex justify-between"}>
		  <span>Level: #{levelOrder}</span>
		  <Button
		  	type="button"
			className={buttonVariants({ variant: "secondary" }) + " border-2"}
			onClick={() => {
			  var newlist = levels.filter(l => l.id !== level.id);
			  setLevels(newlist);
			  form.unregister("level_height_" + level.id);
			  console.log(levels);
			  console.log(newlist);
			}}
		  >
			-
		  </Button>
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
					step={0.1}
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
  
