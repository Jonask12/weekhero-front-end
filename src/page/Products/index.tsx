import { Header } from "../../components/Header";
import { Product } from "../../components/Product";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
interface IProducts {
  id: number;
  name: string;
  price: string;
}
import  { products_db }  from '../../db';

export function Products() {
  const [products, setProducts] = useState<Array<IProducts>>([]);

  const buyProduct = () => {
    alert('Page does not exists')
  }

  const deleteProduct = (id: number) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id))
    toast.success('Deletado com sucesso!');
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = products_db;
        setProducts(response);
      } catch (error) {
        console.log('Erro ao buscar produto', error);
      }
    }
    getProducts();
  }, [])
  return (
    <div className="">
      <Header />
      <div className="flex items-center justify-center">
        <h1 className="text-xl bold font-light text-primary-500">Produtos</h1>
      </div>
      <div className="flex items-center justify-center gap-2 p-10">
        {products.map((product) => {
          return (
           <Product
           key={product.id}
           id={product.id}
           name={product.name}
           price={product.price}
           buyProduct={() => buyProduct()}
           deleteProduct={() => deleteProduct(product.id)}
           />
          )
        })}
      </div>
    </div>
  )
  }