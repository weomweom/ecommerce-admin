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
    const [properties, setProperties] = useState([]);

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

        const data = {name, parentCategory, properties}
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
        setProperties([]);
    }

    function editCategory(category){
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
        setProperties(category.properties.map(({name, values}) => ({
            name,
            values:values.join(',')
        })));
    }

    async function deleteCategory(category){
        const {_id} = category;
        await axios.delete('/api/categories?_id='+_id)
        fetchCategories()
        setIsPopupActive(false);
    }

    function addProperty(){
        setProperties(prev => {
            return [...prev, {name: '', values: ''}]
        })
    }

    function handleUpdatePropertyName(index, newName){
        setProperties(prev => {
            const propertiesPrev = [...prev];
            propertiesPrev[index].name = newName;
            return propertiesPrev;
        })
    }

    function updatePropertyValue(index, newValues){
        setProperties(prev => {
            const propertiesPrev = [...prev]
            propertiesPrev[index].values = newValues;
            return propertiesPrev;
        })
    }

    function removeProperty(indexToRemove){
        setProperties(prev => {
            const newProperites = [...prev].filter(pIndex => {
                return pIndex !== indexToRemove;
            });

            return newProperites;
        })
    }
    console.log(properties)

    return (
        <Layout>
            {isPopupActive && <Popup item={deletedCategory.name} noOnClick={() => setIsPopupActive(false)} yesOnClick={() => deleteCategory(deletedCategory)}/>}

            <h1>Categories</h1>

            <label>{editedCategory ? `Edit category '${editedCategory.name}'` : 'Create new category'}</label>
            <form onSubmit={saveCategory}>
                <div className="flex gap-2">
                    <input type="text" placeholder="Category name" value={name} onChange={ev => setName(ev.target.value)} className='mb-0'/>
                    <select className="mb-0" value={parentCategory} onChange={ev => setParentCategory(ev.target.value)}>
                        <option value="">No parent category</option>
                        {categories.length > 0 && categories.map((category) => (
                            <option value={category._id} key={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button type="button" onClick={addProperty} className="btn-default mb-2">Add new property</button>

                    <div className="flex flex-col gap-2 mb-2">
                        {properties.length > 0 && properties.map((property, i) => (
                            <div className="flex gap-2" key={i}>
                                <input type="text"
                                    label='name'
                                    name='Property name'
                                    value={property.name}
                                    className="mb-0"
                                    onChange={ev => handleUpdatePropertyName(i, ev.target.value)}
                                    placeholder="property name (example: color)"/>
                                                        
                                <input type="text"
                                    name="Property vaules"
                                    label='values'
                                    className="mb-0"
                                    onChange={ev =>
                                    updatePropertyValue(
                                        i,ev.target.value
                                    )}
                                    value={property.values}
                                    placeholder="values, comma separated"/>
                                    <button 
                                        type='button'
                                        onClick={() => removeProperty(i)}
                                        className="btn-default">
                                            Remove
                                    </button>
                            </div>
                        ))}
                    </div>
                    
                    {editedCategory && <button type="button" className="btn-default mr-2" onClick={() => { setEditedCategory(null); setName(''); setParentCategory('')}}>Cancel</button>}
                    <button type="submit" className="btn-primary">Save</button>
                </div>
            </form>

            {!editedCategory &&
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
            }
        </Layout>
    );
}

export default Categories;