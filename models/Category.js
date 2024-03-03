import { model, models, Schema, mongoose } from "mongoose"

const CategorySchema = new Schema({
    name: {type: String, requiered: true},
    parent: {type: mongoose.Types.ObjectId, ref:'Category'}
})

export const Category = models?.Category || model('Category', CategorySchema)