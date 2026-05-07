import { z } from "zod";

// Waitlist signup validation
export const waitlistSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;

// Newsletter subscription (future use)
export const newsletterSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .optional(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
