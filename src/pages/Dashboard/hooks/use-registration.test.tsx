import { renderHook, act } from "@testing-library/react-hooks";
import useRegistrations from "./useRegistrations";
import { getUsers } from "../api/get-users";
import { removeCPF } from "~/utils/mask";

// Mock da função getUsers e removeCPF
jest.mock("../api/get-users");
jest.mock("~/utils/mask", () => ({
  removeCPF: jest.fn((value) => value.replace(/[^\d]/g, "")),
}));

describe("useRegistrations Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => useRegistrations());

    // Verifica os valores iniciais do hook
    expect(result.current.users).toEqual([]);
    expect(result.current.status).toBe("loading");
    expect(result.current.error).toBeNull();
  });

  it("should handle successful fetch of users", async () => {
    const mockUsers = [
      { id: "1", employeeName: "John Doe", email: "john@example.com" },
    ];
    (getUsers as jest.Mock).mockResolvedValueOnce(mockUsers);

    const { result, waitForNextUpdate } = renderHook(() => useRegistrations());

    // A primeira chamada ao hook deve iniciar o fetch
    expect(result.current.status).toBe("loading");

    // Aguarda a próxima atualização do estado
    await waitForNextUpdate();

    // Verifica o estado após o fetch bem-sucedido
    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.status).toBe("succeeded");
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch error", async () => {
    (getUsers as jest.Mock).mockRejectedValueOnce(new Error("Fetch failed"));

    const { result, waitForNextUpdate } = renderHook(() => useRegistrations());

    // A primeira chamada ao hook deve iniciar o fetch
    expect(result.current.status).toBe("loading");

    // Aguarda a próxima atualização do estado
    await waitForNextUpdate();

    // Verifica o estado após o fetch falhar
    expect(result.current.users).toEqual([]);
    expect(result.current.status).toBe("failed");
    expect(result.current.error).toBe("Erro ao obter a lista de usuários");
  });

  it("should set error when no users are returned with CPF", async () => {
    const { result } = renderHook(() => useRegistrations());
    await act(async () => {
      (getUsers as jest.Mock).mockResolvedValueOnce([]);

      await result.current.fetch("123.456.789-00");
    });

    // Verifica se o erro foi configurado corretamente
    expect(result.current.error).toBe("Nenhum usuário encontrado");
    expect(result.current.status).toBe("failed");
  });

  it("should call fetch with CPF", async () => {
    const { result } = renderHook(() => useRegistrations());
    const mockUsers = [
      { id: "2", employeeName: "Jane Doe", email: "jane@example.com" },
    ];
    (getUsers as jest.Mock).mockResolvedValueOnce(mockUsers);

    await act(async () => {
      (getUsers as jest.Mock).mockResolvedValueOnce([]);

      await result.current.fetch("123.456.789-00");
    });

    // Verifica se o CPF foi removido corretamente e o fetch foi feito
    expect(removeCPF).toHaveBeenCalledWith("123.456.789-00");
    expect(getUsers).toHaveBeenCalledWith({ cpf: "12345678900" });

    // Verifica o estado após o fetch
    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.status).toBe("succeeded");
    expect(result.current.error).toBeNull();
  });
});
