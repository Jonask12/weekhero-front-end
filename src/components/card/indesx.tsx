import { RiDeleteBinLine } from 'react-icons/ri'
import { AiOutlineEdit } from 'react-icons/ai'
import { getHours, isAfter } from 'date-fns';
import { useState } from 'react';
import { ModalEdit } from '../modalEdit';
import { ModalDelete } from '../modalDelete';


interface ISchedule {
  name: string;
  phone: string;
  date: Date;
  id: string;
  onConfirm: () => void;
}

export const Card = ({ name, date, id, phone, onConfirm }: ISchedule) => {

  const isAfterDate = isAfter(new Date(date), new Date());

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  const dateFormatted = new Date(date);
  const hour = getHours(dateFormatted);

  let phoneFormatted = phone.replace(/\D/g, '');
  phoneFormatted = phoneFormatted.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

  const handleChangeModal = () => {
    setOpenModal(!openModal);
  }

  const handleChangeModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  }

  return (
    <>
      <div className="flex justify-between items-center rounded-md bg-white-500 mb-5 shadow-xl"> {/* background */}
        <div className='flex items-center'>
          <span className={`bg-secondary-500 text-white-500 rounded-s-md p-[.8rem] mr-4 ${!isAfterDate && 'bg-gray-300'}`}>{hour}h</span>
          <p className={`text-primary-500 text-lg`}>{name} - {phoneFormatted}</p>
        </div>

        <div className="flex mr-[.5rem] gap-2 cursor-pointer"> {/* icons */}
          <AiOutlineEdit color="#5F68B1" size={18} onClick={() => isAfterDate && handleChangeModal()} />
          <RiDeleteBinLine color="#EB2E2E" size={18} onClick={() => isAfterDate && handleChangeModalDelete()}/>
        </div>
      </div>
      <ModalEdit
        isOpen={openModal}
        handleChangeModal={handleChangeModal}
        hour={String(hour)}
        name={name}
        id={id}
      />
      <ModalDelete
      id={id}
      handleChangeModalDelete={handleChangeModalDelete}
      onConfirm={onConfirm}
      isOpenDel={openModalDelete}/>
    </>
  )
}