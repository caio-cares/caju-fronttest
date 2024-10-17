import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import * as userActions from "../../api/user-action";
import { useToast } from "~/context/toast-context";
import { User } from "~/types/user";
import { Status } from "~/types/status";
import "@testing-library/jest-dom";
import Collumns from ".";
import { confirmDialog } from "primereact/confirmdialog";

// Mock das dependências externas
jest.mock("../../api/user-action", () => ({
  approveUser: jest.fn(),
  deleteUser: jest.fn(),
  reproveUser: jest.fn(),
  reviewUser: jest.fn(),
}));

jest.mock("~/context/toast-context", () => ({
  useToast: jest.fn(),
}));

// Dados simulados
const mockUsers: User[] = [
  {
    id: "1",
    employeeName: "User One",
    cpf: "123.456.789-00",
    status: Status.REVIEW,
    email: "user1@example.com",
    admissionDate: "2021-10-10",
  },
  {
    id: "2",
    employeeName: "User Two",
    cpf: "123.456.789-00",
    status: Status.APPROVED,
    email: "user2@example.com",
    admissionDate: "2021-10-10",
  },
  {
    id: "3",
    employeeName: "User Three",
    cpf: "123.456.789-00",
    status: Status.REPROVED,
    email: "user3@example.com",
    admissionDate: "2021-10-10",
  },
];

describe("Collumns Component", () => {
  const mockRefetch = jest.fn();
  const mockShow = jest.fn();

  beforeAll(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ show: mockShow });

    // Espionar a função confirmDialog e mockar sua implementação
    jest
      .spyOn(require("primereact/confirmdialog"), "confirmDialog")
      .mockImplementation((options: any) => {
        if (options && options.accept) {
          options.accept();
        }
      });
  });

  it("deve renderizar as colunas e cartões corretamente", () => {
    render(<Collumns registrations={mockUsers} refetch={mockRefetch} />);

    expect(screen.getByText("Pronto para revisar")).toBeInTheDocument();
    expect(screen.getByText("Aprovado")).toBeInTheDocument();
    expect(screen.getByText("Reprovado")).toBeInTheDocument();

    expect(screen.getByText("User One")).toBeInTheDocument();
    expect(screen.getByText("User Two")).toBeInTheDocument();
    expect(screen.getByText("User Three")).toBeInTheDocument();
  });

  it("deve aprovar um usuário corretamente", async () => {
    render(<Collumns registrations={mockUsers} refetch={mockRefetch} />);
    const approveButton = screen.getAllByText("Aprovar")[0];
    fireEvent.click(approveButton);

    // Espera que o `confirmDialog` tenha sido chamado
    expect(confirmDialog).toHaveBeenCalled();

    // Verifica se o usuário foi aprovado corretamente
    await waitFor(() => {
      expect(userActions.approveUser).toHaveBeenCalledWith(mockUsers[0]);
    });

    expect(mockShow).toHaveBeenCalledWith(
      "success",
      "Sucesso",
      "Ação executada com sucesso"
    );
    expect(mockRefetch).toHaveBeenCalled();
  });

  it("deve reprovar um usuário corretamente", async () => {
    render(<Collumns registrations={mockUsers} refetch={mockRefetch} />);
    const approveButton = screen.getAllByText("Reprovar")[0];
    fireEvent.click(approveButton);

    // Espera que o `confirmDialog` tenha sido chamado
    expect(confirmDialog).toHaveBeenCalled();

    // Verifica se o usuário foi aprovado corretamente
    await waitFor(() => {
      expect(userActions.approveUser).toHaveBeenCalledWith(mockUsers[0]);
    });

    expect(mockShow).toHaveBeenCalledWith(
      "success",
      "Sucesso",
      "Ação executada com sucesso"
    );
    expect(mockRefetch).toHaveBeenCalled();
  });
  it("deve revisar um usuário corretamente", async () => {
    render(<Collumns registrations={mockUsers} refetch={mockRefetch} />);
    const approveButton = screen.getAllByText("Revisar novamente")[0];
    fireEvent.click(approveButton);

    // Espera que o `confirmDialog` tenha sido chamado
    expect(confirmDialog).toHaveBeenCalled();

    // Verifica se o usuário foi aprovado corretamente
    await waitFor(() => {
      expect(userActions.approveUser).toHaveBeenCalledWith(mockUsers[0]);
    });

    expect(mockShow).toHaveBeenCalledWith(
      "success",
      "Sucesso",
      "Ação executada com sucesso"
    );
    expect(mockRefetch).toHaveBeenCalled();
  });
});
