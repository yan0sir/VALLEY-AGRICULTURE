"use server";

import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/content/site";
import { getCategory } from "@/content/categories";
import { getProduct } from "@/content/products";

export type FieldError = "required" | "invalidPhone" | "invalidEmail";
export type QuoteState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<"name" | "phone" | "email" | "message", FieldError>>;
  values?: Record<string, string>;
};

const schema = z.object({
  name: z.string().trim().min(2, "required"),
  company: z.string().trim().max(120).optional(),
  phone: z
    .string()
    .trim()
    .min(1, "required")
    .regex(/^\+?[0-9\s()-]{7,20}$/, "invalidPhone"),
  email: z.union([z.literal(""), z.string().trim().email("invalidEmail")]),
  product: z.string().max(80).optional(),
  subject: z.enum(["quote", "service", "general"]),
  message: z.string().trim().min(2, "required").max(4000),
  locale: z.enum(["en", "ar"]),
});

export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const raw = Object.fromEntries(
    ["name", "company", "phone", "email", "product", "subject", "message", "locale"].map((k) => [k, String(formData.get(k) ?? "")]),
  );

  // Honeypot: real people never fill the hidden "website" field.
  if (String(formData.get("website") ?? "")) return { status: "success" };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: QuoteState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof NonNullable<QuoteState["errors"]>;
      if (!errors[field]) errors[field] = issue.message as FieldError;
    }
    return { status: "error", errors, values: raw };
  }

  const d = parsed.data;
  const productLabel = d.product ? (getProduct(d.product)?.name ?? getCategory(d.product)?.title.en ?? d.product) : "Not specified";
  const subjectLabel = { quote: "Quote request", service: "Service booking", general: "General enquiry" }[d.subject];
  const lines = [
    `${subjectLabel}: ${productLabel}`,
    "",
    `Name: ${d.name}`,
    `Company: ${d.company || "-"}`,
    `Phone: ${d.phone}`,
    `Email: ${d.email || "-"}`,
    `Language: ${d.locale === "ar" ? "Arabic" : "English"}`,
    "",
    d.message,
  ];

  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: process.env.QUOTE_FROM ?? "Valley Website <onboarding@resend.dev>",
        to: process.env.QUOTE_TO ?? site.email,
        replyTo: d.email || undefined,
        subject: `[Website] ${subjectLabel}: ${productLabel} (${d.name})`,
        text: lines.join("\n"),
      });
      if (error) throw new Error(error.message);
    } else {
      // No email provider configured (local development): log the enquiry instead.
      console.info("\n--- New website enquiry (RESEND_API_KEY not set, not emailed) ---\n" + lines.join("\n") + "\n---\n");
    }
    return { status: "success" };
  } catch (err) {
    console.error("Quote form failed:", err);
    return { status: "error", values: raw };
  }
}
