
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import ProductForm from "@/components/ProductForm";
import Close from "@/components/Icons/Close";

function EditProductPage() {
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/api/products?id='+id).then(res => {
            setProductInfo(res.data)
        })
    }, [id])
    return (
        <Layout>
            <div className="flex justify-between items-center">
                <h1>Edit product</h1>
                <button onClick={() => router.push('/products')} className="bg-red-600 rounded-full p-px transition hover:bg-red-700"><Close/></button>
            </div>

            {productInfo && (
                <ProductForm {...productInfo}/>
            )}
        </Layout>
    );
}

export default EditProductPage;