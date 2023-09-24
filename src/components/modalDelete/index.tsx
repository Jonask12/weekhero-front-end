import { AiOutlineClose } from "react-icons/ai";

interface IIsOpenModaldelete {
  isOpenDel: boolean;
  handleChangeModalDelete: () => void;
  id: string;
  onConfirm: () => void;
}

export function ModalDelete({ isOpenDel, handleChangeModalDelete, onConfirm }: IIsOpenModaldelete) {

  const handleDelete = async () => {
    onConfirm();
    handleChangeModalDelete();
  }

  if (isOpenDel) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 z-[9] w-full h-screen">
        <div className="fixed top-[35%] left-[40%] transition-transform w-[450px] bg-white-500 h-[240px]  rounded">
          <div className="p-4 bg-yellow-600 text-center text-white-500 flex items-center justify-between">
            <h2>Excluir Horário</h2>
            <AiOutlineClose size={20} onClick={handleChangeModalDelete} className='cursor-pointer' />
          </div>
            <h1 className="text-primary-500">Tem certeza que deseja excluir?</h1>
          <div className="mt-28 flex justify-around">
            <button className="w-20 p-1 border-[1px] border-secondary-500 text-primary-500 rounded" onClick={handleChangeModalDelete}>Não</button>
            <button className="bg-red-500 w-20 p-1 text-white-500 rounded" onClick={() => handleDelete()}>Sim</button>
          </div>
        </div>
      </div>
    )
  }
}