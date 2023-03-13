import express from "express";
import connect from "./database/connection.js";
import Products from "./database/model/products.js";
import basicAuth from 'express-basic-auth'
import Sellers from "./database/model/seller.js";
import Order_Items from "./database/model/order.js";
import cors from 'cors'
import bcrypt from 'bcrypt';

const app = express();

app.use(express.json());
app.use(cors())
const port = process.env.PORT || 8080;

// // configure basic auth middleware
app.use(basicAuth({
    authorizer: async (sellerId, sellerZipCodePrefix) => {
      const seller = await Sellers.findOne({ seller_id: sellerId, seller_zip_code_prefix: sellerZipCodePrefix })
      return seller ? true : false
    },
    unauthorizedResponse: () => {
      return 'Invalid seller credentials'
    }
  }))

// Middleware function to check for Basic authentication
const authenticate = (req, res, next) => {

  if ( !req.auth.user || !req.auth.password) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }

 

    // Find user by name in MongoDB collection
   Sellers.findOne({ seller_id: req.auth.user, seller_zip_code_prefix: req.auth.password }).then(response=>{
    if (!response) {
      // User not found
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
      return;
    }


    // Check password against stored hash using bcrypt
    if(req.auth.password == response.seller_zip_code_prefix){
      return next();
    } else {
      // Passwords do not match
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
      return;
    }
   }).catch(err=>{
        if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
   });

};


connect().then(()=>{
    try {
     app.listen(port,()=>{
         console.log(`Server started on http://localhost:${port }`)
     })
    } catch (error) {
     console.log('Cannot connect to server')
    }
 }).catch((error)=>{
     console.log(error)
     console.error('Error connecting to DB')
 })


  //Login
  app.get('/login',authenticate, async (req, res) => {
    console.log(req.auth.user,req.auth.password)
    console.log(req.headers.authorization)
  res.json({sellerId:req.auth.user,sellerZipCodePrefix:req.auth.password})
})

// configure routes
app.get('/order_items', authenticate, async (req, res) => {
    const { sort = '-shipping_limit_date', limit = 20, offset = 0 } = req.query;
    const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
    const sortOrder = sort.startsWith('-') ? -1 : 1;
    const limitInt = parseInt(limit, 10);
    const offsetInt = parseInt(offset, 10);
  
    const orderItems = await Order_Items.find({
      seller_id: req.auth.user
    })
    .sort({ [sortField]: sortOrder })
    .skip(offsetInt)
    .limit(limitInt);
  
    const total = await Order_Items.countDocuments({
      seller_id: req.auth.user
    });
  
    const responseData = {
      data: orderItems.map(orderItem => (
        {
        id: orderItem.order_item_id,
        product_id: orderItem.product_id,
        product_category: Products.findOne({product_id:orderItem.product_id}).product_category, 
        price: orderItem.price,
        date: orderItem.shipping_limit_date
      })),
      total,
      limit: limitInt,
      offset: offsetInt
    };
  
    res.status(200).json(responseData);
  });
  

app.delete('/order_items/:id', authenticate, async (req, res) => {
  const result = await Order_Items.deleteOne({ order_item_id: req.params.id, seller_id: req.auth.user })
  if (result.deletedCount === 1) {
    res.status(204).send()
  } else {
    res.status(404).json({ message: 'Order item not found' })
  }
})

// Set up routes
app.post('/account', authenticate , async (req, res) => {
    const sellerId = req.auth.user
    const sellerZipCodePrefix = req.auth.password
    const newCity = req.body.city
    const newState = req.body.state

        return Sellers.findOneAndUpdate(
          { seller_id: sellerId, seller_zip_code_prefix: sellerZipCodePrefix },
          { $set: { seller_city: newCity, seller_state: newState } },
          { returnOriginal: false }
        )
      .then(result => {
        if (result.value) {
          res.json({ seller_city: result.value.seller_city, seller_state: result.value.seller_state })
        } else {
          res.status(404).send('Seller not found')
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).send('Internal server error')
      })
  })


