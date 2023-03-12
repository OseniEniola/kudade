import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    order_id:{type: String},
    order_item_id: {type:Number},
    product_id: {type: String},
    seller_id : {type : String},
    shipping_limit_date : {type: String},
    price: {type : Number},
    freight_value: {type: Number},
})

const Order_Items = mongoose.model('Order_Items',orderItemSchema);

export default Order_Items;