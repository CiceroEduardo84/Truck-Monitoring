import { z } from "zod";

export const userSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required!",
        invalid_type_error: "Name must be a string!",
      })
      .min(3, "Name must have at least 3 characters!")
      .max(255, "Max name length exceeded!"),

    email: z
      .string({
        required_error: "Email is required!",
        invalid_type_error: "Email must be a string!",
      })
      .email("Email poorly formatted!")
      .max(255, "Max email length exceeded!"),

    password: z
      .string({
        required_error: "Password is required!",
        invalid_type_error: "Password must be a string!",
      })
      .min(7, "Password must have at least 7 characters!")
      .max(255, "Max password length exceeded!")
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{7,}$/, {
        message:
          "The password must contain at least one capital letter, one number and one special character!",
      }),

    type: z
      .enum(["admin", "porter", "dispatcher"], {
        invalid_type_error: "Type must be a string!",
        required_error:
          "Type is required and must be 'admin', 'porter' and 'dispatcher'!",
      })
      .optional(),
  })
  .strict();

export type UserDataTypes = z.infer<typeof userSchema>;
