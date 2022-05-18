import jwt from 'jsonwebtoken';

export const generateToken = (user) =>{
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
    },
    process.env.JWT_SECRET || "prince",
    {
        expiresIn: "1d"
    }
    );
}

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;

    if(authorization){
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.env.JWT_SECRET || "prince", (err, decode) => {
            if(err){
                res.status(400).send({msg: "invalid token"})
            } else{
                req.user = decode;
                next();
            }
        })
    } else{
        res.status(400).send({msg: "no token"})
    }
}