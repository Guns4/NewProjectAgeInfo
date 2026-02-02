import { z } from "zod"

/**
 * Age Calculator Validation Schema
 * Ensures birth date is in the past and valid.
 */
export const ageCalculatorSchema = z.object({
    birthDate: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Please enter a valid date.",
        })
        .refine((val) => new Date(val).getTime() <= new Date().getTime(), {
            message: "Birth date cannot be in the future.",
        }),
    birthTime: z.string().optional(),
    name: z.string().min(2, "Name must be at least 2 characters.").optional(),
})

export type AgeCalculatorValues = z.infer<typeof ageCalculatorSchema>
