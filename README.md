# Shopcart

An api with end points to create/view/delete/update users, products, and orders.

# Live link for API

 [Click Me!](https://shopcart-server.vercel.app/)
## Built With

- Node.js version 14
- Express.js version 4.16.1
- MongoBD Atlas
- Stripe
## Getting Started

The API will receive POST requests to create users,products, and orders and GET requests to view products and orders.
The base URL is: https://shopcart-server.vercel.app/

If you want to view Products you can append this endpoint to the URl:
```
/products
```

Endpoints will return a JSON response with the following format:

```
GET /products

[
    {
    "brand": "Sony"
    "category": "Playstation"
    "color": "White"
    "countInStock": 3
    "deals": [{…}]
    "department": "Gaming"
    "description": "Explore uncharted virtual territories and slay dragons with this sleek Sony PlayStation 5 gaming console."
    "features": (9) ['PlayStation 5 Console (Disc Version)', "2 x's Dual Sense Controller", 'Power Cord ', 'HDMI Cable', 'USB-C-to-USB-A Cable ', 'Console Stand ', 'Silicone Sleeve ', 'Dual Dock Charging Cradle', 'Backwards compatible with PlayStation 4 Games']
    "image": "https://i5.walmartimages.com/asr/a3335b0c-c255-4f63-918a-b6d5f8cd345a.d85a4b9f7cd65e859418348bba8f2e54.jpeg"
    "name": "PS5 Console with Extra Dual Sense Controller and Accessories"
    "price": 839
    "rating": 4.9
    "reviews": (12) ['', {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    "type": "PS5"
    "_id": "62baec95c720582a4bad3554"
    }
]
```

If you prefer to clone the project locally, you can also get to the docs by navigating to http://`domain`:`port`/. Where `domain` is the domain of your server and `port` is the port of your server.
For example, if your server is running on port 5000, you can navigate to http://localhost:5000/.
There you will see a list of all endpoints and their descriptions.

## Authors

👤 **Simo Wilson Dlamini**

- GitHub: [@KDlamini](https://github.com/KDlamini)
- Twitter: [@RealSimoNkosi](https://twitter.com/RealSimoNkosi)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/simo-nkosi-418523180/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/KDlamini/bamboo-server/issues).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- [@KDlamini](https://github.com/KDlamini) for the initial implementation of the API.
## 📝 License

- This project is [MIT](./LICENSE) licensed.


