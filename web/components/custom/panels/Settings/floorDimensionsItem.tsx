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
import { useEffect, useRef, useState } from "react";
import { set } from "zod";

export default function FloorDimensionsItem() {
	const { floor, setFloor } = useFloorData();
	const [open, setOpen] = useState(false);

	const form = useForm({
		defaultValues: {
			length: floor.getLength().toFixed(2),
			width: floor.getWidth().toFixed(2),
		},
	});

	let oldWidth = floor.getWidth();
	let oldLength = floor.getLength();

	let aspectRatio = oldWidth / oldLength;

	const newWidth = form.watch("width");
	const newLength = form.watch("length");

	const handleSubmit = (event: any) => {
		event.preventDefault();
        setFloor(
			new Floor(parseFloat(newWidth), parseFloat(newLength), floor.getSVG())
		);
		setOpen(false);
		console.log("submitted");
	};

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
						name={"length"}
						render={({ field }) => (
							<FormItem
								className={"grid grid-cols-3 items-center justify-start"}
							>
								<FormLabel>Lunghezza</FormLabel>
								<FormControl>
									<Input
										{...field}
										defaultValue={floor?.getLength()?.toFixed(2) || ""}
										className={"col-span-2"}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name={"width"}
						render={({ field }) => (
							<FormItem
								className={"grid grid-cols-3 items-center justify-start"}
							>
								<FormLabel>Larghezza</FormLabel>
								<FormControl>
									<Input
										{...field}
										defaultValue={floor?.getWidth()?.toFixed(2) || ""}
										className="col-span-2"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Dialog open={open} onOpenChange={setOpen}>
						<div className={"flex justify-end mt-3"}>
							<DialogTrigger className={buttonVariants({ variant: "default" })}>
								Salva
							</DialogTrigger>
						</div>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Confermi il ridimensionamento?</DialogTitle>
								<DialogDescription>
									La planimetria sarà estesa rispetto all'origine.
								</DialogDescription>
							</DialogHeader>

							<div className={"flex justify-center"}>
								<div
									style={{
										width: "350px",
										height: `${350 * aspectRatio}px`,
										background:
											"repeating-linear-gradient(45deg, rgba(122, 122, 122, 0.5), rgba(122, 122, 122, 0.5) 3px, rgba(255, 255, 255, 0.5) 3px, rgba(255, 255, 255, 0.5) 10px)",
										position: "relative",
										border: "1px solid black",
									}}
								>
									<div
										style={{
											width: `${(oldWidth / parseFloat(newWidth)) * 100}%`,
											height: `${(oldLength / parseFloat(newLength)) * 100}%`,
											backgroundColor:
												parseFloat(newWidth) === oldWidth &&
												parseFloat(newLength) === oldLength
													? "rgba(0, 0, 255, 0.5)"
													: "rgba(255, 255, 255, 1)",
											position: "absolute",
											border:
												parseFloat(newWidth) === oldWidth &&
												parseFloat(newLength) === oldLength
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
