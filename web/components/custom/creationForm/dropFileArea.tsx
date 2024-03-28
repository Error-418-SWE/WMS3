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
import { useProcessingContext } from "@/components/providers/UI-Providers/formContextProvider";
import { saveSVG } from "@/ServerActions/SVG/saveSVG";
import SVGSanitize from "@/ServerActions/SVG/SVGSanitize";
import { Upload } from "lucide-react";

interface DropFileAreaProps {
	form: UseFormReturn;
}

function sizeInMB(file: File) {
	return file.size / 1024 / 1024;
}

export function DropFileArea({ form }: DropFileAreaProps) {
	const [displayedText, setDisplayedText] = useState("Carica file SVG");
	const { setIsProcessing } = useProcessingContext();

	const handleFileChange = (event: any) => {
		setIsProcessing(true);
		const file = event.target.files[0];

		if (!file) {
			setIsProcessing(false);
			return;
		}

		if (file.type !== "image/svg+xml") {
			form.setValue("svg", null);
			form.setError("svg", {
				type: "server",
				message: "Il file deve essere un SVG",
			});
			setIsProcessing(false);
			return;
		}

		const reader = new FileReader();

		if (sizeInMB(file) > 10) {
			form.setValue("svg", null);
			form.setError("svg", {
				type: "server",
				message: "Il file è troppo grande",
			});
			setIsProcessing(false);
			return;
		}

		reader.readAsText(file);
		reader.onload = async (event) => {
			if (!event.target?.result) {
				setIsProcessing(false);
				return;
			}

			const response = await SVGSanitize(event.target?.result as string);

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
								"bg-secondary h-24 rounded-lg border-2 border-dashed border-gray-300 text-black flex flex-col justify-center items-center text-center cursor-pointer"
							}
						>
							<Upload size={48} className={"h-6 mb-2"} />
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
