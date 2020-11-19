const express           = require('express')
const router            = express.Router()
const axiosjs           = require('axios')
const https             = require('https')
const { body }          = require('express-validator')

const nodemailer = require('nodemailer');

const axios = axiosjs.create({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

router.get('/welcome', (req, res) => {
    return res.status(200).json({
      success: true,
      message: 'This is my backend API!!'
    })
  })

router.post('/send-email', [
  body('*')
  .not().isEmpty()
  .trim()
  .escape(),
], (req, res) => {

  console.log('Submitting new email', JSON.stringify(req.body, 0, 2))

  var transport = nodemailer.createTransport({
    host: "",
    port: 1,
    auth: {
      user: "",
      pass: ""
    }
  });

  var mailOptions = {
    from: req.body['from'],
    to: 'admin@clearvision.com',
    subject: req.body['subject'],
    text: req.body['message']
  };

  transport.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log('ERROR!!! '+ JSON.stringify(error))
      return res.status(400).json({
        success: false,
        message: 'Email not sent'
      })
    } else {
      return res.status(200).json({
        success: true,
        message: 'Email sent'
      })
    }
  });

})

module.exports = router