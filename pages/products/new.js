import Layout from "@/components/layout";
import ProductForm from "@/components/ProductForm";
import Close from "@/components/Icons/Close";
import { useRouter } from "next/router";

function NewProduct() {
    const router = useRouter();
    return (
    <Layout>
        <div className="flex justify-between items-center">
            <h1>New product</h1>
            <button onClick={() => router.push('/products')} className="bg-red-600 rounded-full p-px transition hover:bg-red-700"><Close/></button>
        </div>
        <ProductForm/>
    </Layout>
    )
}

export default NewProduct;