const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();
//middleware
app.use(bodyParser.json());

const database = {
	users:[
		{
			id:'123',
			name:'jones',
			email:'jones@gmail.com',
			password:'12345',
			entries: 0,
			joined: new Date()
		},
		{
			id:'124',
			name:'jimmy',
			email:'jimmy@gmail.com',
			password:'09876',
			entries: 0,
			joined: new Date()
		}
	],
	login:[
		{
			id:'987',
			hash:'',
			email:'jones@gmail.com'
		}
	]
}

app.get('/', (req,res)=>{
	res.json(database.users)
})

//SignIn
app.post('/signin', (req,res)=>{
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.status(200).json('success')
	}else {
		res.status(400).json('failed')
	}
})

//Register
app.post('/register', (req,res)=>{
	const{email,name,password} = req.body;
	database.users.push({
		id:'125',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})
//Get profile
app.get('/profile/:id',(req,res)=>{
	const{id}= req.params;
	let found = false;
	database.users.forEach( user=> {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	})
	if(!found){
		res.status(404).json('not found')
	}
});

//post Image
app.put('/image',(req,res)=>{
	const{id}= req.body;
	let found = false;
	database.users.forEach( user=> {
		if (user.id === id) {
			found = true;
			user.entries++
			return res.json(user.entries);
		}
	})
	if(!found){
		res.status(400).json('not found')
	}
})



app.listen(3000,()=>{
	console.log('Server ti wa online')
})