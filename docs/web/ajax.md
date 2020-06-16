# ajax

## 原生ajax详解

```javascript
// 1、创建XMLHttpRequest对象
var xhr = null;
if(window.XMLHttpRequest) {
  xhr = new XMLHttpRequest();//标准
}else {
  xhr = new ActiveXObject("Microsoft");//IE6
}
// readyState=0表示xhr对象创建完成
console.log(xhr.readyState + '----------1-----------');
// 2、准备发送
/*
参数一：请求方式（get获取数据；post提交数据）
参数二：请求地址
参数三：同步或者异步标志位，默认是true表示异步，false表示同步
post请求参数通过send传递，不需要通过encodeURI()转码
必须设置请求头信息
*/
var param = 'username='+uname+'&password='+pw;
xhr.open('post','04post.php',true);
// 3、执行发送动作
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xhr.send(param);//post请求参数在这里传递，并且不需要转码
// 4、指定回调函数
// readyState=1表示已经发送了请求
console.log(xhr.readyState + '----------2-----------');
// 该函数调用的条件就是readyState状态发生变化（不包括从0变为1）
xhr.onreadystatechange = function(){
  /*
  readyState:
  2 浏览器已经收到了服务器响应的数据
  3 正在解析数据
  4 数据已经解析完成，可以使用了
  */
  console.log(xhr.readyState + '----------3-----------');
  // 4表示服务器返回的数据已经可以使用了，但是这个数据不一定是正常的
  if(xhr.readyState == 4){
    // http的常见状态码
    /*
    200表示响应成功
    404没有找到请求的资源
    500服务器端错误
    */
    // 200表示服务器返回的数据是正常的，不是200的话表示数据是错误的
    if(xhr.status == 200){
      // 这里的200表示数据是正常的
      alert(xhr.responseText);
      // xhr.responseXML
    }
  }
}
```

## jquery-ajax方法

```javascript
//  1、使用$.ajax()方法
$.ajax({
  type: "GET/POST/PUT/DELETE",
  url: "一个用来包含发送请求的URL字符串", //只有这一个参数必须有
  data: {'需要传给服务器的参数以键值对形式体现'},
  dataType: "json/xml/html/script/text/jsonp"，
  success: function(){},    //成功响应后调用
  beforeSend: function(){},    //请求发送前调用
  error: function(){},    //错误响应时调用
  complete: function(){},    //响应完成时（包括成功和失败）调用
});
//  2、使用$.get()方法
$.get(url,type,data,callback);
/* 
url:待载入页面的URL地址
data:待发送 Key/value 参数。
callback:载入成功时回调函数。
type:返回内容格式，xml, html, script, json, text, _default。
*/
//  3、使用$.post()方法
$.post(url,type,data,callback);
/* 
url:发送请求地址。
data:待发送 Key/value 参数。
callback:发送成功时回调函数。
type:返回内容格式，xml, html, script, json, text, _default。
*/
```