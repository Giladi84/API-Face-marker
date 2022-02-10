const handleSignIn = (req,res,knex,bcrypt) => {
	const {email,password} = req.body;

	knex.select('hash')
	.from('login')
	.where('email','=',email)
	.then (returnedHash => {
		
		if (returnedHash.length) {
			if (bcrypt.compareSync(password, returnedHash[0].hash)) {
				knex(`users`)
				.select("*")
				.where("email","=", email)
				.then(user => res.json(user[0]))
				.catch(err => res.json('there was an error...'))
			} else {
				return res.json(`wrong password...`)
			}
		} else {
			return res.status(400).json(`email isn't in database`)
		}
	
	})
	.catch(err => res.json('the error is:', err))
}


module.exports = {
	handleSignIn: handleSignIn
}