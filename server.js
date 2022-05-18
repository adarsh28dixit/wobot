import  Express  from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import path from 'path'

import productRouter from "./routers/productRouter.js";

const app = Express();
app.use(Express.json())



mongoose.connect("mongodb://localhost/adarsh", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(Express.static(path.join(__dirname, 'public')));
app.use('/api', userRouter);
app.use('/api', productRouter);

app.use((req, res) => {
    res.send("server is ready")
})

app.listen(5000, () => {
    console.log('http://localhost:5000')
})