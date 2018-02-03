"use strict";

let mongoose = require('mongoose');
let express = require('express');
let app = express();
const bodyParser = require('body-parser');

let redisClient = require('./redis'); 

//If you are using node v8 or higher, you can promisify node_redis with util.promisify as in:
const {promisify} = require('util');
const getAsync = promisify(redisClient.get).bind(redisClient);

let User = require('./user');

let url = 'mongodb://test:test@localhost/test';

 mongoose.connect(url)
.then(() =>  console.log('connection succesful'))
.catch((err) => console.log(err));

//把这个操作加入到缓存机制  

const REDIS_USER_PREFIX = 'user_';

app.use(bodyParser.json());

app.post('/getUser', function (req, res, next) {

	async function getUserFromMongo(name) {
		let user = await User.findOne({'username': name });
		if (user) {
			redisClient.set(REDIS_USER_PREFIX + name, JSON.stringify(user));
			return user;
		} 
		return user;
 	}

	async function getUserFromRedis(name) {
		let value = await getAsync(REDIS_USER_PREFIX + name);
		try {
			value = JSON.parse(value);
		} catch(e) {
			throw e;
		}
		return value;
	}

	getUserFromRedis(req.body.name).
		then((user) => {
			if (user) {
				res.send(user);
			} else {
				return getUserFromMongo(req.body.name);
			}
		}).
		then( (user) => {
			if (user) {
				res.send(user);
			} else {
				res.send('the user not save\n');				
			}
		}).catch( (err) => {
			res.send(err);
		})
});

app.post('/editUser', function(req, res, next) {
	
	//更新用户
	async function updateUser(name, role) {
		let user = await User.findOneAndUpdate({'username': name}, {'$set':{'role' : role}}, {new: true, upsert: true});
		return user;
	}
	//删除缓存
	async function deleteCache(name) {
		let deleteInfo = await redisClient.del(REDIS_USER_PREFIX + name);
		return deleteInfo;
	}

	updateUser(req.body.name, req.body.role).
		then( (user) => {
			return deleteCache(user.username);
		}).
		then((deleteInfo) => {
			if (deleteInfo) {
				res.send('OK');
			} else {
				res.send('not OK');
			}
		}).catch( (err) => {
			res.send(err);
		})
});

app.listen(3000, () => {
	console.log(`the server is listening : 3000`);
});

