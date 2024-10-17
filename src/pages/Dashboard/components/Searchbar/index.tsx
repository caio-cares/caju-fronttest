import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { FC, useEffect, useState } from "react";
import { CPFMask, removeCPF } from "~/utils/mask";

type SearchBarProps = {
  handleRefresh: () => void;
  fetch: (cpf?: string) => void;
};

export const SearchBar: FC<SearchBarProps> = ({ handleRefresh, fetch }) => {
  const [maskedCpf, setMaskedCpf] = useState("");
  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMaskedCpf(CPFMask(inputValue));
    if (inputValue.length === 14 || inputValue.length === 0) {
      fetch(removeCPF(inputValue));
    }
  };

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        maxLength={14}
        onChange={handleSearchChange}
        value={maskedCpf}
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={handleRefresh}>
          <HiRefresh />
        </IconButton>
        <Button
          onClick={() => goToNewAdmissionPage()}
          data-testid="new-admission-button"
        >
          Nova Admissão
        </Button>
      </S.Actions>
    </S.Container>
  );
};
