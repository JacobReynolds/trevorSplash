var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.post('/sendEmail', function (req, res) {
    console.log(req.body.name + ' ' + req.body.email + ' ' + req.body.body);
    sendEmail(req.body.name, req.body.email, req.body.body);
    res.redirect('back');
})


function sendEmail(name, email, body) {
    var smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: "jreynoldsdev@gmail.com",
            pass: process.env.EMAILPASSWORD
        }
    });

    smtpTransport.sendMail({
        from: name + '<' + email + '>',
        replyTo: email, // sender address
        to: "Trevor Dillon <trevordillontattoos@gmail.com>", // comma separated list of receivers
        subject: name, // Subject line
        text: body // plaintext body
    }, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
        process.exit();
    });
}


module.exports = router;
