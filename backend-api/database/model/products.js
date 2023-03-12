import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_id:{type: String},
    product_category_name: {type:String},
    product_name_lenght: {type: Number},
    product_description_lenght : {type : Number},
    product_photos_qty : {type: Number},
    product_weight_g: {type : Number},
    product_length_cm: {type: Number},
    product_height_cm: {type: Number},
    product_width_cm: {type: Number}
})

const Products = mongoose.model('Products',productSchema);

export default Products;