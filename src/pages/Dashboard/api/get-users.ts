import { apiClient } from "~/utils/api";
import { User } from "~/types/user";

type GetUsersInput = {
  cpf: string;
};

export const getUsers = (data: GetUsersInput): Promise<User[]> => {
  if (data.cpf) {
    return apiClient.get(`/registrations?cpf=${data.cpf}`);
  }

  return apiClient.get(`/registrations`);
};
