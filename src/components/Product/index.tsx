import creme from '../../assets/creme.jpeg';

interface IProducts {
  name: string;
  price: string;
  buyProduct: () => void;
}

export function Product({ name, price, buyProduct}: IProducts) {
  return (
    <div className="bg-white-500 ">
      <div className="">
        <img className='' src={creme} alt="" />
      </div>
      <div className='flex items-center flex-col p-5'>
        <span className=''>{name}</span>
        <p className='text-xl bold font-light text-primary-500'>{price}</p>
      </div>
      <button
      className='bg-primary-500 w-full h-8 flex items-center justify-center text-xl bold font-light text-white-500 cursor-pointer'
      onClick={buyProduct}
      >
      Comprar
      </button>
    </div>
  )
}