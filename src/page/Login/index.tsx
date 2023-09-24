import { useForm } from 'react-hook-form'
import { Input } from '../../components/input'
import logo from '/src/assets/logo.webp'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '../../components/Button'
import { Link } from 'react-router-dom'
import { AiOutlineMail } from 'react-icons/ai'
import { BsKey } from 'react-icons/bs'
import { useAuth } from '../../hooks/auth'

interface IFormValues {
  email: string;
  password: string;
}

export function Login() {
  const { signIn } = useAuth();

  const schema = yup.object().shape({
    email: yup.string().email('Digite um e-mail válido').required('E-mail é um campo obrigatório'),
    password: yup.string().required('A senha é um campo obrigatório'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const submit = handleSubmit(async ({ email, password }) => {
    try {
      signIn({ email, password});
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="bg-background h-screen bg-repeat bg-cover flex items-center">
      <div className="w-full ml-auto mr-auto pl-4 pr-4 flex justify-end">
        <div className='flex flex-wrap flex-col w-[50%] p-8 first: items-center'>
          <div>
            <img src={logo} />
          </div>
          <div className='bg-gray-100 shadow-black-500 rounded-xl p-[3rem] items-center'>
            <h2 className='text-white-500 font-light text-[2rem] mb-6'>Olá, seja bem vindo!</h2>
            <form onSubmit={submit}>
              <Input
                placeholder="E-mail"
                type="text"
                {...register('email', { required: true })}
                error={errors.email && errors.email.message}
                icon={<AiOutlineMail size={20} />}
              />
              <Input
                placeholder="Senha"
                type="password"
                {...register('password', { required: true })}
                error={errors.password && errors.password.message}
                icon={<BsKey size={20} />}
              />
              <Button
                text="Entrar"
              />
            </form>
            <div className='text-left mt-4 text-[.8rem]'>
              <span className='text-white-500 font-light'>
                Ainda não tem uma conta? <Link className='underline' to={'/register'}>Cadastra-se</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}