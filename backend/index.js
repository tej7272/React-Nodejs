const express = require('express');
require('./db/config');
const User = require('./db/User');
const cors = require('cors');
const Product = require('./db/Products');

const Jwt = require('jsonwebtoken');
const jwtKey = "e-comm";

const app = express();


app.use(express.json());
app.use(cors());


app.post('/register', async (req, res) => {

    if (req.body.password && req.body.email && req.body.password) {
        let userData = await User.findOne({ email: req.body.email });

        if (userData) {
            res.status(409).send({error: "User already exists"});
        }
        else {
            let result = await new User(req.body);
            let user = await result.save();
            Jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (!token) {
                    res.status(500).send({ error: "Something went wrong" });
                }
                res.status(200).send({ user, token, success:"User Account Created Successfully" });
            })
        }
    }
    else {
        res.status(400).send({ error: "Enter valid data" });
    }
})

app.post('/login', async (req, res) => {

    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (!token) {
                    res.status(500).send({ error: "Something went wrong" });
                }
                res.status(200).send({ user, token, success:"User login successfully" });
            })
        }
        else {
            res.status(404).send({ error: "Enter valid email and password" })
        }
    }
    else {
        res.status(400).send({ error: "Enter Valid Data" });
    }
})

app.put('/update/:_id', verifyToken, async (req, res) => {

    let userData = await User.updateOne(
        req.params,
        { $set: req.body }
    );
    res.send(userData);
})

app.post('/add-product', verifyToken, async (req, res) => {
    let product = await new Product(req.body);
    let result = await product.save();
    res.send({result, success:"Item added successfully"});
})

app.get('/products', verifyToken, async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    }
    else {
        res.send({ error: "No products found" })
    }
})

app.put('/update-product/:_id', verifyToken, async (req, res) => {
    let product = await Product.updateOne(
        req.params,
        { $set: req.body }
    )
    res.send({product, success:"Item updated successfully"})
})

app.delete('/product/:_id', verifyToken, async (req, res) => {
    let product = await Product.deleteOne(req.params);
    res.send({product, success:"Item deleted successfully"});
})

app.get('/product/:_id', verifyToken, async (req, res) => {
    let product = await Product.findOne(req.params);
    if (product) {
        res.send(product);
    }
    else {
        res.send({ error: 'No Record Found' });
    }
})

app.get('/search/:key', verifyToken, async (req, res) => {
    let result = await Product.find(
        {
            "$or": [
                { name: { $regex: req.params.key } },
                { price: { $regex: req.params.key } },
                { brand: { $regex: req.params.key } },
                { category: { $regex: req.params.key } }
            ]
        }
    );

    if (result) {
        res.send(result);
    }
    else {
        res.send({ error: "Data not found" });
    }
})


function verifyToken(req, res, next) {
    let token = req.headers['authorization'];

    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ error: "Enter a valid token" })
            }
            else {
                next();
            }
        })
    }
    else {
        res.status(403).send({ error: "You are not authorize user. Add token first" });
    }
}

app.listen(3500);

