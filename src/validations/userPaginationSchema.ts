import { z } from "zod";

export const userPaginationSchema = z
  .object({
    limit: z
      .string({
        required_error: "limit is required!",
        invalid_type_error: "limit must be a string!",
      })
      .max(255, "max limit length exceeded!")
      .regex(/^\d+$/, "limit must have only numbers!")
      .optional(),

    offset: z
      .string({
        required_error: "offset is required!",
        invalid_type_error: "offset must be a string!",
      })
      .max(255, "max offset length exceeded!")
      .regex(/^\d+$/, "offset must have only numbers!")
      .optional(),

    filter: z
      .enum(["admin", "porter", "dispatcher","all"], {
        invalid_type_error: "filter must be a string!",
        required_error: "filter is required and must be 'admin', 'porter', 'dispatcher'",
      })
      .optional(),
  })
  .strict();

export type UserPaginationSchema = z.infer<typeof userPaginationSchema>;