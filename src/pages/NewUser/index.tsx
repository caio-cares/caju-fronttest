import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiOutlineArrowLeft } from "react-icons/hi";
import * as S from "./styles";
import TextField from "~/components/TextField";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { CPFMask } from "~/utils/mask";
import { formSchema } from "./utils/form.schema";
import { createUser } from "./api/create-user";
import { Status } from "~/types/status";

const NewUserPage = () => {
  const history = useHistory();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const { register, handleSubmit, formState, setValue, watch } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeName: "",
      email: "",
      cpf: "",
      admissionDate: "",
      status: Status.REVIEW,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createUser({ data: values });

    history.push(routes.dashboard);
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            placeholder="Nome"
            label="Nome"
            onChange={(e) => setValue("employeeName", e.target.value)}
          />

          {formState.errors.employeeName && (
            <p>{formState.errors.employeeName.message}</p>
          )}

          <TextField
            placeholder="Email"
            label="Email"
            type="email"
            onChange={(e) => setValue("email", e.target.value)}
          />

          {formState.errors.email && <p>{formState.errors.email.message}</p>}

          <TextField
            placeholder="CPF"
            label="CPF"
            onChange={(e) => setValue("cpf", CPFMask(e.target.value))}
            maxLength={14}
            value={watch("cpf")}
          />

          {formState.errors.cpf && <p>{formState.errors.cpf.message}</p>}

          <TextField
            label="Data de admissão"
            type="date"
            onChange={(e) => setValue("admissionDate", e.target.value)}
          />
          <Button type="submit" data-testid="create-new-admission">
            Cadastrar
          </Button>
        </form>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
