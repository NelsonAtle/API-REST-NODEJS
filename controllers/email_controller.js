var nodemailer = require('nodemailer');
const User = require('../models/user_model.js');
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

exports.sendEmail=(req,res,next)=> {
	var correo = req.params.email;
	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: 'utnodejs@gmail.com',
	    pass: '20182018'
	  }
	});
	var data =  Base64.encode(correo);
	//var url = 'http://localhost:4200/email_verificación/'+data;
	var mailOptions = {
	  from: 'TubeKIDS',
	  to: correo,
	  subject: 'Activate account TubeKIDS',
	  text: 'http://localhost:4200/email_verificacion/'+data
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	  	res.send("Enviado");
	    console.log('Email sent: ' + info.response);
	  }
	});
}

exports.verificar=(req,res,next)=> {
	const email =  Base64.decode(req.params.code);
	User.find({email:email})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found"
                });
            }
            data = {
		  		state:true
		  	};
		  	console.log(user[0].state);
		  	if (user[0].state === false) {
		  		User.findByIdAndUpdate(user[0]._id, data, {new:true}, (err, user) => {
				   	if(err) return res.status(500).send({message: 'Error internal server'});
				    if(user.state === true){
				    	console.log(user.state);
				       	return res.status(200).send("User Activated");
				    }else{
				       	return res.status(400).send({
				          	message: 'Error when activating the account'
				       	});
				    }
				});
		  	}else{
		  		res.status(200).send("User already activated");
		  	}
		  	
            }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found"
                });
            }
            return res.status(500).send({
                message: "Error internal server"
            });
        });
}