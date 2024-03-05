import { z } from "zod";

export const manualCreationSchema = z.object({
	choice: z.literal("manuale"),
	loadProdotti: z.boolean(),
	larghezza: z
		.string()
		.refine((value) => value.trim() !== "", {
			message: "Necessario inserire un valore",
		})
		.transform((value) => parseFloat(value))
		.refine((value) => !Number.isNaN(value), {
			message: "Il valore deve essere un numero",
		})
		.refine((value) => value > 0, {
			message: "Il valore deve essere maggiore di 0",
		}),
	profondita: z
		.string()
		.refine((value) => value.trim() !== "", {
			message: "Necessario inserire un valore",
		})
		.transform((value) => parseFloat(value))
		.refine((value) => !Number.isNaN(value), {
			message: "Il valore deve essere un numero",
		})
		.refine((value) => value > 0, {
			message: "Il valore deve essere maggiore di 0",
		}),
});

export  const svgCreationSchema = z.object({
	choice: z.literal("custom"),
	loadProdotti: z.boolean(),
	loadScaffali: z.boolean(),
	latoMaggiore: z
		.string()
		.refine((value) => value.trim() !== "", {
			message: "Necessario inserire un valore",
		})
		.transform((value) => parseFloat(value))
		.refine((value) => !Number.isNaN(value), {
			message: "Il valore deve essere un numero",
		})
		.refine((value) => value > 0, {
			message: "Il valore deve essere maggiore di 0",
		}),
	svg: z.string({
		required_error: "Necessario caricare un file SVG",
		invalid_type_error: "Necessario caricare un file SVG",
	}).min(1),
});