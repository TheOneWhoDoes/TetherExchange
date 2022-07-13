const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middlewares/auth')
// const multer = require('multer')
// const sharp = require('sharp')



router.post('/users/register', async (req, res) => {
    try{
        const user = await new User(req.body).save()
        const token = await user.generateAuthToken()
        return res.status(201).send({token})
    }catch(e){
        res.status(500).send(e)
    }  
})

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.mobile, req.body.password)
        const token = await user.generateAuthToken()
        return res.send({token})
    }catch(e){
        res.status(400).send()
    }
})



router.get('/users/logout', auth, async (req, res) => {
    try{
		console.log(req.user.tokens, "first")
		const filtered = await req.user.tokens.filter((token) => 
            token !== req.token
        )
		req.user.token = filtered
		console.log(filtered, "after")
		
        await req.user.save()
        return res.send()
    }catch(e){
        res.status(500).send()
    }
    
})


module.exports = router