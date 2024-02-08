import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

function DeleteProductPage() {
    const router = useRouter();
    const [productInfo, setProductInfo] = useState();
    const {id} = router.query;

    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data)
        })
    }, [id])

    function goBack() {
        router.push('/products')
    }

    async function deleteProoduct() {
        await axios.delete('/api/products?id='+id)
        goBack()
    }
    
    return (
        <Layout>
            <h1 className="text-center">Do you really want to <b>delete</b> product <b>{productInfo?.title}</b>?</h1>
            <div className="flex gap-2 justify-center">
                <button className="btn-red" onClick={deleteProoduct}>YES</button>
                <button className="btn-default" onClick={goBack}>NO</button>
            </div>
        </Layout>
    );
}

export default DeleteProductPage;