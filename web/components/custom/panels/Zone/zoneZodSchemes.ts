import { z } from "zod";
const dimensionSchema = z
	.number()
	.or(
		z
			.string()
			.trim()
			.refine((value) => !isNaN(parseFloat(value)), { message: "Non valido" }),
	)
	.transform((value) => parseFloat(value.toString()))
	.refine((value) => !isNaN(value), { message: "Non valido" })
	.refine((value) => value > 0, { message: "Non valido" });

export const equalColumns = z.object({
	id: z.number().or(
		z
			.string()
			.refine((value) => value.trim() !== "", {
				message: "Richiesto un numero",
			})
			.transform((value) => parseFloat(value))
			.refine((value) => !Number.isNaN(value), {
				message: "Richiesto un numero",
			}),
	),
	columnsType: z.literal("equal"),
	direction: z.string(),
	length: dimensionSchema,
	width: dimensionSchema,
	height: dimensionSchema,
	nColumns: dimensionSchema,
});

export const customColumns = z.object({
	id: z.number().or(
		z
			.string()
			.refine((value) => value.trim() !== "", {
				message: "Richiesto un numero",
			})
			.transform((value) => parseFloat(value))
			.refine((value) => !Number.isNaN(value), {
				message: "Richiesto un numero",
			}),
	),
	columnsType: z.literal("custom"),
	direction: z.string(),
	length: dimensionSchema,
	width: dimensionSchema,
	height: dimensionSchema,
	customColumns: z
		.string()
		.trim()
		.refine(
			(value) => {
				const parts = value.split(" ");
				return parts.every(
					(part) => !isNaN(parseFloat(part)) && isFinite(parseFloat(part)),
				);
			},
			{
				message: "Formato non valido",
			},
		),
});
