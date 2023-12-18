import creme from '../../assets/creme.jpeg';

interface IProducts {
  id: number;
  name: string;
  price: string;
  buyProduct: () => void;
  deleteProduct: () => void;
}

export function Product({ name, price, buyProduct, deleteProduct}: IProducts) {
  return (
    <div className="bg-white-500 ">
      <div className="">
        <img className='' src={creme} alt="" />
      </div>
      <div className='flex items-center flex-col p-5'>
        <span className=''>{name}</span>
        <p className='text-xl bold font-light text-primary-500'>{price}</p>
      </div>
      <div className=' flex'>
      <button
      className='bg-primary-500 w-full h-8 flex items-center justify-center text-xl bold font-light text-white-500 cursor-pointer'
      onClick={buyProduct}
      >
      Comprar
      </button>
      <button className='w-10 bg-red-600 text-white-500' onClick={deleteProduct} title='Excluir'>X</button>
      </div>
    </div>
  )
}