"use client";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { useRef } from "react";

interface DropFileAreaProps {
	form: UseFormReturn;
}

export function DropFileArea({ form }: DropFileAreaProps) {
	var displayedText = "Carica file SVG";

	const handleFileChange = (event: any) => {
		event.preventDefault();
		const file = event.dataTransfer
			? event.dataTransfer.files[0]
			: event.target.files[0];
		const reader = new FileReader();
		reader.readAsText(file);
		reader.onload = (event) => {
			console.log(event.target?.result);
			form.setValue("svgContent", event.target?.result);
		};

		form.setValue("svgFile", file);
		displayedText = file.name;
		event.target.value = null;
		//contattare l'api per validazione file
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
			defaultValue=""
			render={({ field }) => (
				<>
					<FormItem>
						<FormLabel>Carica la planimetria</FormLabel>
						<FormControl>
							<input
								{...field}
								type="file"
								ref={fileInputRef}
								className="hidden"
								onChange={handleFileChange}
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
					</FormItem>
				</>
			)}
		/>
	);
}
