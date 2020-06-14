require('dotenv').config();
const User 			= require('../models/user.model');
const bcryptjs 		= require('bcryptjs');
const jsonwebtoken 	= require('jsonwebtoken');

exports.DaftarUser = async (req,res) => {

	const { username,email,password} = req.body

	let usernameUser = await User.findOne({username:username})
	let emailUser = await User.findOne({email:email})

	if(usernameUser){
		return res.status(404).json({
			status:false,
			message:'Username Sudah Terdaftar',
		});
	}
	
	if(emailUser){
		return res.status(404).json({
			status:false,
			message:'Email Sudah Terdaftar',
		});
	}

	const hashPassword = await bcryptjs.hash(password,10)

	const user = new User({
		username 	: username,
		email 		: email,
		password 	: hashPassword,
	})

	user.save();

	return res.status(200).json({
		status:true,
		message:'User berhasil di daftarkan',
	});
}

exports.LoginUser = async (req,res) => {

	const {username,password} = req.body

	let dataUser = await User.findOne({$or:[{username : username},{email : password}] })

	if(!dataUser){
		return res.status(401).json({
			message : 'username / email tidak terdaftar'
		})
	}

	console.log(dataUser);
	const passwordUser = await bcryptjs.compare(password,dataUser.password)

	if(passwordUser){

		const data = {
			id : dataUser._id
		}

		const token = await jsonwebtoken.sign(data,process.env.JSWT_SECRET)

		return res.status(200).json({
			message : 'berhasil',
			token:token
		})
	}else{
		return res.status(401).json({
			message : 'password salah'
		})
	}
}

exports.getSingleUser = async (req,res) => {
	const user = await User.findOne({_id:req.id})
	return res.status(200).json({
			message : 'berhasil di call',
			data : user
		})
}