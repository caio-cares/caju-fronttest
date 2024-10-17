import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { User } from "~/types/user";
import {
  approveUser,
  deleteUser,
  reproveUser,
  reviewUser,
} from "../../api/user-action";
import { useToast } from "~/context/toast-context";
import { Status } from "~/types/status";
import Collumns from ".";

// Mock do RegistrationCard
jest.mock("../RegistrationCard", () => ({ data, handleAction }: any) => (
  <div data-testid="registration-card">
    <span>{data.name}</span>
    <button onClick={() => handleAction(data, "approve")}>Approve</button>
    <button onClick={() => handleAction(data, "delete")}>Delete</button>
  </div>
));

// Mock das funções de ação de usuário
jest.mock("../../api/user-action", () => ({
  approveUser: jest.fn(),
  deleteUser: jest.fn(),
  reproveUser: jest.fn(),
  reviewUser: jest.fn(),
}));

// Mock do Toast Context
jest.mock("~/context/toast-context", () => ({
  useToast: jest.fn(),
}));

describe("Collumns Component", () => {
  const mockRefetch = jest.fn();
  const mockShowToast = jest.fn();

  const mockRegistrations: User[] = [
    {
      admissionDate: "22/10/2023",
      email: "luiz@caju.com.br",
      employeeName: "Luiz Filho",
      status: Status.APPROVED,
      cpf: "56642105087",
      id: "3",
    },
    {
      id: "1",
      admissionDate: "22/10/2023",
      email: "filipe@caju.com.br",
      employeeName: "Filipe Marins",
      status: Status.REVIEW,
      cpf: "78502270001",
    },
    {
      id: "2",
      admissionDate: "22/10/2023",
      email: "jose@caju.com.br",
      employeeName: "José Leão",
      status: Status.REPROVED,
      cpf: "78502270001",
    },
    {
      id: "a5cb",
      employeeName: "caio cares",
      email: "caiocares@gmail.com",
      cpf: "35072457877",
      admissionDate: "2024-10-18",
      status: Status.REVIEW,
    },
  ];

  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({
      show: mockShowToast,
    });
  });

  // it("should render columns and registrations correctly", () => {
  //   render(
  //     <Collumns registrations={mockRegistrations} refetch={mockRefetch} />
  //   );

  //   // Verifica se os títulos das colunas foram renderizados
  //   expect(screen.getByText("Pronto para revisar")).toBeInTheDocument();
  //   expect(screen.getByText("Aprovado")).toBeInTheDocument();
  //   expect(screen.getByText("Reprovado")).toBeInTheDocument();

  //   // Verifica se os usuários corretos foram renderizados em suas colunas respectivas
  //   expect(screen.getByText("User 1")).toBeInTheDocument();
  //   expect(screen.getByText("User 2")).toBeInTheDocument();
  //   expect(screen.getByText("User 3")).toBeInTheDocument();
  // });

  // it("should handle action on approve user", async () => {
  //   render(
  //     <Collumns registrations={mockRegistrations} refetch={mockRefetch} />
  //   );

  //   // Aprovar um usuário
  //   fireEvent.click(screen.getByText("Approve"));

  //   await waitFor(() => {
  //     expect(approveUser).toHaveBeenCalledWith(mockRegistrations[0]);
  //   });

  //   expect(mockShowToast).toHaveBeenCalledWith(
  //     "success",
  //     "Sucesso",
  //     "Ação executada com sucesso"
  //   );
  //   expect(mockRefetch).toHaveBeenCalled();
  // });

  it("should handle action on delete user", async () => {
    render(
      <Collumns registrations={mockRegistrations} refetch={mockRefetch} />
    );

    screen.debug();

    // // Deletar um usuário
    // fireEvent.click(screen.getByText("Delete"));

    // await waitFor(() => {
    //   expect(deleteUser).toHaveBeenCalledWith(mockRegistrations[0]);
    // });

    // expect(mockShowToast).toHaveBeenCalledWith(
    //   "success",
    //   "Sucesso",
    //   "Ação executada com sucesso"
    // );
    // expect(mockRefetch).toHaveBeenCalled();
  });
});
