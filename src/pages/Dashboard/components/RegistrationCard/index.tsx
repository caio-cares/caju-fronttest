import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Status } from "~/types/status";
import { User } from "~/types/user";
import { FC } from "react";

type RegistrationCardProps = {
  data: User;
  handleAction: (data: User, action: string) => void;
};

const RegistrationCard: FC<RegistrationCardProps> = ({
  data,
  handleAction,
}) => {
  return (
    <S.Card data-testid={`user-card-${data.id}`}>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {data.status === "REVIEW" && (
          <>
            <ButtonSmall
              bgcolor="rgb(255, 145, 154)"
              data-testid="reprove-button"
              onClick={() => handleAction(data, "reprove")}
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              data-testid="approve-button"
              bgcolor="rgb(155, 229, 155)"
              onClick={() => handleAction(data, "approve")}
            >
              Aprovar
            </ButtonSmall>
          </>
        )}

        {(data.status === Status.APPROVED ||
          data.status === Status.REPROVED) && (
          <ButtonSmall
            bgcolor="#ff8858"
            onClick={() => handleAction(data, "review")}
            data-testid="review-button"
          >
            Revisar novamente
          </ButtonSmall>
        )}

        <HiOutlineTrash
          onClick={() => handleAction(data, "delete")}
          data-testid="delete-button"
        />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
