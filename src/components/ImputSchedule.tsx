import { forwardRef, ForwardRefRenderFunction } from 'react'

interface IInput {
  placeholder: string;
  type: 'password' | 'text' | 'date';
  error?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> = ({ placeholder, type, error, ...rest }, ref, ) => {
  return (
    <div className="flex flex-col mb-5">
      <label className="text-primary-500" htmlFor="">
       {placeholder}
      </label>
        <input className='w-full py-[.7rem] px-[.7rem] rounded-2xl border-[1px] border-primary-500 bg-transparent' type={type} ref={ref} {...rest}/>
      {error && <span className='text-red-600'>{error}</span>}
    </div>
  )
}

export const InputSchedule = forwardRef(InputBase);