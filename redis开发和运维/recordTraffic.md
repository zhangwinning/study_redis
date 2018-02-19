1、使用redis，记录网站每个用户个人主页的访问量。

使用`incr`

// 建立`userid:pageview`为key的数据，若该key无，默认设置为0
incr userid:pageview(单线程，无竞争)，redis是天然适合做计数器的，无论并发量是多大，都是可以的

代码见`recordTraffic.md`


2、使用redis设置缓存，见


https://github.com/WenNingZhang/study_redis/tree/master/practice