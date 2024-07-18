import { z } from "zod";
import { UUIDSchema } from "./UUIDSchema";

export const vehicleSchema = z
  .object({
    plate: z
      .string({
        required_error: "Plate is required!",
        invalid_type_error: "Plate must be a string!",
      })
      .min(7, "Plate must have at least 7 characters!")
      .max(7, "Max plate length exceeded!"),

    type: z
      .string({
        required_error: "Type is required!",
        invalid_type_error: "Type must be a string!",
      })
      .uuid({ message: `invalid type ID!` }),

    nameDriver: z
      .string({
        required_error: "Name driver is required!",
        invalid_type_error: "Name driver must be a string!",
      })
      .min(3, "Name driver must have at least 3 characters!")
      .max(255, "Max name driver length exceeded!"),

    status: z
      .enum(["awaiting", "enter", "loading", "finished"], {
        invalid_type_error: "Status must be a string!",
        required_error:
          "Status is required and must be 'admin', 'porter' and 'dispatcher'!",
      })
      .optional(),
  })
  .strict();
