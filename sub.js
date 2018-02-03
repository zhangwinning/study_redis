//订阅者
let client = require('./client');

client.subscribe('testPublish');	//订阅发布的名字

client.on('message', (channel, mes) => {
	console.log(channel, mes);
})

