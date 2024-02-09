import Layout from "@/components/layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Edit from "@/components/Icons/Edit";
import Delete from "@/components/Icons/Delete";

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products').then(res => {
            setProducts(res.data);
        })
    }, [])
    return (
        <Layout>
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
                {products.map((product, i) => (
                    <tr key={product._id}>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>
                            <Link href={'/products/edit/'+product._id}>
                                <Edit/>
                                Edit
                            </Link>
                            <Link href={'/products/delete/'+product._id}>
                                <Delete/>
                                Delete
                            </Link>
                        </td>
                    </tr>
                    
                ))}
                </tbody>
            </table>
        </Layout>
    );
}

export default Products;