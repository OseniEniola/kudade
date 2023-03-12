# kudade
# Backend

# Task (Node.js)

- Get the following CSV records from the [Brazilian E-Commerce Public Dataset by Olist](https://www.kaggle.com/olistbr/brazilian-ecommerce) data. Import as collections into a MongoDB database
    - olist_order_items_dataset.csv
    - olist_products_dataset.csv
    - olist_sellers_dataset.csv
- Create an API in Node.js with the routes below. Authentication is via HTTP Basic using the `seller_id` and `seller_zip_code_prefix` from the `olist_sellers_dataset` collection as username and password respectively.
    1. `/order_items` - List all order items that belong to the logged in user. Allow sorting by `price` or `shipping_limit_date` (default). Allow showing from 20 (default) to up to 100 results at once with a `limit` parameter, and an `offset` query parameter to also easily get different result pages. Response should be in the format:
    
    ```
    {
     data:[{
      id: order_item_id,
      product_id: product_id,
      product_category: products.product_category_name
      price: price,
      date: shipping_limit_date
     }],
     total: 90214,
     limit: 20,
     offset: 560
    }
    
    ```
    
    1. `/order_items/:id` - Delete an order item ID from the order items collection
    2. `/account` - Update logged in seller's city or/and state. Should return new seller city and state as response.
- Write in ES6 and lint with StandardJs. Use appropriate HTTP methods and HTTP status codes for the responses. Use the official MongoDB Node driver (no ODMs like Mongoose). Write tests for the endpoints.

# Frontend (react.js)

Using the API created, create a reactjs app to

1. View the items (paginated)
2. Click on a particular item to see more full details. The page will have edit and delete options.
3. Clicking the edit button above should go to an edit page where the parameters can be modified
4. Clicking the delete option should delete from the API




# Dependencies
For the frontend:
- Reactjs
-Axios

For Backend:
-Expressjs
-Inmemory-mongodb


# To start Backend Server
- In the root directory run command   `npm run start`


# To start Frontend App
- In the root directory run command   `npm run start`
