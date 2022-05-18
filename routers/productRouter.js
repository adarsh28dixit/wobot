import express from 'express'
import { isAuth } from '../utils.js';
import Product from '../models/productModel.js';
import csv from 'fast-csv'
import fs from 'fs'

const productRouter = express.Router();

var csvfile = __dirname + "/../public/files/products.csv";
var stream = fs.createReadStream(csvfile);

productRouter.post('/products', isAuth, (req,res) => {
    const prod = req.body.prod
    Product.create(prod, (err, data) => {
        if(err){
            res.send(err);
        }else{
            res.send(data)
        }
    })
})

productRouter.get('/products', isAuth, (req,res) => {
    
    Product.find( (err, data) => {
        if(err){
            res.send(err);
        }else{
            res.send(data)
        }
    })
})

//import csv
productRouter.get('/import', isAuth, (req,res) => {
    var products = []
    var csvStream = csv()
    .on("data", function(data){
        var item = new Product({
            name: data[0],
            description: data[1],
            quantity: data[2],
            price: data[3]
        })
        item.save(function(error){
            if(err){
                res.send(err.msg)
            }
        })
    }).on("end", function(){

    })
    stream.pipe(csvStream);
    res.status(200).send({msg: "Data imported successfully"})
})

export default productRouter;