# tool-dedog

web前端js报错上报

## 特性

- 支持浏览器js报错上报（事件上报至monitor,错误信息上报至日志系统）

## 安装

```sh
npm install git+http://gitlab.futunn.com/webpackage/tool-dedog.git#1.0.3
```

> 安装时请指定版本号。

## 使用

### 引入依赖（方式不限）

支持AMD与CommonJs的方式加载模块。以页面直接加载为例：

```html
<!--引入tool-dedog.js-->
<script type="text/javascript" src="../tool-dedog/index.js"></script>
```

### 调用

```javascript

var Dedog = window['tool-dedog'];

var dedog = new Dedog({
	monitorId:'400050'
});

dedog.listen();

```

### 参数说明
| 名称 | 说明 | 默认值 |
| :--: | :--- | :--: |
| monitorId | 上报到监控平台monitor的monitorId |  |
## API

### `Dedog(config)`

构造函数，返回`Dedog`实例，参数：

- `config` 上报相关参数
	- `monitorId` 监控平台monitor.server.com的monitorId

### `Dedog#listen()`

实例方法，用于监听浏览器报错及上报报错数据。


## 开发

源码位于`src/index.js`，开发完成后执行`webpack`打包，生成根目录下的`index.js`。

## 版本记录

### 1.0.3 2016-08-09

- 修正上报数据未做urlencode导致日志不正确的bug

### 1.0.2 2016-07-07

- 修改正式环境上报域名

### 1.0.1 2016-07-07

- 优化部分上报逻辑，去掉调试信息

### 1.0.0 2016-06-27

- 初始版本，js报错捕获上报
