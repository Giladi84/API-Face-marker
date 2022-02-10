const express = require('express');
const bcrypt = require('bcrypt-nodejs');
cors = require('cors')
const fetch = require('node-fetch')


const signin = require('./controllers/signin')
const register = require('./controllers/register')
const image = require('./controllers/image')



const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}
  }
});


const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => res.json('Server be working!!!'))
app.post('/signin', (req,res) => signin.handleSignIn(req,res,knex,bcrypt));
app.post('/register', (req,res) => register.handleRegister(req,res,knex,bcrypt))
app.put('/image', (req,res) => image.handleImage(req,res,knex))
app.post('/imageUrl', (req,res) => image.handleClarifaiCall(req,res,fetch))


app.listen(process.env.PORT || 3000 , () => console.log('working!!!!!'))