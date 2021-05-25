import { useState } from "react";

import { useForm } from "react-hook-form";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { consultarCep } from "correios-brasil";
import { cpf as validator } from "cpf-cnpj-validator";
import { isFuture, differenceInYears, format } from "date-fns";

import cepMask from "../../utils/cepMask";
import cpfMask from "../../utils/cpfMask";

import Button from "../Button";
import Input from "../Input";

import "./styles.scss";
import { useHistory } from "react-router";

interface Address {
  uf: string;
  localidade: string;
  bairro: string;
  logradouro: string;
  complemento: string;
  numero: number;
  cep?: string;
}

interface DataForm {
  cep?: string;
  name: string;
  cpf: string;
  birthday: string | Date;
  address?: Address;
}

interface SignupProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const Signup: React.FC<SignupProps> = ({ className, ...props }) => {
  const { register, handleSubmit, setValue, reset } = useForm<DataForm>();
  const { push } = useHistory();

  const [invalidLabels, setInvalidLabels] = useState<string[]>([]);

  const removeInvalidLabel = (list: string[], str: string) => {
    return list.filter((item) => item !== str);
  };

  const setAddress = (address: Address | null) => {
    const data: Address =
      address ||
      ({
        uf: "",
        localidade: "",
        bairro: "",
        logradouro: "",
        complemento: "",
      } as Address);

    setValue("address", data);
  };

  const loadAddress = (cep: string) => {
    if (cep.length === 9)
      consultarCep(cepMask(cep))
        .then((address) => {
          if (!address) {
            setInvalidLabels((prev) => [...prev, "cep"]);

            return;
          }

          const { uf, localidade, bairro, logradouro, complemento } = address;

          setAddress({
            uf,
            localidade,
            bairro,
            logradouro,
            complemento,
          } as Address);
        })
        .catch((err) => {
          setInvalidLabels((prev) => [...prev, "cep"]);

          console.log(err);
        });
    else setAddress(null);
  };

  const onSubmit = (data: DataForm) => {
    const { name, cpf, birthday, cep, address } = data;

    const currentDate = new Date();
    const timestamps = currentDate.getTime();
    const invalid: string[] = [];

    if (!name) invalid.push("name");
    if (!validator.isValid(cpf)) invalid.push("cpf");
    if (!cep || cep.length < 9) invalid.push("cep");
    if (
      differenceInYears(currentDate, new Date(birthday)) >= 120 ||
      isFuture(new Date(birthday))
    )
      invalid.push("birthday");

    if (invalid.length || !address) {
      setInvalidLabels(invalid);

      return;
    }

    const form: DataForm = {
      name,
      cpf: cpfMask(cpf),
      birthday: format(new Date(birthday), "yyyy-MM-dd"),
      address: {
        cep: cepMask(cep || ""),
        ...address,
      },
    };

    localStorage.setItem(`user-${timestamps}`, JSON.stringify(form));

    reset();
    push(`/success/t/${timestamps}`);
  };

  return (
    <form
      className={`signupContainer ${className || ""}`}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <fieldset>
        <legend>Dados Pessoais</legend>

        <div>
          <Input
            id="name"
            label="Nome"
            invalid={invalidLabels.includes("name")}
            required
            {...register("name", {
              required: true,
              setValueAs: (value) => {
                setInvalidLabels((prev) => removeInvalidLabel(prev, "name"));

                return value;
              },
            })}
          />
          <Input
            id="cpf"
            label="CPF"
            inputMode="numeric"
            maxLength={14}
            invalid={invalidLabels.includes("cpf")}
            required
            {...register("cpf", {
              required: true,
              setValueAs: (value) => {
                setInvalidLabels((prev) => removeInvalidLabel(prev, "cpf"));

                return cpfMask(value);
              },
            })}
            onChange={(ev) => {
              const value = cpfMask(ev.target.value || "");

              ev.target.value = value;

              setValue("cpf", value);
            }}
          />
          <Input
            id="birthday"
            label="Data de nascimento"
            type="date"
            invalid={invalidLabels.includes("birthday")}
            required
            {...register("birthday", {
              required: true,
              setValueAs: (value) => {
                setInvalidLabels((prev) =>
                  removeInvalidLabel(prev, "birthday")
                );

                return value;
              },
            })}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Endereço</legend>

        <div>
          <Input
            id="cep"
            label="CEP"
            maxLength={9}
            required
            invalid={invalidLabels.includes("cep")}
            {...register("cep", {
              setValueAs: (value) => {
                const str = cepMask(value);

                loadAddress(str);
                setInvalidLabels((prev) => removeInvalidLabel(prev, "cep"));

                return str;
              },
            })}
            onChange={(ev) => {
              const value = cepMask(ev.target.value || "");

              ev.target.value = value;

              setValue("cep", value);
            }}
          />

          <Input
            id="uf"
            label="UF"
            required
            readOnly
            {...register("address.uf")}
          />
          <Input
            id="localidade"
            label="Cidade"
            required
            readOnly
            {...register("address.localidade", {
              required: true,
            })}
          />
          <Input
            id="bairro"
            label="Bairro"
            required
            readOnly
            {...register("address.bairro", {
              required: true,
            })}
          />
          <Input
            id="logradouro"
            label="Logradouro"
            required
            readOnly
            {...register("address.logradouro", {
              required: true,
            })}
          />
          <Input
            id="numero"
            label="Número"
            type="number"
            required
            {...register("address.numero", {
              required: true,
            })}
          />
          <Input
            id="complemento"
            label="Complemento"
            {...register("address.complemento")}
          />
        </div>
      </fieldset>

      <Button icon={<BsFillPersonCheckFill />} type="submit" className="teste">
        Cadastrar-se
      </Button>
    </form>
  );
};

export default Signup;
