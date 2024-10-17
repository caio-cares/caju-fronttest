import { render, screen, fireEvent } from "@testing-library/react";
import RegistrationCard from "./index";
import { User } from "~/types/user";
import { Status } from "~/types/status";

// Mock do ButtonSmall
jest.mock("~/components/Buttons", () => ({
  ButtonSmall: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe("RegistrationCard Component", () => {
  const mockHandleAction = jest.fn();

  const mockUser: User = {
    id: "1",
    employeeName: "John Doe",
    email: "john@example.com",
    admissionDate: "2023-09-12",
    status: Status.REVIEW,
    cpf: "12345678900",
  };

  it("should render user data correctly", () => {
    render(
      <RegistrationCard data={mockUser} handleAction={mockHandleAction} />
    );

    // Verifica se os dados do usuário foram renderizados corretamente
    expect(screen.getByText("John Doe")).toBeInTheDocument;
    expect(screen.getByText("john@example.com")).toBeInTheDocument;
    expect(screen.getByText("2023-09-12")).toBeInTheDocument;
  });

  it("should render correct buttons for 'REVIEW' status", () => {
    render(
      <RegistrationCard data={mockUser} handleAction={mockHandleAction} />
    );

    // Verifica se os botões "Reprovar" e "Aprovar" são renderizados quando o status é "REVIEW"
    expect(screen.getByText("Reprovar")).toBeInTheDocument;
    expect(screen.getByText("Aprovar")).toBeInTheDocument;
  });

  it("should call handleAction with correct parameters when 'Aprovar' button is clicked", () => {
    render(
      <RegistrationCard data={mockUser} handleAction={mockHandleAction} />
    );

    // Simula o clique no botão "Aprovar"
    fireEvent.click(screen.getByText("Aprovar"));

    // Verifica se a função handleAction foi chamada com os parâmetros corretos
    expect(mockHandleAction).toHaveBeenCalledWith(mockUser, "approve");
  });

  it("should call handleAction with correct parameters when 'Reprovar' button is clicked", () => {
    render(
      <RegistrationCard data={mockUser} handleAction={mockHandleAction} />
    );

    // Simula o clique no botão "Reprovar"
    fireEvent.click(screen.getByText("Reprovar"));

    // Verifica se a função handleAction foi chamada com os parâmetros corretos
    expect(mockHandleAction).toHaveBeenCalledWith(mockUser, "reprove");
  });

  it("should render 'Revisar novamente' button for 'APPROVED' status", () => {
    const approvedUser = { ...mockUser, status: Status.APPROVED };
    render(
      <RegistrationCard data={approvedUser} handleAction={mockHandleAction} />
    );

    // Verifica se o botão "Revisar novamente" é renderizado quando o status é "APPROVED"
    expect(screen.getByText("Revisar novamente")).toBeInTheDocument;
  });

  it("should call handleAction with correct parameters when 'Revisar novamente' button is clicked", () => {
    const approvedUser = { ...mockUser, status: Status.APPROVED };
    render(
      <RegistrationCard data={approvedUser} handleAction={mockHandleAction} />
    );

    // Simula o clique no botão "Revisar novamente"
    fireEvent.click(screen.getByText("Revisar novamente"));

    // Verifica se a função handleAction foi chamada com os parâmetros corretos
    expect(mockHandleAction).toHaveBeenCalledWith(approvedUser, "review");
  });

  it("should call handleAction with correct parameters when trash icon is clicked", () => {
    render(
      <RegistrationCard data={mockUser} handleAction={mockHandleAction} />
    );

    // Simula o clique no ícone de deletar (lixeira)
    fireEvent.click(screen.getByTestId("delete-button"));

    // Verifica se a função handleAction foi chamada com os parâmetros corretos
    expect(mockHandleAction).toHaveBeenCalledWith(mockUser, "delete");
  });
});
