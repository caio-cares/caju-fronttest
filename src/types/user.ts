import { Status } from "./status";

export interface User {
  id: string;
  email: string;
  employeeName: string;
  status: Status;
  admissionDate: string;
  cpf: string;
}

export interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
