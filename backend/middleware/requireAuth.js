const jwt = require("jsonwebtoken");
const userModel = require('../models/user.model')


const requireAuth = async(req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;
  if (!authorization)
    return res.json({ error: "Authorization token required" });

  const token = authorization.split(" ")[1];

  try {
    const{_id} = jwt.verify(token, process.env.SECRET);

    req.user = await userModel.findOne({_id}).select("_id")
// console.log(req.user);
    next()
    
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: "Request is not authorized" });
  }
};


module.exports = {requireAuth}