import { useForm } from "react-hook-form";
import { Header } from "../../components/Header";
import { InputSchedule } from "../../components/ImputSchedule";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import imageDefaut from "../../assets/imageDeafaut.png";
import { FiEdit2 } from "react-icons/fi";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { api } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";

interface IData {
  newPassword?: string;
  oldPassword?: string;
  name?: string;
  avatar_url?: File;
}

interface IFormValues {
  picture: File[];
  name: string;
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export function EditProfile() {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup.string(),
    newPassword: yup.string(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "As senhas devem ser iguais"),
  });

  const { register, handleSubmit, setValue } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const [fileUpload, setFileUpload] = useState(imageDefaut);

  useEffect(() => {
    const userStorage = localStorage.getItem("user:week-hero");
    const user = userStorage && JSON.parse(userStorage);

    setValue("name", user.name);
    setValue("email", user.email);
    setValue("picture", user.avatar_url);
  }, []);

  const submit = handleSubmit(
    async ({ name, password, newPassword, picture }: IFormValues) => {
      const data: IData = {
        name,
      };

      if (password && newPassword) {
        data.oldPassword = password;
        data.newPassword = newPassword;
      }

      if (picture) {
        data.avatar_url = picture[0];
      }

      try {
        const result = await api.put("/users", data, {
          headers: {
            "Content-Type": "multpart/form-data",
          },
        });

        console.log(result);

        toast.success("Usuário atualizado com sucesso");
        navigate("/dashboard");
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message);
        }
      }
    }
  );

  const handleImage = (files: File[]) => {
    const image = files[0];
    const imageUrl = URL.createObjectURL(image);
    setFileUpload(imageUrl);
  };

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <Header />
        <div className = "w-1/2 m-auto mt-8">
          <form action="" onSubmit={submit}>
            {imageDefaut && (
              <div className="w-full text-center relative">
                <img
                  src={fileUpload}
                  alt=""
                  className="w-[150px] h-[150px] rounded-[50%]"
                ></img>
                <label className="bg-primary-500 p-2 rounded-full absolute inline-flex text-white-500 bottom-3 right-[35%] cursor-pointer">
                  <input
                    className="hidden"
                    type="file"
                    {...register("picture", {
                      required: true,
                      onChange: (e) => handleImage(e.target.files),
                    })}
                  />
                  <FiEdit2 />
                </label>
              </div>
            )}
            <InputSchedule
              placeholder="Nome"
              type="text"
              {...register("name", { required: true })}
            />
            <InputSchedule
              placeholder="E-mail"
              type="text"
              {...register("email", { required: true })}
            />
            <InputSchedule
              placeholder="Senha Atual"
              type="password"
              {...register("password", { required: true })}
            />
            <InputSchedule
              placeholder="Nova Senha"
              type="password"
              {...register("newPassword", { required: true })}
            />
            <InputSchedule
              placeholder="Confirmar nova senha"
              type="password"
              {...register("confirmPassword", { required: true })}
            />
            <div className="flex items-center justify-center mt-8">
              <button className="border-2 border-secondary-500 bg-secondary-500 text-white-500 cursor-pointer font-light rounded-2xl px-[.rem] py-[.4rem] w-[40%] hover:bg-blue-900">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

