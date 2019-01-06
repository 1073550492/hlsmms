var express = require('express');
var router = express.Router();
//引入数据库连接模块
let conn =require("./conn")

//通用的跨域路由
router.all("*",(req,res,next)=>{
    //res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Origin"," http://192.168.0.102:8080");  //允许携带cookie证书的域名 172.16.4.241:8080
    res.header("Access-Control-Allow-Credentials",true);  //值是一个布尔值，表示是否允许发送Cookie
    next(); //放行执行下面的路由
});

//添加用户路由
router.post("/useradd",(req,res)=>{
    //接收前端发过来的数据
    let {username,pass,usergroups}=req.body;
    //数据库需要导入的数据
    let sqlStr="insert into userinfo(username,userpwd,usergroup)values(?,?,?)";
    let sqlParmas=[username,pass,usergroups];
    //执行sql语句
    conn.query(sqlStr,sqlParmas,(err,result)=>{
        if(err){
            throw err;
        }else{
            console.log(result);
            //根据执行的结果返回数据给前端
            if(result.affectedRows>0){
                res.json({"isOk":true,"code":1,"msg":"用户添加成功！"});
            }else{
                res.json({"isOk":false,"code":-1,"msg":"用户添加失败！"});
            }
        }
    });
});
//获取用户列表的路由
router.get("/getusers",(req,res)=>{
    //构造sql语句
    let sqlStr="select * from userinfo order by userid DESC";//按id降序排列
    //执行sql语句
    conn.query(sqlStr,(err,users)=>{
        if(err){
            throw err;
        }else {
            res.send(users);
        }
    })
});
//删除用户路由
router.get('/deluser',(req,res)=>{
    //接收前端传过来的用户id
    let userid = req.query.userid;
    //创建sql语句
    let sqlStr = `delete from userinfo where userid=${userid}`;
    // let sqlParams = [userid];
    conn.query(sqlStr,(err,result)=>{
        if(err){
            throw err;
        }else{
            //result对象中有属性 affectedRows: 1,  //受影响的行数，大于0表示执行成功
            if(result.affectedRows>0){
                res.send({"isOk":true,"code":1,"msg":"用户删除成功！"});
            }else{
                res.send({"isOk":false,"code":-1,"msg":"用户删除失败！"})
            }
        }
    });
});
//修改用户 获取就数据路由
router.get('/getuserbyid',(req,res)=>{
    //接收id
    let userid = req.query.userid;
    //创建sql语句
    let sqlStr = "select * from userinfo where userid="+userid;
    conn.query(sqlStr,(err,result)=>{
        if(err){
            throw  err;
        }else{
            //后端把查询到的旧数据返回给前端
            res.send(result);
        }
    })
});
//修改用户  保存修改结果
router.post('/usersave',(req,res)=>{
    //接收前端传过来的数据
    let {username,userpwd,usergroup,userid}=req.body;
    //构建sql语句
    let sqlStr="update userinfo set username=?,userpwd=?,usergroup=? where userid=?";
    let sqlParams=[username,userpwd,usergroup,userid];
    conn.query(sqlStr,sqlParams,(err,result)=>{
        if(err){
            throw err;
        }else{
            //根据执行结果（受影响的行数）返回json给前端
            if(result.affectedRows>0){
                res.send({"isOk":true,"code":1,"msg":"用户修改成功！"});
            }else {
                res.send({"isOk":false,"code":-1,"msg":"用户修改失败！"});
            }
        }
    })
});
//验证用户登录身份的路由
router.post("/checkLogin",(req,res)=>{
    /*2）后端——接收账号和密码，根据账号和密码到数据库中查询
    Select * from userinfo where username=’账号’ and userpwd=’密码’
    账号和密码2个条件同时成立，找到了结果就是合法的，没有找到结果就非法。*/
    let {username,userpwd}=req.body;
    let sqlStr="select * from userinfo where username=? and userpwd=?";
    let sqlParams=[username,userpwd];

    //执行sql语句
    conn.query(sqlStr,sqlParams,(err,result)=>{
        if(err){
            throw err;
        }
        else{
            //3）后端——返回json结果给前端
            //[] 空数组表示验证失败   [].length>0数组非空就表示验证成功
            if(result.length>0){
                // [{"userid":35,"username":"yinhonxia","userpwd":"123456","usergroup":"超级管理员","addDate":"2018-12-31T08:23:57.000Z","isLocked":0}]
                //登录成功：写入cookie
                res.cookie("userid",result[0].userid);
                res.cookie("username",username);

                res.send({"isOk":true,"msg":"用户登录成功！"});
            }
            else{
                //登录失败
                res.send({"isOk":false,"msg":"用户登录失败！"});
            }
        }
    });
});

//验证cookie是否存在
router.get("/getCookie",(req,res)=>{
    let userid=req.cookies.userid;
    let username=req.cookies.username;
    //如果存在就有cookie就合法
    if(userid && username){
        res.send({"isOk":true});
    }
    else{
        res.send({"isOk":false});
    }
});

//清除cookie的路由
router.get("/loginOut",(req,res)=>{
    res.clearCookie("userid");
    res.clearCookie("username");
    res.send({"isOk":true});
});
router.get('/',function (req,res,next) {
    res.send('路由通了');
});

module.exports = router;
