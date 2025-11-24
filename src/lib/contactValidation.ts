import { z } from 'zod';

// Validation schema for contact form
export const contactFormSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Ім'я повинно містити мінімум 2 символи" })
    .max(100, { message: "Ім'я занадто довге" })
    .regex(/^[А-ЩЬЮЯҐЄІЇа-щьюяґєії'\s-]+$/u, { 
      message: "Ім'я може містити лише українські літери, пробіли та дефіси" 
    }),
  email: z.string()
    .trim()
    .email({ message: "Невірний формат email" })
    .max(255, { message: "Email занадто довгий" }),
  phone: z.string()
    .trim()
    .regex(/^(\+?38)?0\d{9}$/, { 
      message: "Невірний формат телефону. Використовуйте формат: +380XXXXXXXXX або 0XXXXXXXXX" 
    }),
  subject: z.string()
    .trim()
    .min(3, { message: "Тема повинна містити мінімум 3 символи" })
    .max(200, { message: "Тема занадто довга" }),
  message: z.string()
    .trim()
    .min(10, { message: "Повідомлення повинно містити мінімум 10 символів" })
    .max(2000, { message: "Повідомлення занадто довге" }),
  website: z.string().max(0, { message: "Invalid submission" }), // Honeypot field
  companyName: z.string().optional(),
  _submitTime: z.number().min(3000, { message: "Submission too fast" }), // Minimum 3 seconds
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
