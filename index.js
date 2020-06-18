require('dotenv').config();
const express 	= require('express');
const app  		= express();
const bodyParser = require('body-parser');
const RouteUser = require('./routes/User');
const mongoose 	= require('mongoose');
const cors 		= require('cors');

mongoose.connect(process.env.MONGO_URL,{
	useNewUrlParser : true,
	useUnifiedTopology : true,
	useFindAndModify:false,
	useCreateIndex:true
}).then(res => {
	console.log('berhasil konek mongodb');
}).catch(e => {
	console.log('gagal konek mongodb');
})

app.use(cors());
app.use(bodyParser.json());
app.use('/',RouteUser);

app.listen(process.env.PORT, (req,res) => {
	console.log('server run port : '+process.env.PORT);
})