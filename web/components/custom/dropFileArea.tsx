"use client";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";

interface DropFileAreaProps {
	form: UseFormReturn;
}

export function DropFileArea({ form }: DropFileAreaProps) {
	const [displayedText, setDisplayedText] = useState("Carica file SVG");

	const handleFileChange = (event: any) => {
		const file = event.target.files[0];
		const reader = new FileReader();

		//logica senza API
		reader.readAsText(file);
		reader.onload = (event) => {
			console.log(event.target?.result);
			form.setValue("svgContent", event.target?.result);
		};

		setDisplayedText(file.name);

		//logica con API
		/*
		reader.onload = async (event) => {
			const svg = event.target.result;
		
			// Chimata all'API
			const response = await fetch('/api/SVGSanitizer', {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json'
			  },
			  body: JSON.stringify({ svg })
			});
		
			const data = await response.json();
			const cleanSVG = data.cleanSVG;
		
			// Da qui si possono utilizzare le informazioni del file SVG
			console.log(cleanSVG);
			form.register("svgFile");
			form.setValue("svgFile", file.name);
			setDisplayedText(file.name);
		};
		*/
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
