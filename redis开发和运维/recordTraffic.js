let express = require('express');
let bodyParser = require('body-parser')

let Promise = require("bluebird");

let redis = require('redis');
let client = Promise.promisifyAll(redis.createClient());
let app = express();

app.use(bodyParser.json());

app.post('/login', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;

	// todo 
	// use redis record every user login record.
	console.log(username, password);

	async function main() {
		//userid:pageview
		let key =  username + ":" + "pageview"

		await client.incr(key);
		let reply = await client.getAsync(key)
		return reply;
	}

	main().then( (reply) => {
		console.log(reply);
		res.send('Congratulations on your successful login');
	}).catch((err) => {
		console.log(err);
		return err;
	})
});

app.listen(3000);