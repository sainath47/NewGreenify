const userModel = require('../models/user.model')
const  jwt= require('jsonwebtoken');

const createToken= (_id)=>{
return jwt.sign({_id}, process.env.SECRET,{expiresIn:'3d'})
}

async function login(req,res){
const {email, password} = req.body
try{
    const user = await  userModel.login(email, password)
    
    //create a token
    const token = createToken(user._id)
    
    res.status(200).json({email, token})
    }
    catch(e){
    res.status(500).json({error: e.message})
    }

}

//register user
async function register(req,res){
const {email, password} = req.body

try{
const user = await  userModel.register(email, password)

//create a token
const token = createToken(user._id)

res.status(201).json({email, token})
}
catch(e){
res.status(500).json({error: e.message})
}

}



module.exports = {login,register}