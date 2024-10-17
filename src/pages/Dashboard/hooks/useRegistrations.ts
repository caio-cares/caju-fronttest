import { useState, useEffect, useCallback } from "react";
import { User } from "~/types/user";
import { getUsers } from "../api/get-users";
import { removeCPF } from "~/utils/mask";

const useRegistrations = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [status, setStatus] = useState<
    "idle" | "loading" | "succeeded" | "failed"
  >("idle");

  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async (cpf?: string) => {
    setStatus("loading");
    setError(null);

    try {
      const params = cpf ? { cpf: removeCPF(cpf) } : { cpf: "" };
      const response = await getUsers(params);

      if (cpf && response?.length === 0) {
        setError("Nenhum usuário encontrado");
        setStatus("failed");
      } else {
        setStatus("succeeded");
      }

      setUsers(response);
    } catch (err) {
      setError("Erro ao obter a lista de usuários");
      setStatus("failed");
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { users, status, error, fetch };
};

export default useRegistrations;
