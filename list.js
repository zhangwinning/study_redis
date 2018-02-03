let client = require('./client');

// client.rpush('testList', 'a');
// client.rpush('testList', 'b');
// client.rpush('testList', 'c');
// client.rpush('testList', 1);


client.lpop('testList', (err, v) => {
	console.log('left loop ', v);
})
//大于等于0，表示从左边开始计数;负数是从右边开始计数
//第二个参数， 表示计数的个数 -1 表示最后一个数
client.lrange('testList', 0 , -1, (err, list) => {
	console.log(list);
	client.quit();
})
