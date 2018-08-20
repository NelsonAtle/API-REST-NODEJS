var nodemailer = require('nodemailer');

exports.sendEmail=(req,res,next)=> {
	var correo = req.params.email;
	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: 'utnodejs@gmail.com',
	    pass: '20182018'
	  }
	});
	var mailOptions = {
	  from: 'utnodejs@gmail.com',
	  to: correo,
	  subject: 'Sending Email using Node.js',
	  text: 'That was easy!'
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
}