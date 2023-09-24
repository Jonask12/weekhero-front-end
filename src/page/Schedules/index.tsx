import { useForm } from "react-hook-form";
import { Header } from "../../components/Header";
import { InputSchedule } from "../../components/ImputSchedule";
import { useAuth } from "../../hooks/auth";
import { formatISO, getHours, parseISO, setHours } from "date-fns";
import { useState } from "react";
import { api } from "../../service/api";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineClose } from 'react-icons/ai'

interface IFormValues {
  date: string;
  name: string;
  phone: string;
  hour: string;
}

export function Schedules() {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    phone: yup.string().required('O telefone é um campo obrigatório'),
    name: yup.string().required('O nome é um campo obrigatório'),
    date: yup.string().required('A data é um campo obrigatório'),
    hour: yup.string().required('A hora é um campo obrigatório'),
  })
  const { register, handleSubmit, formState: {errors} } = useForm<IFormValues>({resolver: yupResolver(schema)});
  const { availableSchedules, schedules, date, handleSetDate } = useAuth();
  const currentValue = new Date().toISOString().split('T')[0];
  const [openMenu, setOpenMenu] = useState<boolean>(true);

  const filteredDate = availableSchedules.filter((hour) => {
    const isScheduleAvailable = !schedules.find((scheduleItem) => {
      const scheduleDate = new Date(scheduleItem.date)
      const scheduleHour = getHours(scheduleDate);
      return scheduleHour === Number(hour);
    });
    return isScheduleAvailable;
  });


  const submit = handleSubmit(async({ name, phone, date, hour }) => {
    const formattedDate = formatISO(setHours(parseISO(date), parseInt(hour)));
    try {
     const result = await api.post(`/schedules/`, {
        name,
        phone,
        date: formattedDate,
      });
      console.log(formattedDate)
      toast.success('Horário agendado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  });

  return (
    <div className="">
    <Header />
      <div className="w-2/4 m-auto">
        <form onSubmit={submit}>
          <InputSchedule
            placeholder="Nome do cliente"
            type="text"
            {...register('name', { required: true })}
            error={errors.name && errors.name.message}
          />
          <InputSchedule
            placeholder="Celular"
            type="text"
            {...register('phone', { required: true })}
            error={errors.phone && errors.phone.message}
          />
          <div className="flex items-center justify-between">
            <InputSchedule
              placeholder="Dia"
              type="date"
              {...register('date', { required: true, value: currentValue, onChange: (e) => handleSetDate(e.target.value) })}
              error={errors.date && errors.date.message}
            />
            <div className="flex flex-col w-[30%]">
              <label className="text-primary-500" htmlFor="">Hora</label>
              <select
                className="border-[1px] border-primary-500 rounded-2xl text-primary-500 bg-transparent items-center h-fit p-[.5rem]"
                {...register('hour', { required: true })}
              >
                {filteredDate.map((hour, index) => {
                  return (
                    <option value={hour} key={index}>{hour}:00</option>
                  )
                })}
              </select>
              {errors.hour && <span>{errors.hour.message}</span>}
            </div>
          </div>
          <div className='flex justify-between mt-8'>
            <button
              className='border-2 border-secondary-500 bg-none text-secondary-500 cursor-pointer font-light rounded-2xl px-[.3rem] py-[.4rem] w-[40%] hover:bg-gray-50'
            >
              Cancelar
            </button>
            <button
              className='border-2 border-secondary-500 bg-secondary-500 text-white-500 cursor-pointer font-light rounded-2xl px-[.rem] py-[.4rem] w-[40%] hover:bg-blue-900'
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}