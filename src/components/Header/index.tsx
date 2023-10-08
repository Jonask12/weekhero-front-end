import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo_branca.png'
import { CgProfile } from 'react-icons/cg'
import { useState } from 'react';
import { useAuth } from '../../hooks/auth';

export function Header() {
  const { signOut } = useAuth();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  return (
    <header className="bg-primary-500 p-4 pt-[1.5rem] m-[1.5rem] rounded-md flex justify-between items-center text-white-500">
      <div className="flex items-center" onClick={() => navigate('/dashboard')}>
        <img src={logo} alt="" className='mr-[.5rem] cursor-pointer' />
        <span>Hero HairDresses</span>
      </div>

      <div className='flex items-center mr-[.5rem] gap-1'>
        <div className='relative flex items-center gap-2' onClick={() => setOpen(!open)}>
          <CgProfile size={18} />
          <span className='cursor-pointer'>Perfil</span>
          <ul className={`absolute bg-primary-500 top-[90%] right-[-24px] p-0 rounded-md ${open && `opacity-0`} ease-in duration-300`}>
            <Link to={'/schedules'}>
              <li className='pl-[.7rem] pr-[.7rem] pt-4 hover:bg-teal-500 hover:rounded-md'>Agendamento</li>
            </Link>
            <Link to={'/edit-profile'}>
              <li className='pl-[.7rem] pr-[.7rem] pt-4 hover:bg-teal-500 hover:rounded-md'>Editar Perfil</li>
            </Link>
            <Link to={'/products'}>
              <li className='pl-[.7rem] pr-[.7rem] pt-4 hover:bg-teal-500 hover:rounded-md'>Produtos</li>
            </Link>
            <li className='pl-[.7rem] pr-[.7rem] pt-4 hover:bg-teal-500 hover:rounded-md' onClick={signOut}>Sair</li>
          </ul>
        </div>
      </div>
    </header>
  )
}