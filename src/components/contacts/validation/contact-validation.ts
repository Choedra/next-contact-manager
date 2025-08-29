import { z } from "zod";

export const contactSchema = z.object({
  username: z.string().min(1, "Username is required"),
  phone: z
    .string()
    .regex(/^(\+975)?\d{8}$/, "Phone must be exactly 8 digits, optionally starting with +975"),
  address: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
