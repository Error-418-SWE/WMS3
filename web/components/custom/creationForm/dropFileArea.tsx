"use client";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { UseFormReturn, set } from "react-hook-form";
import { useContext, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useProcessingContext } from "@/components/providers/UI-Providers/formContextProvider";
import { saveSVG } from "@/ServerActions/SVG/saveSVG";
import SVGSanitize from "@/ServerActions/SVG/SVGSanitize";

interface DropFileAreaProps {
	form: UseFormReturn;
}

export function DropFileArea({ form }: DropFileAreaProps) {
	const [displayedText, setDisplayedText] = useState("Carica file SVG");
	const { setIsProcessing } = useProcessingContext();

	const handleFileChange = (event: any) => {
		setIsProcessing(true);
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.readAsText(file);
		reader.onload = async (event) => {
			const response = await SVGSanitize(
				event.target?.result ? (event.target?.result as string) : ""
			);

			if (response) {
				await saveSVG(response);
				form.setValue("svg", "saved.svg");
			} else {
				form.setValue("svg", null);
				form.setError("svg", {
					type: "server",
					message: "Errore durante la sanitizzazione del file",
				});
				setDisplayedText("Carica file SVG");
			}
			setIsProcessing(false);
		};

		setDisplayedText(file.name);
	};

	const handleDragOver = (event: any) => {
		event.preventDefault();
	};

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		if (fileInputRef.current) fileInputRef.current.click();
	};

	return (
		<FormField
			name="svgFile"
			control={form.control}
			defaultValue={""}
			render={({ field }) => (
				<>
					<FormItem>
						<FormLabel>Carica la planimetria</FormLabel>
						<FormControl>
							<Input
								{...field}
								type="file"
								ref={fileInputRef}
								className={"hidden"}
								onChange={handleFileChange}
								accept=".svg"
							/>
						</FormControl>
						<div
							onDrop={handleFileChange}
							onDragOver={handleDragOver}
							onClick={handleClick}
							className={
								"bg-secondary w-50 h-24 rounded-lg border-2 border-dashed border-gray-300 m-5 text-black flex flex-col justify-center text-center"
							}
						>
							<Image
								src="/icons/upload.svg"
								alt=""
								width={48}
								height={48}
								priority
								className={"h-6 mb-2"}
							/>
							{displayedText}
						</div>
						<FormMessage className={"text-center"}>
							{form.formState.errors.svg &&
							typeof form.formState.errors.svg.message === "string"
								? form.formState.errors.svg.message
								: ""}
						</FormMessage>
					</FormItem>
				</>
			)}
		/>
	);
}
