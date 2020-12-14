const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');
const emailFrom = 'EMAIL_PLACEHOLDER';
const emailPassword = 'PASSWORD_PLACEHOLDER';

/**
 * This variable store the authentication there "user" is gmail id and "pass" is password of that gmail id
 */
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'check3828@gmail.com',
      pass: '3828check'
    }
  });
  
/**
 * on submition of form this post request will send email to the filled id with the booking details
 * there "from" will contain the gmail id of the sender
 */
router.post('/book', (req,res,next) =>{

    var mailOptions = {
        from: 'check3828@gmail.com',
        to: req.body.email,
        subject: 'NotchUp Trial Class Booked successfully',
        text: 'Dear '+req.body.Parent+"\n"+ req.body.child+"'s class on " + req.body.date +" at "+req.body.time +" has been successfully booked."
      };

    /**
     * This function check for if any error occur in sending mail and return that error
     * else this will display that the email is sent succesfully
     * after the submission form will be cleared
     */
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    console.log(req.body);
    res.redirect('/');

});

module.exports = router;