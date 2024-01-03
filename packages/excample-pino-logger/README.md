### 前言

一直好奇为什么pino不提供如winston那样的日志切分功能，去官网和找了很久的解决办法，发现git仓库的使用人数都比较少或者是遗弃的，今天无意看到官网下面的help帮助那一栏，发现pino都有对应的官方解决方案，一切都是为了性能

> pino.destination 使用sonic boom实现，默认配置就是高性能了

### 几种日志切分方案

- [logrotate](https://github.com/logrotate/logrotate) - 官方推荐方式,也是性能最优的方式
- [pino-roll](https://github.com/feugy/pino-roll/tree/main) - transport实现
- [rotating-file-stream](https://github.com/iccicci/rotating-file-stream) - transport实现
- [file-stream-rotator](https://github.com/rogerc/file-stream-rotator) - 结合`pino.multistream(streams)`的方式使用，性能低于transport内的实现（出于性能原因，官方不建议定位多个目标的方式）

### 日志查询、过滤

- 以mac系统为例，切换到log目录下，执行命令`grep '"level":30' info.log`
- [pino-elasticsearch](https://github.com/pinojs/pino-elasticsearch) - 搭配Elk(Elasticsearch + Logstash + kibana)

### 小结

性能上logrotate > transport > stream，一般中小型项目可采用transport或stream方式较为方便

### 相关链接

- <https://getpino.io/#/docs/help?id=rotate> - pino官方文档
