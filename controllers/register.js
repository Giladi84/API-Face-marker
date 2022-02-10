const handleRegister = (req,res,knex,bcrypt) => {
	const {email,password,name} = req.body;
	let hashedPass = bcrypt.hashSync(password)
	
	knex.transaction(trx => {
		trx('login')
		.insert({
			email: email,
			hash: hashedPass
		})
		.returning('email')
		.then(returnedEmail => {
			return knex('users').returning('*').insert({
				email: returnedEmail[0].email,
				name: name,
				entries: 0,
				date_registered: new Date()
			})
			.then(user => {res.json(user[0])})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json(`can't register....`))
}

module.exports = {
	handleRegister: handleRegister
}