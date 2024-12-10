<h1 align="center">HasChatService</h1>

<h5 align="center">基于vue3+socket.io的聊天应用</h5>

---

# 介绍

自我做的客服聊天以来，让我做一套聊天应用的呼声越来越多，加上那套客服聊天由于没有组件化、UI 设计等问题，也让我一直心有遗憾做的不够完美，于是利用空余时间做了一套相对完整的聊天应用。HasChat 是一套使用全新技术完成的通讯聊天网页。

- [PC 网页版前端：Vue3 + Vite + TypeScript + Naive UI + Socket.io](https://gitee.com/howcode/has-chat)
- [移动版前端：uni-app + Socket.io](https://gitee.com/howcode/has-chat-app)
- [后端：Express.js](https://gitee.com/howcode/has-chat-service)

作者开源目的旨在给刚学习该领域的新人一些引路，不管你是前端还是后端，都能对你在通讯聊天这个领域有一点点的启发。

```shell
无偿开源！你们的star是我的动力！
```

# 预览图

![PC端](https://s1.ax1x.com/2022/12/14/zIQeBR.png)

![PC端](https://s1.ax1x.com/2022/12/14/zIQmH1.png)

# ![移动端](https://s1.ax1x.com/2023/01/09/pSeE2m8.jpg)

# 在线预览

[haschat-PC 端](http://howcode.online/)

[haschat-移动端](http://howcode.online:8001/)

# 功能一览

- 登陆、随机获取用户登陆
- 发送邮箱验证码注册
- 发送表情+文字组合的富文本内容
- 发送图片内容，查看大图
- enter 发送信息，enter+ctrl 换行输入内容
- 消息提醒
- 未读消息标记
- 记录历史会话
- 记录历史聊天内容
- 切换主题
- 发送视频
- 发送语音（仅移动端具备）

# 版本说明

- 前端：暂无版本区别
- 后端：分为 mysql 版本（分支 main）和 json 版本（分支 master）；json 版本主要是为了不懂 mysql 的新手学习；

# 环境部署

```javascript
Node.Js >= 12.0.0
Mysql >= 5.7.0 (仅mysql版本需要，但执行mysql文件需要8.0以上版本)
```

## 下载项目

前端

```javascript
https://gitee.com/howcode/has-chat.git
```

后端 mysql 版本

```javascript
git clone -b main https://gitee.com/howcode/has-chat-service.git
```

后端 json 版本

```javascript
git clone -b master https://gitee.com/howcode/has-chat-service.git
```

## 启动项目

### 安装依赖

前、后端

```javascript
npm install
```

### mysql 配置（json 版本跳过）

- 在 mysql 的版本中，找到目录 store 下的 sql 文件，运行 sql 文件
  ![在这里插入图片描述](https://s1.ax1x.com/2023/04/29/p91dOwF.png)
  ![在这里插入图片描述](https://s1.ax1x.com/2023/04/29/p91dLeU.png)
  ![在这里插入图片描述](https://s1.ax1x.com/2023/04/29/p91dHyV.png)
  ![在这里插入图片描述](https://s1.ax1x.com/2023/04/29/p91dbLT.png)
- 依次运行全部 sql 文件，并且刷新数据库表就可看到了
  ![在这里插入图片描述](https://s1.ax1x.com/2023/04/29/p91wpS1.png)
- 找到 config.js 文件

```javascript
const db = mysql.createConnection({
  host: "", // 主机地址 （默认：localhost）
  user: "", // 用户名
  password: "", // 密码
  database: "", // 数据库
});
```

更多配置查看：[nodejs-mysql](https://www.runoob.com/nodejs/nodejs-mysql.html)

### 邮箱配置（json 版本跳过）

- 找到 config.js 文件

```javascript
emailConfig: { //邮箱配置
    host: "smtp.qq.com",//邮箱服务器  这里我用的QQ邮箱
    port: 465,//邮箱使用端口
    secure: true,//是否使用默认的465端口
    auth: {
      user: "", // 发送方邮箱地址
      pass: "" // smtp 验证码
    }
  }
```

详情使用可以查看该文章：[nodejs 发送邮箱信息](https://www.cnblogs.com/kusaki/p/11801769.html)

### 启动项目/服务

- 后端

```javascript
node app.js
```

- 前端

```javascript
npm run dev
```

_到此，项目可以正常运行_

# 视频教程

[本地构建 HasChat 项目](https://www.bilibili.com/video/bv1iY411K7La)

[宝塔部署 HasChat 项目](https://www.bilibili.com/video/BV1wd4y117pj)

# 项目目录

```javascript
hasChatService
├── src
│  └── query                    	  // 接口文件
│			  └── content.js				  // content数据表操作
│			  └── user.js					  // user数据表操作
│  └── store						  // 资源文件
│			  └── content.sql				  // content表SQL
│			  └── user.sql				  // user表SQL
│  └── app.js                        // 服务入口
```

# 重大升级日志

- 2022.12.14 原先的历史会话使用`user`表的`HistorySessionList`字段记录，但随着用户量的提升，这种方式的弊端越来越明显，严重影响了查询性能，故新建`history_session`表来记录用户的历史会话记录，如果需要将会话历史会话记录迁移到新表，使用`/api/changeHistorySession`接口来迁移数据
- 2022.12.14 原先的会话列表内容在 socket 的`joinSuccess`方法返回，但这种方式随着数据量的增多，导致进程严重阻塞，故单独改成`/api/getContentBySendId`接口分页调用

# 免责声明

一、本项目宗旨在于为广大的正在学习通讯方面的新手提供学习、思路

二、本项目资源全部免费分享，包括前端源码、后端转源码等。本项目不会利用任何资源进行任何的销售盈利活动。

三、任何情况下，因使用本项目进行违法犯罪的行为，本人不承担任何法律责任。

# 未来计划

- 发送视频功能（已完成）
- 发送语音功能（已完成）
- uni-app 开发混合 app/h5/小程序版本（已完成）
- 将历史会话接口改成分页查询提高查询速度(已完成)
- 将会话消息改成单独接口调用(已完成)
- 群聊功能

# 交流群

- 添加`howcoder`微信进群（关于项目解答、技术/行业/兴趣交流）

# 😊 捐助作者

<table>
	<tr>
		<td><img src="https://s1.ax1x.com/2023/01/09/pSeE0FH.jpg" width="220"/></td>
		<td><img src="https://s1.ax1x.com/2023/01/09/pSeEylt.jpg" width="220" /></td>
	</tr>
</table>
<code>👍👍👍👍👍👍 您的捐助和赞赏，将会是作者howcode更好的维护动力！</code>
