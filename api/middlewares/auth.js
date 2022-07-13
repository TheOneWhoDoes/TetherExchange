const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, "thisisasecretformyapp")
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})

        if(!user){
            throw new Error()
        }

        req.user = user
        req.token = token
        next()
    }catch(e){
        console.log(e)
        res.status(401).send({error: 'Unauthorized'})
    }
}

module.exports = auth