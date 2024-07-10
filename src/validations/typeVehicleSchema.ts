import { z } from "zod";

export const typeVehicleSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required!",
        invalid_type_error: "Name must be a string!",
      })
      .min(3, "Name must have at least 3 characters!")
      .max(255, "Max name length exceeded!"),
  })
  .strict();

export type TypeVehicleSchema = z.infer<typeof typeVehicleSchema>;
