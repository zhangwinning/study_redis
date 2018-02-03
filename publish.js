//发布者
let client = require('./client'); 

//指定发布的名字，和内容
client.publish('testPublish', 'this is message publish \t');