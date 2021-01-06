const express = require('express')
const router = express.Router()

router.route('/')
  .get(function(req, res, next){
    res.status(200).json({message: 'Test thu phat'})
  })


module.exports = router