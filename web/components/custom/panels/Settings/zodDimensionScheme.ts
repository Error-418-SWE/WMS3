import { z } from "zod";
const dimensionFieldSchema = z
	.number()
	.or(
		z
			.string()
			.trim()
			.refine((value) => !isNaN(parseFloat(value)), { message: "Valore non valido" })
	)
	.transform((value) => parseFloat(value.toString()))
	.refine((value) => !isNaN(value), { message: "Valore non valido" })
	.refine((value) => value > 0, { message: "Valore non valido" });

export const dimensionsFormSchema = z.object({
    length: dimensionFieldSchema,
	width: dimensionFieldSchema,
});
