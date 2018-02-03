keys * // 显示所有key
get key  // 获取该key的value值

测试编辑
1. 更新数据库
2. 删除缓存

```
curl -X POST http://localhost:3000/getUser  -H 'Content-Type: application/json'  -d '{"name":"liyao"}'
```

```
curl -X POST http://localhost:3000/editUser  -H 'Content-Type: application/json'  -d '{"name":"liyao", "role": "girl"}'
```


//缓存更新的套路
借鉴	
https://coolshell.cn/articles/17416.html

这里使用的是`Cache Aside `
