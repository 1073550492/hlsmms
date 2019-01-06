//引入mysql模块
const  mysql=require('mysql');
//数据库连接配置
const conn=mysql.createConnection({
    host     : 'localhost', //数据库主机名
    user     : 'root',         //数据库账号
    password : 'root',    //密码
    database : 'hlsmms'      //使用哪个数据库
});
//打开数据库链接
conn.connect(err=>{
    if(err){
        console.log("× 数据库链接失败！",err.message);
    }else {
        console.log("√ 数据库链接成功！")
    }
});
module.exports = conn;