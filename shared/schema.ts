import { z } from "zod";

export const messageSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  createdAt: z.string(),
});

export const insertMessageSchema = messageSchema.pick({
  email: true,
  message: true,
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = z.infer<typeof messageSchema>;
