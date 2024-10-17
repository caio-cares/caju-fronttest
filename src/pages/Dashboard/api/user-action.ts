import { apiClient } from "~/utils/api";
import { User } from "~/types/user";
import { Status } from "~/types/status";

export const deleteUser = (data: User): Promise<User[]> => {
  return apiClient.delete(`/registrations/${data.id}`);
};

export const approveUser = (data: User): Promise<User[]> => {
  return apiClient.put(`/registrations/${data.id}`, {
    ...data,
    status: Status.APPROVED,
  });
};

export const reproveUser = (data: User): Promise<User[]> => {
  return apiClient.put(`/registrations/${data.id}`, {
    ...data,
    status: Status.REPROVED,
  });
};
export const reviewUser = (data: User): Promise<User[]> => {
  return apiClient.put(`/registrations/${data.id}`, {
    ...data,
    status: Status.REVIEW,
  });
};
