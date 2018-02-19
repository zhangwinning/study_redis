1、使用redis，记录网站每个用户个人主页的访问量。

使用`incr`

// 建立`userid:pageview`为key的数据，若该key无，默认设置为0
incr userid:pageview

代码见`recordTraffic.md`