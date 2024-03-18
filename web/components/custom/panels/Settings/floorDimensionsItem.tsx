import { useFloorData } from "@/components/providers/floorProvider";
import { buttonVariants, Button } from "@/components/ui/button";
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
import {
	Dialog,
	DialogHeader,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Floor } from "@/model/floor";
import { useState } from "react";
import { z } from "zod";
import { dimensionsFormSchema } from "./zodDimensionScheme";
import { zodResolver } from "@hookform/resolvers/zod";

export default function FloorDimensionsItem() {
	const { floor, setFloor } = useFloorData();
	const [open, setOpen] = useState(false);

	const formSchema = z.object({
		dimensionsFormSchema,
	});

	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			dimensionsFormSchema: {
				length: parseFloat(parseFloat(floor.getLength() + "").toFixed(2)),
				width: parseFloat(parseFloat(floor.getWidth() + "").toFixed(2)),
			},
		},
		resolver: zodResolver(formSchema),
	});

	const oldWidth = floor.getWidth();
	const oldLength = floor.getLength();
	const newWidth = form.watch("dimensionsFormSchema.width");
	const newLength = form.watch("dimensionsFormSchema.length");

	const aspectRatio = newWidth / newLength;
	const scaledWidth = newWidth >= newLength ? 350 : 350 * aspectRatio;
	const scaledHeight = newLength > newWidth ? 350 : 350 / aspectRatio;

	const handleSubmit = (event: any) => {
		event.preventDefault();
		console.log("new dimensions: ", newWidth, newLength);
		floor.setLength(newLength);
		floor.setWidth(newWidth);
		setFloor(floor);
		setOpen(false);
		console.log("submitted");
	};

	function checkIfNewValidDimensions() {
		return newWidth >= oldWidth && newLength >= oldLength;
	}

	return (
		<div>
			<h2 className={"font-bold"}>Planimetria</h2>
			<Form {...form}>
				<form>
					<FormDescription>
						La planimetria sarà estesa rispetto all&apos;origine
					</FormDescription>
					<FormField
						control={form.control}
						name={"dimensionsFormSchema.width"}
						render={({ field }) => (
							<FormItem
								className={"grid grid-cols-3 items-center justify-start"}
							>
								<FormLabel>Larghezza</FormLabel>
								<FormControl>
									<Input
										{...field}
										className={"col-span-2"}
										type={"number"}
										step={0.01}
										onKeyUp={(e) => {
											if (!checkIfNewValidDimensions()) {
												form.setError("dimensionsFormSchema.width", {
													type: "manual",
													message: "La larghezza non può essere ridotta",
												});
											} else {
												form.clearErrors("dimensionsFormSchema.width");
											}
										}}
									/>
								</FormControl>
								<FormMessage className={"col-span-3"} />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name={"dimensionsFormSchema.length"}
						render={({ field }) => (
							<FormItem
								className={"grid grid-cols-3 items-center justify-start"}
							>
								<FormLabel>Lunghezza</FormLabel>
								<FormControl>
									<Input
										{...field}
										className={"col-span-2"}
										type={"number"}
										step={0.01}
										onKeyUp={(e) => {
											if (!checkIfNewValidDimensions()) {
												form.setError("dimensionsFormSchema.length", {
													type: "manual",
													message: "La lunghezza non può essere ridotta",
												});
											} else {
												form.clearErrors("dimensionsFormSchema.length");
											}
										}}
									/>
								</FormControl>
								<FormMessage className={"col-span-3"} />
							</FormItem>
						)}
					/>

					<Dialog open={open} onOpenChange={setOpen}>
						<div className={"flex justify-end mt-3"}>
							<DialogTrigger
								className={buttonVariants({ variant: "default" })}
								disabled={!checkIfNewValidDimensions()}
							>
								Salva
							</DialogTrigger>
						</div>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Confermi il ridimensionamento?</DialogTitle>
								<DialogDescription>
									La planimetria sarà estesa rispetto all&apos;origine.
								</DialogDescription>
							</DialogHeader>
							<div className={"flex justify-center"}>
								<div
									style={{
										width: `${scaledWidth}px`,
										height: `${scaledHeight}px`,
										background:
											"repeating-linear-gradient(45deg, rgba(122, 122, 122, 0.5), rgba(122, 122, 122, 0.5) 3px, rgba(255, 255, 255, 0.5) 3px, rgba(255, 255, 255, 0.5) 10px)",
										position: "relative",
										border: "1px solid black",
									}}
								>
									<div
										style={{
											width: `${(oldWidth / newWidth) * 100}%`,
											height: `${(oldLength / newLength) * 100}%`,
											backgroundColor: "rgba(255, 255, 255, 1)",
											position: "absolute",
											border:
												newWidth === oldWidth && newLength === oldLength
													? "1px solid black"
													: "none",
										}}
									></div>
								</div>
							</div>
							<div className={"flex justify-end gap-2"}>
								<DialogClose asChild>
									<Button onClick={handleSubmit}>Conferma</Button>
								</DialogClose>
							</div>
						</DialogContent>
					</Dialog>
				</form>
			</Form>
		</div>
	);
}
