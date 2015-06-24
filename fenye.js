/**
 * Created by 飞 on 2015/6/17.
 */
var log = function(message){
    console.log(message);
}
var express = require('express');
var app = express();
var mysql = require('mysql');
var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'fenye',
    port:3306
});
conn.connect();

app.get('/fenye',function(req,res){
    var perPageNum = req.query.perPageNum;
    var yemaNum = req.query.yemaNum;
    var start = parseInt(yemaNum -1) * perPageNum;
    var resObj = {};

    conn.query("select count(*) from severfenye",res,function(err,rows){
        if(err) throw err;
        resObj["itemTotal"] = rows;
        conn.query("select * from severfenye limit " + start + "," + perPageNum,res,function(err,rows){
            resObj["itemArr"] = rows;
            res.jsonp(resObj);
        })
    })
})
app.listen(3000,function(){
    console.log("sever is ok");
});