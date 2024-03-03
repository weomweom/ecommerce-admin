import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Edit from "@/components/Icons/Edit";
import Delete from "@/components/Icons/Delete";
import Layout from "@/components/layout";
import Popup from "@/components/Popup";

function Products() {
    const [products, setProducts] = useState([]);
    const [deletedProduct, setDeletedProduct] = useState(null);
    const [isPopupActive, setIsPopupActive] = useState(false);

    const router = useRouter();

    async function fetchProducts() {
        axios.get('/api/products').then(res => {
            setProducts(res.data);
        })
    } 

    useEffect(() => {
        fetchProducts()
    }, [])

    async function deleteProduct(product) {
        await axios.delete('/api/products?id='+product._id);
        setIsPopupActive(false);
        fetchProducts();
    }

    return (
        <Layout>
            {isPopupActive && <Popup item={deletedProduct.title} noOnClick={() => setIsPopupActive(false)} yesOnClick={() => (deleteProduct(deletedProduct))}/>}

            <Link href={'/products/new'} className='bg-blue-900 rounded-md py-1 px-2 text-white'>
                Add new product
            </Link>
            <table className="basic">
                <thead>
                    <tr>
                        <td>
                            Name
                        </td>
                        <td>
                            Price
                        </td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>
                            <button onClick={() => router.push('/products/edit/'+product._id)} className="btn-primary mr-1">
                                <Edit/>
                            </button>
                            <button onClick={() => {setDeletedProduct(product); setIsPopupActive(true)}} className='btn-primary'>
                                <Delete/>
                            </button>
                        </td>
                    </tr>
                    
                ))}
                </tbody>
            </table>
        </Layout>
    );
}

export default Products;