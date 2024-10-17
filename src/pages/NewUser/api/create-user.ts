import { z } from "zod";
import { apiClient } from "~/utils/api";
import { formSchema } from "../utils/form.schema";
import { User } from "~/types/user";
import { removeCPF } from "~/utils/mask";

export type CreateUserInput = z.infer<typeof formSchema>;

export const createUser = ({
  data,
}: {
  data: CreateUserInput;
}): Promise<User> => {
  const payload = {
    ...data,
    cpf: removeCPF(data.cpf),
  };

  return apiClient.post(`/registrations`, payload);
};
