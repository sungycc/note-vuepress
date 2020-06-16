# mysql

## mysql环境

- SQL structured query language
- 启动phpStudy或者wampserver(包含mysql)
- 下载Navicat Premium并且安装
- 操作数据库：1、界面；2、命令行

## 增删改查

### sql语句

- 插入数据
  + insert into 表名 (字段列表) values (数据列表)
  + insert user (username,password,age) values ('lisi','123',12);
  + insert into 表名 (field1,field2...fieldN) values (value1,value2...valueN)
  + insert into user (username,password,age,sex) values ('小三','123',24,'男')
- 删除数据
  + delete from 表名 where 条件
  + delete from user where id=1 and username='lisi'
  + drop table table_name
  + delete from user where id = 5
  + delete from user where id = 2
- 修改数据
  + update 表名 set 字段名称=字段值,字段名称=字段值,.... where 条件
  + update user set username='wangwu123',`password` = '123456' where id = 12 or username='wang'
  + update table_name set field1 = new_value1,field2 = new_value2 [where clause]
  + ipdate user set username = 'zhengqi' where id = 1;
  + update user set username='adm',password='111'   //  修改user表中所有的username和password
  + update user set username='吃饭',password='123' where id=3 and username='adm'  //  只修改user表中的符合id=3 and username='adm'的数据
- 查询数据
  + select */字段列表 from 表名 where 条件
  + select column_name,column_name from table_name [where clause] [offset m][limit n]
  + select * from user //  查看user表中所有的数据
  + select username from user where id = 2
  + select count(*) as eee from 'user'
  + select username as un from user
- 分页查询
  + select * from user limit 1,3  //从第一条数据开始查看三条数据
  + 参数一：查询开始的位置(从0开始)
  + 参数二：每次查询多少条数据
- 多表查询
  + select * from user,depart where user.departid = depart.id
  + select `user`.username,depart.depart from user,depart where `user`.deparid = depart.id
  + select u.username,d.depart from user u,depart d where u.departid = d.id

### 原生nodejs

```javascript
/*
  数据库基本操作步骤
*/
const mysql = require('mysql');
// 创建数据库连接
let connection = mysql.createConnection({
  host: 'localhost', //数据库所在的服务器域名或者IP
  user: 'root', //用户名
  password: 'root', //密码
  database: 'book' //数据库名称
});
// 执行连接动作
connection.connect();

// 执行数据库操作
let sql = 'select * from user';
connection.query(sql, (err, rows, fields) => {
  if (err) throw err;
  console.log(rows);
});

/*//    插入操作
let sql = 'insert into user set ?';
let data = {
  username: 'lisi',
  password: '111',
  age: 12
}
connection.query(sql, data, (err, rows, fields) => {
  if (err) throw err;
  console.log('The solution is: ', rows[0]);
});*/

/*//    更新操作
let sql = 'update user set username=?,password=?,age=? where id=?';
let data = ['zhangsan', '123456', 15, 10];
connection.query(sql, data, (err, rows, fields) => {
  if (err) throw err;
  console.log('The solution is: ', rows.affectedRows);
});*/

/*//    删除操作
let sql = 'delete from user where id=?';
let data = [10];
connection.query(sql, data, (err, rows, fields) => {
  if (err) throw err;
  console.log('The solution is: ', rows.affectedRows);
});*/

/*//    查询操作
let sql = 'select * from user where id=?';
let data = [1];
connection.query(sql, data, (err, rows, fields) => {
  if (err) throw err;
  console.log('The solution is: ', rows[0]);
});*/

// 关闭数据库
connection.end();
```

### 封装nodejs方法

```javascript
/*
    封装通用的方法
*/
const mysql = require('mysql');
exports.base = (sql, data, callback) => {
  // 创建数据库连接
  let connection = mysql.createConnection({
    host: 'localhost', //数据库所在的服务器域名或者IP
    user: 'root', //用户名
    password: '', //密码
    database: 'book' //数据库名称
  });
  // 执行连接动作
  connection.connect();
  // 执行数据库操作
  connection.query(sql, data, (err, rows) => {
    if (err) throw err;
    callback(rows);
  });
  // 关闭数据库
  connection.end();
}
/*
  测试封装的通用方法
*/
const db = require('./db.js');

// let sql = 'select * from user where id = ?';
// let data = [9];
// db.base(sql,data,(ret) => {
//   console.log(ret[0]);
// });

// let sql = 'insert into user (username,password,age,departid) values ("zhangsan","123",12,2)';
// let sql = 'insert into user set ?';
// let data = {
//   username : 'lisi',
//   password : '123',
//   age : 12,
//   departid : 1
// }
// let data = null;
// db.base(sql,data,(ret) => {
//   console.log(ret);
// });

// let sql = 'update user set username=? where id=?';
// let data = ['zhaoliu',9];
// db.base(sql,data,(ret) => {
//   console.log(ret);
// });

let sql = 'delete from user where id = ?';
let data = [12];
db.base(sql,data,(ret) => {
  console.log(ret);
});
```