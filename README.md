# websocket-express-webchat
基于websocket的一个简单的聊天室
express+socket.io+animate.css+angular

## Warning!
请使用高版本nodejs，本项目包含部分ES6语法

## Demo
由于域名备案原因，不再提供在线版，请clone到本地使用

## 使用方法
* Step 1 下载本项目
```
https://github.com/ShanaMaid/websocket-express-webchat.git
```

* Step 2 安装依赖
```
npm install 
```

* Step 3 启动服务
```
node app.js
```

* Step 4 进入聊天室
```
访问  http://localhost/
```

## config.json
聊天室配置文件
```
{
  "history_num":20,  //服务器缓存的历史信息条数
  "sever_port":80,	//服务器监听端口号
  "backup":true,    //是否开启服务端信息备份
  "backup_filename":"./backup/example.json"  //备份文件名字
}
```

## 备份
```
[
  {
    "name":"测试人员1",
    "time":"2017-2-13  23:32:17",
    "content":"一条简单的测试信息"
  },
  {
    "name":"测试人2",
    "time":"2017-2-13  23:33:42",
    "content":"那你很棒哦"
  },
  {
    "name":"测试人3",
    "time":"2017-2-13  23:33:54",
    "content":"肯定很棒哦"
  }
]
```

## 功能
- [x] 进入房间通知
- [x] 离开房间通知
- [x] 消息接收与发送
- [x] 在线列表
- [x] 服务器端信息备份

## 版本更新记录
* v1.0.3 聊天室在线人员显示错误，多人离线时会出现在线列表混乱。目前已修复
* v1.0.2 聊天室历史加载记录，存在错误，已修复！
* v1.0.1 服务器端信息备份
* v1.0.0 即时聊天 

## License
see [MIT LICENSE](./LICENSE) for details
