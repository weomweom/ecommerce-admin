import { useEffect, useState } from "react";
import axios from "axios";
import Edit from "@/components/Icons/Edit";
import Delete from "@/components/Icons/Delete";
import Layout from "@/components/layout";
import Popup from "@/components/Popup";

function Categories() {
    const [name, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [editedCategory, setEditedCategory] = useState(null);
    const [isPopupActive, setIsPopupActive] = useState(false);
    const [deletedCategory, setDeletedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, [])

    function fetchCategories(){
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        })
    }

    async function saveCategory(ev){
        ev.preventDefault();

        const data = {name, parentCategory}
        if(editedCategory) {
            data._id = editedCategory._id;
            await axios.put('/api/categories', data);
            setEditedCategory(null);
        } else {
            await axios.post('/api/categories', data);
        }

        setName('');
        setParentCategory('');
        fetchCategories();
    }

    function editCategory(category){
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
    }

    async function deleteCategory(category){
        const {_id} = category;
        await axios.delete('/api/categories?_id='+_id)
        fetchCategories()
        setIsPopupActive(false);
    }

    return (
        <Layout>
            {isPopupActive && <Popup item={deletedCategory.name} noOnClick={() => setIsPopupActive(false)} yesOnClick={() => deleteCategory(deletedCategory)}/>}

            <h1>Categories</h1>

            <label>{editedCategory ? `Edit category '${editedCategory.name}'` : 'Create new category'}</label>
            <form onSubmit={saveCategory} className="flex gap-2">
                <input type="text" placeholder="Category name" value={name} onChange={ev => setName(ev.target.value)} className='mb-0'/>
                <select className="mb-0" value={parentCategory} onChange={ev => setParentCategory(ev.target.value)}>
                    <option value="">No parent category</option>
                    {categories.length > 0 && categories.map((category) => (
                        <option value={category._id} key={category._id}>{category.name}</option>
                    ))}
                </select>

                <button type="submit" className="btn-primary">Save</button>
            </form>

            <table className="basic">
                <thead>
                    <tr>
                        <td>
                            Category name
                        </td>
                        <td>
                            Parent
                        </td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map((category) => (
                        <tr key={category.name}>
                            <td>{category.name}</td>
                            <td>
                                {category?.parent?.name}
                            </td>
                            <td>
                                <button onClick={() => editCategory(category)} className="btn-primary mr-1"><Edit/></button>
                                <button className="btn-primary" onClick={() => {setIsPopupActive(true); setDeletedCategory(category)}}><Delete/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </Layout>
    );
}

export default Categories;