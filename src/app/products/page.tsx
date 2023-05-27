import RootLayout from '../layout'
import AddProduct from './addProduct';
import DeleteProducts from './deleteProduct';
import EditProduct from './editProducts';

type Product = {
    id: number,
    title: string,
    price: number
}

const getProducts = async () => {
    // cache: no-store = getServerSideProps, 
    const res = await fetch('http://localhost:5000/products', {
        cache: 'no-store'
    });
    return res.json()
}

const Home = async () => {
    const products: Product[] = await getProducts();

  return (
    <RootLayout>
        <div className='px-10 py-10'>
            <AddProduct />
            <table className='table w-full mt-10'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {products.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td className='flex space-x-5'>
                            <EditProduct {...item} />
                            <DeleteProducts {...item}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            
        </div>
    </RootLayout>
  )
}


export default Home