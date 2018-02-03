let client = require('./client');

// 从右边进入列表
client.rpush('testList', 'a');
client.rpush('testList', 'b');
client.rpush('testList', 'c');
client.rpush('testList', 1);

// 从左边出列表
client.lpop('testList', (err, v) => {
	console.log('left loop ', v);
	// left loop  a
})

// lrange 为打印列表
// 大于等于0，表示从左边开始计数;负数是从右边开始计数
// 第二个参数，  表示最后一个数，-1表示最后一个数；
client.lrange('testList', 0 , -1, (err, list) => {
	console.log(list);
 	// [ 'b', 'c', '1' ]
	client.quit();
})
