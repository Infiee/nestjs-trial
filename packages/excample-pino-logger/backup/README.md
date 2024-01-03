transport内的配置不能和pino.multistream重叠

```
transport: {
  targets: [
    process.env.NODE_ENV === 'production'
      ? undefined
      : {
          target: 'pino-pretty',
          level: 'error',
          options: {
            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
            singleLine: true,
            ignore: 'pid,hostname,context',
          },
        },
  ],
}
```

pino.destination 默认使用sonic boom实现，默认配置就是高性能了

### 日志切分
pino官方提供日志自动切分方案，把切分功能通过系统工具实现，使性能最大化（用于日志记录的资源越少，应用程序速度就越快）
https://getpino.io/#/docs/help?id=rotate

其它方案：
[pino-roll](https://github.com/feugy/pino-roll/tree/main) - transport实现
[file-stream-rotator] - 性能低于transport内的实现方式

pino日志过滤
mac系统为例，切换到log目录下，执行命令`grep '"level":30' info.log`

pino查询日志可以搭配 elk(Elasticsearch + Logstash + kibana)
https://github.com/pinojs/pino-elasticsearch
