import { Link } from 'react-router-dom'
import { Input } from '../../components/input'
import logo from '/src/assets/logo.webp'
import { Button } from '../../components/Button'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiUser } from 'react-icons/fi'
import { AiOutlineMail } from 'react-icons/ai';
import { BsKey } from 'react-icons/bs'
import { api } from '../../service/api';


interface IFormValues {
  name: string;
  email: string;
  password: string;
}



export function Register() {
  const schema = yup.object().shape({
    name: yup.string().required('O nome é obrigatório.'),
    email: yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
    password: yup.string().min(6, 'Mínimo de 6 caracteres').required('Senha é obrigatporio')
  });

  const { register, handleSubmit, formState: {errors}} = useForm<IFormValues>({ resolver: yupResolver(schema)});

  const submit = handleSubmit( async (data) => {
    const result = await api.post('/users', {
      name: data.name,
      email: data.email,
      password: data.password,
    });
    
    console.log(result);
    
  });

  return(
    <div className="bg-background h-screen bg-repeat bg-cover">
      <div>
        <p className='text-white-500 pt-8'>
          <Link className='text-white-500 underline' to={'/'}>Home</Link> {'>'} Área de Cadastro
        </p>
        <div className='flex w-full items-center h-screen'>
          <div className='w-6/12 flex items-center justify-center'>
            <img src={logo} />
          </div>
          <div className='bg-gray-100 shadow-black-500 rounded-xl p-[3rem] items-center w-6/12'>
            <h2 className='text-white-500 font-light text-[2rem] mb-6'>Área de Cadastro</h2>
            <form onSubmit={submit}>
            <Input
                placeholder="Nome"
                type="text"
                {...register('name', { required: true })}
                error={errors.name && errors.name.message}
                icon={<FiUser size={20}/>}
              />
              <Input
                placeholder="E-mail"
                type="text"
                {...register('email', { required: true })}
                error={errors.email && errors.email.message}
                icon={<AiOutlineMail size={20}/>}
              
              />
              <Input
                placeholder="Senha"
                type="password"
               {...register('password', { required: true })}
               error={errors.password && errors.password.message}
               icon={<BsKey size={20}/>}
              />
              <Button
              text="Cadastrar"
               />
            </form>
            <div className='text-left mt-4 text-[.8rem]'>
              <span className='text-white-500 font-light'>
                Já tem cadastro? <Link className='underline' to={'/'}>Voltar à página inicial</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}