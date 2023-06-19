const userModel = require('../models/user.model')
const  jwt= require('jsonwebtoken');

const createToken= (_id)=>{
return jwt.sign({_id}, process.env.SECRET,{expiresIn:'3d'})
}

async function login(req,res){
const {email, password} = req.body
try{
    const user = await  userModel.login(email, password)
    // console.log(user, 'userrrrrrrrr');
    //create a token
    const token = createToken(user._id)
 const permissions = user?.role?.permissions
 const response = {email, token, permissions }
    res.status(200).json({...response})
    }
    catch(e){
    res.status(500).json({error: e.message})
    }

}

//register user
async function register(req,res){
const {firstName,lastName, email, mobileNo, password } = req.body

try{
// console.log(req.body, "user body");

const user = await  userModel.register(firstName,lastName, email, password, mobileNo)

//create a token
const token = createToken(user._id)

res.status(201).json({email, token})
}
catch(e){
res.status(500).json({error: e.message})
}

}



module.exports = {login,register}