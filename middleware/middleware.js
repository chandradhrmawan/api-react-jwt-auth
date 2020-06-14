require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');

module.exports = async (req,res,next) => {
	const token = req.header('api_token');

	if(!token){
		return res.status(401).json({
			status:false,
			message:"tidak ada token"
		})
	}

	const decode = jsonwebtoken.verify(token,process.env.JSWT_SECRET)
	req.id = decode.id
	next();

}