import { useState, useEffect } from "react";
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
    category:existingCategory,
    properties:assignedProperties,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goBack, setGoBack] = useState(false);
    const [images, setImages] = useState(existingImages || [])
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(existingCategory || '');
    const [productProperties, setProductProperties] = useState(assignedProperties || {});
    const router = useRouter();

    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        })
    }, []);

    async function createProduct(ev) {
        ev.preventDefault()

        const data = {title, description, price, images, category, properties: productProperties}
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

    function setProductProp(propName, value){
        setProductProperties(prev => {
            const newProductsProps = {...prev};
            newProductsProps[propName] = value;
            return newProductsProps;
        })
    }

    const propertiesToFill = [];
    if(categories.length > 0 && category) {
        let catInfo = categories.find(({_id}) => _id === category)
        catInfo?.properties && propertiesToFill.push(...catInfo.properties);

        while(catInfo?.parent?.id){
            const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
            propertiesToFill.push(parentCat.properties);
            catInfo = parentCat;
        }
    }

    return (
        <form onSubmit={createProduct}>
            <label>Product name</label>
            <input type="text" placeholder="product name" value={title} onChange={e => setTitle(e.target.value)}/>

            <label>Category</label>
            <select value={category} onChange={ev => setCategory(ev.target.value)}>
                <option value=''>Uncategorized</option>
                {categories.length > 0 && categories.map((category) => (
                    <option value={category._id} key={category._id}>{category.name}</option>
                ))}
            </select>

            {propertiesToFill.length > 0 && propertiesToFill.map(p => (
                <div className="flex gap-1" key={p}>
                    <div>
                        {p.name}
                    </div>
                    <select 
                        value={productProperties[p.name]}
                        onChange={ev => 
                            setProductProp(p.name, ev.target.value)
                        }
                    >
                        {p.values.map(v => (
                            <option key={v} value={v}>{v}</option>
                        ))}
                    </select>
                </div>
            ))}

            <label>Photos</label>
            {!images?.length && (
                <div>No photos in this product</div>
            )}

            <div className={`mb-2 flex flex-wrap ${images.length > 0 ? 'gap-2' : ''}`}>
                <ReactSortable list={images} setList={updateImagesOrder} className='flex flex-wrap gap-2'>
                    {!!images?.length && images.map((link) => (
                        <div key={link} className='h-24 relative'>
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
                    <input type='file' className='hidden' onChange={uploadImages} multiple accept=".png, .jpg, .jpeg"/>
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