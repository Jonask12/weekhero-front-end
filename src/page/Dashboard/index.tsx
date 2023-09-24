import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Card } from "../../components/card/indesx";
import { useAuth } from "../../hooks/auth";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'
import style from "./index.module.css";
import { ptBR } from "date-fns/locale";
import { format, isToday } from "date-fns";
import { api } from "../../service/api";
import { isAxiosError } from "axios";
import { toast } from 'react-toastify';

interface ISchedule {
  name: string;
  phone: string;
  date: Date;
  id: string;
}

export function Dashboard() {

  const [date, setDate] = useState(new Date());
  const [schedules, setSchedules] = useState<Array<ISchedule>>([]);

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6
  }

  const isWeekDay = (date: Date) => {
    const day = date.getDay();
    return day != 0 && day != 6;
  }

  const handleDateChange = (date: Date) => {
    setDate(date);
  }

  useEffect(() => {
    api.get('/schedules', {
      params: {
        date,
      },
    }).then((response) => {
      console.log(response);
      setSchedules(response.data)
    }).catch((error) => {
      console.log(error);
    });
  }, [date]);

  const onDelete = async (id: string) => {
    try {
      await api.delete(`/schedules/${id}`);
      toast.success('Deletado com sucesso!');
      setSchedules(prevSchedules => prevSchedules.filter(schedule => schedule.id !== id));
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  }

  const { user } = useAuth();

  return (
    <div className="">
      <Header />
      {/* dataTitle */}
      <div className="mt-[1.5rem] mb-8 text-black-500 ml-10">
        <h2 className="text-xl bold font-light text-primary-500">Bem vindo(a), {user.name}</h2>
        <p className="text-primary-500">Esta é sua lista de horários {isToday(date) && <span>de hoje, </span>}
          dia {format(date, 'dd/MM/yyy')}</p>
      </div>
      <h2 className="text-secondary-500 ml-10">Próximos horários</h2>

      {/* schedules */}
      <div className="flex justify-between py-0 px-4">
        <div className="w-1/2 max-h-[60vh] px-4 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-[#DDDFEB]">
          {schedules.map(({ date, name, id, phone }) => {
            return (
              <Card
                key={id}
                date={date}
                name={name}
                id={id}
                phone={phone}
                onConfirm={() => onDelete(id)}
              />
            )
          })}
        </div>

        {/* picker */}
        <div className="w-1/2 flex justify-center">
          <DayPicker
            mode="single"
            modifiersClassNames={{
              selected: style.selected,
            }}
            fromMonth={new Date()}
            locale={ptBR}
            selected={date}
            modifiers={{ available: isWeekDay }}
            className="bg-primary-500 h-fit p-4 rounded-xl text-white-500 shadow-xl"
            disabled={isWeekend}
            classNames={{
              day: style.day,
            }}
            onDayClick={handleDateChange}
          />
        </div>
      </div>
    </div>
  )
}