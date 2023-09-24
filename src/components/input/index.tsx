import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react'

interface IInput {
  placeholder: string;
  type: 'password' | 'text' | 'date';
  error?: string;
  icon?: ReactNode;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = ({ placeholder, type, icon, error, ...rest }, ref, ) => {
  return (
    <div className="flex flex-wrap w-full items-center mb-[1.5rem]">
      <label className="relative w-full flex items-center" htmlFor="">
        <i className="absolute pl-[.5rem] left-0" aria-hidden="true">
          {icon}
        </i>
        <input className='w-full py-[.7rem] px-[2.2rem] rounded border-gray-50' type={type} placeholder={placeholder} ref={ref} {...rest}/>
      </label>
      {error && <span className='text-red-600'>{error}</span>}
    </div>
  )
}

export const Input = forwardRef(InputBase);