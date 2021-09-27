# 前言

## 启动程序

```
yarn

yarn start
```

## 前端页面访问

http://localhost:9000/html/

## 前端代码位置

- src/public/javascript/index.js

## postman-collection

- node-ajax.postman_collection

# 介绍

我们每天要和接口打交道，接口传递参数的方式有很多种，搞得我们眼花缭乱，今天简单介绍下 常见的
`query`、`body`、`path`、`FormData`格式的参数前端如何传递，后端如何接收。
此次讲解通过 `Postman` 测试请求，前端使用流行的 `axios` 请求库来模拟参数传入，后端使用`node-koa2` 来接收传递的参数。
注: 底部有源码链接

# Query String Parameters -- query 参数

- Query String Parameters 俗称： query 参数

这种类型的参数，常见于 `Get` 请求，参数会以 url string 的形式进行传递。

## 通过 postman 请求

![image.png](https://cdn.nlark.com/yuque/0/2021/png/243804/1632722958057-31181268-0615-48de-b11d-9c5ed24a68ad.png#clientId=u8a4a843f-4a04-4&from=paste&height=591&id=uac932d67&margin=%5Bobject%20Object%5D&name=image.png&originHeight=591&originWidth=871&originalType=binary&ratio=1&size=55319&status=done&style=none&taskId=u7d9a318e-5cfb-4d89-9348-1a97e56b026&width=871)
接口中返回的 `ctxQuery` 就是我们传入的参数

## 通过 axios 请求

```javascript
axios({
  method: "get",
  url: "/query",
  params: {
    name: "张三",
  },
});
```

- 浏览器中查看接口详情

![image.png](https://cdn.nlark.com/yuque/0/2021/png/243804/1632723224083-9463e816-daa2-4d74-8ccc-373100c397bd.png#clientId=uabbbdae2-08a7-4&from=paste&height=248&id=ud37449df&margin=%5Bobject%20Object%5D&name=image.png&originHeight=248&originWidth=538&originalType=binary&ratio=1&size=15381&status=done&style=none&taskId=uc1b2f0d1-0290-44f1-a0a0-f834446906f&width=538)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/243804/1632723241776-ab390d9b-9a48-4493-a99e-5dbfdcb981a4.png#clientId=uabbbdae2-08a7-4&from=paste&height=162&id=uab21d107&margin=%5Bobject%20Object%5D&name=image.png&originHeight=162&originWidth=729&originalType=binary&ratio=1&size=15257&status=done&style=none&taskId=ub081bfa1-a456-40ed-aaf3-a2f2f448567&width=729)

## 通过 koa 接收参数

```javascript
router.get("/query", (ctx, next) => {
  console.log(ctx.query); // 接收 query 参数
  ctx.body = new SuccessRes({
    method: ctx.request.method,
    url: ctx.request.url,
    ctxQuery: ctx.query,
  });
});
```

# Request Payload - body 参数

- Request Payload 俗称：body 参数

这种类型参数，常用于 `post` 请求，参数会以 `json` 格式传递

## 通过 postman 请求

![image.png](https://cdn.nlark.com/yuque/0/2021/png/243804/1632723358924-d1d26ad4-ce35-403c-a5de-7927361859ae.png#clientId=uabbbdae2-08a7-4&from=paste&height=591&id=u958c4aa9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=591&originWidth=834&originalType=binary&ratio=1&size=53745&status=done&style=none&taskId=u24553f18-523b-4d7e-a1d0-e95c3a8eb74&width=834)
接口中返回的 `ctxBody` 就是我们传入的参数

## 通过 axios 请求

```javascript
axios({
  method: "post",
  url: "/body",
  data: {
    phoneNumber: "18131239692",
    veriCode: "0422",
  },
});
```

- 浏览器中查看接口详情

![image.png](https://cdn.nlark.com/yuque/0/2021/png/243804/1632723463537-aa03741c-8854-48a2-9a2f-5a7bd2b454c7.png#clientId=uabbbdae2-08a7-4&from=paste&height=322&id=uc61b3242&margin=%5Bobject%20Object%5D&name=image.png&originHeight=322&originWidth=499&originalType=binary&ratio=1&size=19019&status=done&style=none&taskId=u7f7da9d5-e064-4991-9d1b-02ea326e58b&width=499)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/243804/1632723476435-efdab3cf-2b74-490b-9cae-d182a56fb693.png#clientId=uabbbdae2-08a7-4&from=paste&height=158&id=u6de3ec04&margin=%5Bobject%20Object%5D&name=image.png&originHeight=158&originWidth=674&originalType=binary&ratio=1&size=12150&status=done&style=none&taskId=u19f53397-1107-4df7-81f6-9417603134e&width=674)

## 通过 koa 接收参数

```javascript
router.post("/body", async (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = new SuccessRes({
    method: ctx.request.method,
    url: ctx.request.url,
    ctxBody: ctx.request.body,
  });
});
```

# Path - path 参数

path 参数 也称为 路由参数，写过 vue 路由的可能见过这种形式的路由

```javascript
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: "/user/:id", component: User },
  ],
});
```

接口中的路由也是动态路由的意思

## 通过 postman 请求

![image.png](https://cdn.nlark.com/yuque/0/2021/png/243804/1632723718335-5a0a6cff-5ab9-4fcd-8e5f-8be625b0cf78.png#clientId=uabbbdae2-08a7-4&from=paste&height=582&id=u586f6258&margin=%5Bobject%20Object%5D&name=image.png&originHeight=582&originWidth=830&originalType=binary&ratio=1&size=48962&status=done&style=none&taskId=ue9241a3a-4a7d-471c-bfa6-49a13d3e55f&width=830)
接口中返回的 `ctxParams` 就是我们传入的参数

## 通过 axios 请求

```javascript
axios({
  method: "get",
  url: "/path/12",
});
```

- 浏览器中查看接口详情

![image.png](https://cdn.nlark.com/yuque/0/2021/png/243804/1632723800786-2c55c550-a600-4f72-a19a-606612c04ad8.png#clientId=uabbbdae2-08a7-4&from=paste&height=265&id=ucb4d5f4f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=265&originWidth=555&originalType=binary&ratio=1&size=14235&status=done&style=none&taskId=u3e4b936c-9f75-4168-8f42-4770a0843d1&width=555)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/243804/1632723814904-55a98e8b-6cc2-4e6c-ac78-b135f934d944.png#clientId=uabbbdae2-08a7-4&from=paste&height=173&id=u35706119&margin=%5Bobject%20Object%5D&name=image.png&originHeight=173&originWidth=640&originalType=binary&ratio=1&size=12592&status=done&style=none&taskId=u8fd2bee5-1a5c-47d1-936b-4bbde345f2e&width=640)

## 通过 koa 接收参数

```javascript
router.get("/path/:id", async (ctx, next) => {
  console.log(ctx.params);
  ctx.body = new SuccessRes({
    method: ctx.request.method,
    url: ctx.request.url,
    ctxParams: ctx.params,
  });
});
```

# Form Data - formData 参数

- Form Data 俗称：表单参数

这种类型的参数是由早期网页表单通过 `action` 传递的参数，现在通常用于上传文件的接口。

## 通过 postman 请求

选择上传图片，和其他参数
![image.png](https://cdn.nlark.com/yuque/0/2021/png/243804/1632724029641-428267f8-6e2b-4719-b1e2-e059bd0750a9.png#clientId=uabbbdae2-08a7-4&from=paste&height=713&id=u73f62f1b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=713&originWidth=875&originalType=binary&ratio=1&size=81992&status=done&style=none&taskId=u49260db9-658f-4c1a-84d6-caad7e89b25&width=875)

- 接口中返回的 `fileList` 是我们传入的文件，处理后的信息
- 接口中返回的 `fields` 是我们传入的其他表单信息

## 通过 axios 请求

```javascript
let formData = new FormData();
formData.append("file", this.file); // 通过append向form对象添加数据
formData.append("name", "表单名字"); // 添加form表单中其他数据
const res = await axios({
  method: "post",
  url: "/formData",
  headers: { "Content-Type": "multipart/form-data" },
  data: formData,
});
console.log(res.data);
```

- 浏览器中查看接口详情

![image.png](https://cdn.nlark.com/yuque/0/2021/png/243804/1632724107575-dda3a393-ceb3-4099-87e9-6c3f13d2e443.png#clientId=uabbbdae2-08a7-4&from=paste&height=313&id=u64c66e4e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=313&originWidth=570&originalType=binary&ratio=1&size=17564&status=done&style=none&taskId=ua4c1c586-c684-4eef-8249-5b0f111e898&width=570)![image.png](https://cdn.nlark.com/yuque/0/2021/png/243804/1632724120961-38f1697c-a999-419b-9044-f44bc32f1bb4.png#clientId=uabbbdae2-08a7-4&from=paste&height=491&id=uc95a35d5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=491&originWidth=701&originalType=binary&ratio=1&size=30086&status=done&style=none&taskId=uabac7cf0-9c0b-4d28-b7b3-40d2ea3d293&width=701)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/243804/1632724128883-525dbbbb-704d-4ecd-aa96-fbda3c6fdf1f.png#clientId=uabbbdae2-08a7-4&from=paste&height=176&id=u51bd7dad&margin=%5Bobject%20Object%5D&name=image.png&originHeight=176&originWidth=678&originalType=binary&ratio=1&size=15807&status=done&style=none&taskId=u23e961f5-58a9-4937-a8d2-11295e37934&width=678)

## 通过 koa 接收参数

```javascript
const formidable = require("formidable");

router.post("/formData", async (ctx, next) => {
  // console.log(ctx.req);
  const res = await uploadFilesByFormidable(ctx.req);
  console.log(res);
  ctx.body = new SuccessRes({
    method: ctx.request.method,
    url: ctx.request.url,
    ...res,
  });
});

function uploadFilesByFormidable(req) {
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      // console.log({ fields, files });
      const filesKeys = Object.keys(files);
      const fileList = filesKeys.map((name) => {
        const file = files[name];
        return {
          fileName: file.name || name,
          filePath: file.path,
        };
      });
      resolve({
        fields,
        fileList,
      });
    });
  });
}
```

# 多种类型参数混合请求

上面的接口请求类型可以组合使用，下面来看示例吧

## 通过 postman 请求

![image.png](https://cdn.nlark.com/yuque/0/2021/png/243804/1632724322219-90db686b-f616-457b-b611-2b2df0270d29.png#clientId=uabbbdae2-08a7-4&from=paste&height=833&id=u0a804b77&margin=%5Bobject%20Object%5D&name=image.png&originHeight=833&originWidth=875&originalType=binary&ratio=1&size=68548&status=done&style=none&taskId=uc403ff9f-138d-4ab0-83fe-be20c5ef47d&width=875)

- `ctxQuery` 是我们传递的 query 参数
- `ctxParams` 是我们传递的 path 参数
- `ctxBody` 是我们传递的 body 参数

为什么没有混合使用 form data 参数呢，formData 和 json（body 参数）同属于 body 请求参数，所以只能出现一个。

## 通过 axios 请求

```javascript
axios({
  method: "post",
  url: "/mixTheRequest/12",
  params: {
    name: "张三",
    age: 23,
  },
  data: {
    phoneNumber: "18131239692",
    veriCode: "0422",
  },
});
```

- 浏览器中查看接口详情

![image.png](https://cdn.nlark.com/yuque/0/2021/png/243804/1632724504155-14575490-f661-495d-8fd4-74dbae2d61f8.png#clientId=uabbbdae2-08a7-4&from=paste&height=414&id=u8436dc94&margin=%5Bobject%20Object%5D&name=image.png&originHeight=414&originWidth=715&originalType=binary&ratio=1&size=27503&status=done&style=none&taskId=u4e995509-1380-4cd4-a406-0b36e40d115&width=715)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/243804/1632724525441-94fe7ead-45ce-4e7e-8e0b-88be22e8e98e.png#clientId=uabbbdae2-08a7-4&from=paste&height=188&id=u5eb189ec&margin=%5Bobject%20Object%5D&name=image.png&originHeight=188&originWidth=669&originalType=binary&ratio=1&size=19110&status=done&style=none&taskId=u38feba3d-14bb-49b8-92f6-53e930cefc1&width=669)

# 总结

以上就是 `query`、`body`、`path`、`FormData`格式的参数传递和接收的介绍，当然还有其他参数传递方式，这几种属于常见方式，其他方式大家可以继续探索。
​

github 源码：[https://github.com/ynzy/node-axios-params](https://github.com/ynzy/node-axios-params)
