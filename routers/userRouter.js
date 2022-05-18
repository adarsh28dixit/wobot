import express from 'express'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils.js';
import { isAuth } from '../utils.js';



const userRouter = express.Router();

userRouter.post('/register', async(req, res) =>{
    const userEmail = await User.findOne({email: req.body.email})
    if(userEmail){
        res.status(404).send("User already registered");
    }else{
        const newUser = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8)
        })

        const createdUser = await newUser.save();
        res.status(200).send({
            _id: createdUser._id,
            fname: createdUser.fname,
            lname: createdUser.lname,
            email: createdUser.email,
            username: createdUser.username,
            token: generateToken(createdUser)
        })
        
    }
})

userRouter.post('/login', async(req, res) =>{
    const userEmail = await User.findOne({email: req.body.email})
    if(userEmail){
        if(bcrypt.compareSync(req.body.password, userEmail.password)){
            
            res.status(200).send({
                
                _id: userEmail._id,
                fname: userEmail.fname,
                lname: userEmail.lname,
                username: userEmail.username,
                email: userEmail.email,
                token: generateToken(userEmail)
            })
        }else{
            res.status(404).send("Incorrect password")
        }
    }else{
        res.status(404).send("User not registered");
    }
})


userRouter.get('/users',isAuth, (req, res) =>{
    
    User.find( (err,data) =>{
        if(err){
            res.status(404).send("not found");
        }else{
            res.status(200).send(data);
        }
    })
} )

userRouter.get('/userDetails/:id', isAuth, async(req, res) => {
    const user = req.params.id
    User.findById(user, (err, data) => {
        if(err){
            res.status(404).send("not found")
        }else{
            res.status(200).send(data)
        }
    })
})


export default userRouter;