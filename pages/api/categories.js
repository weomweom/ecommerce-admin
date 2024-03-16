import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

async function handle(req,res) {
    const {method} = req;
    await mongooseConnect();

    if(method === 'POST'){
        const {name, parentCategory, properties} = req.body;
        const categoryDoc = await Category.create({
            name,
            parent:parentCategory || undefined,
            properties: properties.map(p => ({name: p.name, values: p.values.split(',')}))
        });
        res.json(categoryDoc);
    }

    if(method === 'PUT'){
        const {name, parentCategory, properties, _id} = req.body;
        const categoryDoc = await Category.updateOne({_id}, {
            name,
            parent:parentCategory || undefined,
            properties: properties,
            properties: properties.map(p => ({name: p.name, values: p.values.split(',')}))
        });
        res.json(categoryDoc);
    }

    if(method === 'GET'){
        res.json(await Category.find().populate('parent'));
    }
    
    if(method === 'DELETE') {
        const {_id} = req.query;
        await Category.deleteOne({_id})
        res.json('ok');
    }
}

export default handle;