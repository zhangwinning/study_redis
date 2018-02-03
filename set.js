let redis = require('redis');

//连接redis

let client = redis.createClient(6379, 'localhost');

client.set('hello', 'this is a value');

//但是保存一个对象，会出现问题，可以通过这种重写方法保存。
Object.prototype.toString1 = function () {
	return JSON.stringify(this);
}

client.set('hello2', {'a':1}.toString1()); 	//当调用对象时，redis会{'a':1}调用.toString()方法，会变成'[object Object]'。但是可以通过重写这个方法进行转化。

client.get('hello2', (err, value) => {
	console.log(err, value, typeof value);
	client.quit();
});
