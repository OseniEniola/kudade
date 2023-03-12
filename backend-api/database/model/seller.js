import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    seller_id:{type: String},
    seller_zip_code_prefix: {type:Number},
    seller_city: {type: String},
    seller_state : {type : String},
})

const Sellers = mongoose.model('Sellers',sellerSchema);

export default Sellers;