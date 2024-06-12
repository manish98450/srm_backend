const express = require('express')
//create router instance
const router = express.Router()
//import productApi
const userApi = require('../apis/loginApis')

router.get('/find_user',userApi.userfind)
router.post('/insert_user',userApi.insert_user)
router.put('/update_user',userApi.update_user)
router.delete('/delete_user',userApi.delete_user)

module.exports = router