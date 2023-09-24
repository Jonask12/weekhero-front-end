import { AiOutlineClose } from 'react-icons/ai'
import { useAuth } from '../../hooks/auth';
import { formatISO, getHours, parseISO, setHours } from 'date-fns';
import { useState } from 'react';
import { api } from '../../service/api';
import { toast} from 'react-toastify';
import { isAxiosError } from 'axios';


interface IModalEdit {
  isOpen: boolean;
  handleChangeModal: () => void;
  hour: string;
  name: string;
  id: string;
}

export function ModalEdit({ isOpen, handleChangeModal, hour, name, id }: IModalEdit) {
  const [hourSchedule, setHourSchedule] = useState('')
  const { availableSchedules, schedules, date, handleSetDate } = useAuth();

  const currentValue = new Date().toISOString().split('T')[0];

  const filteredDate = availableSchedules.filter((hour) => {
    const isScheduleAvailable = !schedules.find((scheduleItem) => {
      const scheduleDate = new Date(scheduleItem.date)
      const scheduleHour = getHours(scheduleDate);
      return scheduleHour === Number(hour);
    });
    return isScheduleAvailable;
  });

  const handleChangeHour = (hour: string) => {
    setHourSchedule(hour);
  }

  const updateData = async () => {
    const formattedDate = formatISO(setHours(parseISO(date), parseInt(hourSchedule)));
    try {
      await api.put(`/schedules/${id}`, {
        date: formattedDate,
      });
      toast.success('Atualizado com sucesso!');
      handleChangeModal();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  }

  if (isOpen) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 z-[9]">
        <div className=" fixed top-[50%] left-[50%] transition-transform w-[450px] bg-white-500 rounded-md">
          <div className="bg-primary-500 rounded-ss-md text-white-500 flex justify-between p-8">
            <h2 className='text-lg'>Editar Horário</h2>
            <AiOutlineClose size={20} onClick={handleChangeModal} className='cursor-pointer' />
          </div>
          <div className='py-4 px-8'>
            <p className='text-secondary-500 text-[1.2rem] font-medium mb-4'>{hour}h {name}</p>
            <div className='flex justify-between mb-4 items-center'>
              <label htmlFor="" className='text-primary-500'>Indique uma nova data</label>
              <input
                className='border-2 border-primary-500 rounded-lg w-[40%] p-[.3rem] text-primary-500'
                type="date"
                defaultValue={currentValue}
                onChange={(e) => handleSetDate(e.target.value)}
                min={currentValue}
              />
            </div>

            <div className='flex justify-between mb-4'>
              <label htmlFor="" className='text-primary-500'>Indique uma novo horário</label>
              <select name=""
               id=""
               className='border-2 border-primary-500 rounded-lg w-[40%] p-[.3rem] text-primary-500'
               onChange={(e) => handleChangeHour(e.target.value)}
               >
                {filteredDate.map((hour, index) => {
                  return (
                    <option value={hour} key={index}>{hour}:00</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className='flex justify-between px-8 py-4'>
            <button
              className='border-2 border-secondary-500 bg-none text-secondary-500 cursor-pointer font-light rounded-lg px-[.3rem] py-[.4rem] w-[30%] hover:bg-gray-50'
              onClick={handleChangeModal}
            >
              Cancelar
            </button>
            <button
            className='border-2 border-secondary-500 bg-secondary-500 text-white-500 cursor-pointer font-light rounded-lg px-[.rem] py-[.4rem] w-[30%] hover:bg-blue-900'
            onClick={updateData}
            >
            Editar
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    <></>
  }
}