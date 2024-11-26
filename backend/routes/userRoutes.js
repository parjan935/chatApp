const express = require('express')
const router=express()

const {registerUser,authorizeUser,getUsers,createChat,createGroupChat} =require('../controllers/userControllers')
const { jwtMiddleWare } = require('../middleWare/jwt')

router.post('/register',registerUser)
router.post('/login',authorizeUser)
router.get('/users',jwtMiddleWare,getUsers)
router.post('/createChat',jwtMiddleWare,createChat)
router.post('/createGroupChat',jwtMiddleWare,createGroupChat)

module.exports= router
