import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "./index";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";

// Mock das funções e componentes externos
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));
jest.mock("~/utils/mask", () => ({
  CPFMask: jest.fn((value) => value),
  removeCPF: jest.fn((value) => value.replace(/[^\d]/g, "")),
}));

describe("SearchBar Component", () => {
  const mockHandleRefresh = jest.fn();
  const mockFetch = jest.fn();
  const mockHistoryPush = jest.fn();

  beforeEach(() => {
    (useHistory as jest.Mock).mockReturnValue({
      push: mockHistoryPush,
    });
    jest.clearAllMocks();
  });

  it("should render input field and buttons", () => {
    render(<SearchBar handleRefresh={mockHandleRefresh} fetch={mockFetch} />);

    // Verifica se o campo de input e os botões estão sendo renderizados
    expect(screen.getByPlaceholderText("Digite um CPF válido"))
      .toBeInTheDocument;
    expect(screen.getByRole("button", { name: /nova admissão/i }))
      .toBeInTheDocument;
    expect(screen.getByLabelText("refetch")).toBeInTheDocument;
  });

  it("should call fetch when typing a valid CPF or clearing the input", () => {
    render(<SearchBar handleRefresh={mockHandleRefresh} fetch={mockFetch} />);

    const input = screen.getByPlaceholderText("Digite um CPF válido");

    // Simula a digitação de um CPF válido
    fireEvent.change(input, { target: { value: "123.456.789-00" } });
    expect(mockFetch).toHaveBeenCalledWith("12345678900");

    // Simula a exclusão do valor no input (limpando o campo)
    fireEvent.change(input, { target: { value: "" } });
    expect(mockFetch).toHaveBeenCalledWith("");
  });

  it("should not call fetch for incomplete CPF input", () => {
    render(<SearchBar handleRefresh={mockHandleRefresh} fetch={mockFetch} />);

    const input = screen.getByPlaceholderText("Digite um CPF válido");

    // Simula a digitação de um CPF incompleto
    fireEvent.change(input, { target: { value: "123.456" } });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should call handleRefresh when refresh button is clicked", () => {
    render(<SearchBar handleRefresh={mockHandleRefresh} fetch={mockFetch} />);

    // Simula o clique no botão de "refresh"
    fireEvent.click(screen.getByLabelText("refetch"));
    expect(mockHandleRefresh).toHaveBeenCalled();
  });

  it("should navigate to new user page when 'Nova Admissão' button is clicked", () => {
    render(<SearchBar handleRefresh={mockHandleRefresh} fetch={mockFetch} />);

    // Simula o clique no botão "Nova Admissão"
    fireEvent.click(screen.getByRole("button", { name: /nova admissão/i }));
    expect(mockHistoryPush).toHaveBeenCalledWith(routes.newUser);
  });
});
