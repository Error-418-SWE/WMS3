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
import { Input } from "@/components/ui/input";
import { ProcessingContext } from "@/components/providers/formContextProvider";

interface DropFileAreaProps {
	form: UseFormReturn;
}

export function DropFileArea({ form }: DropFileAreaProps) {
	const [displayedText, setDisplayedText] = useState("Carica file SVG");
	const { setIsProcessing } = useContext(ProcessingContext);

	const handleFileChange = (event: any) => {
		setIsProcessing(true);
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.readAsText(file);
		reader.onload = async (event) => {
			console.log(event.target?.result);

			const response = await fetch("/api/SVGSanitizer", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ svg: event.target?.result }),
			});

			if (response.status === 200) {
				const sanitizedSVG = await response.json();
				form.setValue("svgContent", sanitizedSVG.cleanSVG);
			} else {
				form.setValue("svgContent", null);
				form.setError("svgContent", {
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
								className="hidden"
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
							{displayedText}
						</div>
						<FormMessage className="text-center">
							{form.formState.errors.svgContent &&
							typeof form.formState.errors.svgContent.message === "string"
								? form.formState.errors.svgContent.message
								: ""}
						</FormMessage>
					</FormItem>
				</>
			)}
		/>
	);
}