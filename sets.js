let client = require('./client');

client.sadd('testSet', 1); 
client.sadd('testSet', 'a'); 
client.sadd('testSet', 'b'); 


// 集合元素没有添加，集合插入数据前，先看是否存在该数据。
client.smembers('testSet', (err, sets) => {
	console.log(sets);
	client.quit();
});