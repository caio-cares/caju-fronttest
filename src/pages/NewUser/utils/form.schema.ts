import { z } from "zod";
import { Status } from "~/types/status";

export const formSchema = z.object({
  employeeName: z
    .string()
    .min(2, {
      message: "O nome deve ter no mínimo 2 caracteres",
    })
    .refine((name) => /^[^\d][a-zA-Z\s]{2,}$/g.test(name), {
      message:
        "Nome deve conter pelo menos duas letras, um espaço e não deve começar com um número",
    }),
  email: z
    .string()
    .min(4, { message: "Este campo precisa ser preenchido" })
    .email("Esse não é um email válido"),
  cpf: z
    .string()
    .min(11, { message: "O CPF deve conter no mínimo 11 caracteres" }),
  admissionDate: z.string().min(1),
  status: z.string().default(Status.REVIEW),
});
