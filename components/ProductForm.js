import { useState } from "react";
import axios from "axios";
import {useRouter} from "next/router";
import { ReactSortable } from "react-sortablejs";
import Upload from "./Icons/Upload";
import Spinner from "./Spinner";

function ProductForm({
    _id,
    title:existingTitle, 
    description:existingDescription, 
    price:existingPrice,
    images:existingImages,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goBack, setGoBack] = useState(false);
    const router = useRouter();
    const [images, setImages] = useState(existingImages || [])
    const [isLoading, setIsLoading] = useState(false);

    async function createProduct(ev) {
        ev.preventDefault()

        const data = {title, description, price, images}
        if (_id){
            await axios.put('/api/products', {...data, _id})
        } else {
            await axios.post('/api/products', data)
        }

        setGoBack(true);
    }

    if(goBack) {
        router.push('/products');
    }

    async function uploadImages(ev){
        const files = ev.target?.files
        if(files?.length > 0){
            setIsLoading(true)
            const data = new FormData()
            for (const file of files) {
                data.append('file', file)
            }

            const res = await axios.post('/api/upload', data)
            
            setImages(oldImages => {
                return [...oldImages, ...res.data.links]
            })
            setIsLoading(false)
        }
    }

    function updateImagesOrder(images) {
        setImages(images);
    }

    return (
        <form onSubmit={createProduct}>
            <label>Product name</label>
            <input type="text" placeholder="product name" value={title} onChange={e => setTitle(e.target.value)}/>

            <label>Photos</label>
            {!images?.length && (
                <div>No photos in this product</div>
            )}

            <div className="mb-2 flex flex-wrap gap-2">
                <ReactSortable list={images} setList={updateImagesOrder} className='flex flex-wrap gap-2'>
                    {!!images?.length && images.map(link => (
                        <div key={link} className='h-24'>
                            <img src={link} alt='' className="rounded-lg"/>
                        </div>
                    ))}
                </ReactSortable>
                {isLoading && (
                    <div className='h-24 flex items-center'>
                        <Spinner/>
                    </div>
                )}

                <label className="w-24 h-24 flex justify-center items-center transition rounded-lg bg-gray-200 cursor-pointer hover:bg-gray-300">
                    <Upload/>
                    <input type='file' className='hidden' onChange={uploadImages}/>
                </label>
            </div>

            <label>Description</label>
            <textarea placeholder="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>

            <label>Price (in USD)</label>
            <input type="number" placeholder="price" value={price} onChange={e => setPrice(e.target.value)}></input>

            <button type='submit' className="btn-primary">Save</button>
        </form>
    );
}

export default ProductForm;