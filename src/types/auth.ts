import z from "zod";

export const loginFormData = z.object({
  email: z.email("Por favor, insira um email válido"),
  password: z.string().min(1, "Por favor, insira sua senha"),
});

export type LoginFormData = z.infer<typeof loginFormData>;

export const registerFormData = z.object({
  name: z.string().min(1, "Por favor, insira seu nome"),
  email: z.email("Por favor, insira um email válido"),
  password: z.string().min(1, "Por favor, insira sua senha"),
});

export type RegisterFormData = z.infer<typeof registerFormData>;
