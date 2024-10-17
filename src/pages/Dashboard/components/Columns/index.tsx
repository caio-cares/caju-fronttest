import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { User } from "~/types/user";
import {
  approveUser,
  deleteUser,
  reproveUser,
  reviewUser,
} from "../../api/user-action";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { useToast } from "~/context/toast-context";

const allColumns = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

type Props = {
  registrations?: User[];
  refetch: () => void;
};

const Collumns = (props: Props) => {
  const { show } = useToast();

  const handleFriendlyAction = (action: string) => {
    switch (action) {
      case "delete":
        return "deletar";
      case "approve":
        return "aprovar";
      case "reprove":
        return "reprovar";
      default:
        return "revisar";
    }
  };
  const handleAction = async (user: User, action: string) => {
    confirmDialog({
      message: `Deseja ${handleFriendlyAction(action)} este usuário?`,
      header: "Atenção",
      icon: "pi pi-exclamation-triangle",
      accept: () => handleOnConfirm(user, action),
      reject: () => {
        show("info", "Atenção", "Ação não executada");
      },
      acceptLabel: "Sim",
      rejectLabel: "Não",
    });
  };

  const handleOnConfirm = async (user: User, action: string) => {
    try {
      if (action === "delete") {
        await deleteUser(user);
      }
      if (action === "approve") {
        await approveUser(user);
      }
      if (action === "reprove") {
        await reproveUser(user);
      }
      if (action === "review") {
        await reviewUser(user);
      }

      show("success", "Sucesso", "Ação executada com sucesso");
      props.refetch();
    } catch (err) {
      show("error", "Erro", "Ação executada com erro");
    }
  };

  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
                {props?.registrations?.map(
                  (registration) =>
                    registration.status === collum.status && (
                      <RegistrationCard
                        data={registration}
                        key={registration.id}
                        handleAction={handleAction}
                      />
                    )
                )}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}

      <ConfirmDialog />
    </S.Container>
  );
};
export default Collumns;
