import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import Order_Items from "./model/order.js";
import Products from "./model/products.js";
import Sellers from "./model/seller.js";
import cvstojson from "csvtojson";
import path from "path";

export default async function connect() {
   const mongoServer = await MongoMemoryServer.create();
   const mongoUri = mongoServer.getUri();

   await mongoose.connect(mongoUri,{dbName:"Kudade"})
   console.log(`MongoDb connected to ${mongoUri}`)
   
  try {
   cvstojson().fromFile(path.join('dbdata','orderitems.csv')).then(csvdata=>{
      console.log('Saving Order items');
      Order_Items.insertMany(csvdata).then(()=>{
         console.log('Order Items inserted succesffuly')
      }).catch(()=>{
         console.log('Error uploading orderitems')
      })}).then(()=>{
         cvstojson().fromFile(path.join('dbdata','products.csv')).then(csvdata=>{
            console.log('Uploading products');
            Products.insertMany(csvdata).then(()=>{
               console.log('Products inserted succesffuly')
            }).catch(()=>{
               console.log('Error uploading products')
            })
      })}).then(()=>{
         cvstojson().fromFile(path.join('dbdata','sellers.csv')).then(csvdata=>{
            console.log('Uploading seller info');
            Sellers.insertMany(csvdata).then(()=>{
               console.log('Seller info inserted succesffuly')
            }).catch(()=>{
               console.log('Error uploading seller info')
            })
      })
      })
  } catch (error) {
   console.log(error)
  }

}