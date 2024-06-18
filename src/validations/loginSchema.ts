import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required!",
        invalid_type_error: "Email must be a string!",
      })
      .email({ message: "Email badly formatted!" })
      .max(225, "Max email length exceeded!"),

    password: z
      .string({
        required_error: "Password is required!",
        invalid_type_error: "Password must be a string!",
      })
      .max(255, "Max password length exceeded!"),
  })
  .strict();

export type LoginDataType = z.infer<typeof loginSchema>;
