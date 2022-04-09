
var file = "./test.db";

//載入 sqlite3
var sqlite3 = require("sqlite3").verbose();
//新增一個sqlite3的資料庫test.db
var db = new sqlite3.Database(file);

const date = require('date-and-time')

db.serialize(function() {
    //如果表格xxx不存在，就新增xxx
    // db.run("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, todo TEXT,createTime TEXT)");
    // db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,email TEXT, username TEXT ,password TEXT,createTime TEXT)");
    // db.run("CREATE TABLE IF NOT EXISTS todos_user (id INTEGER PRIMARY KEY, todo TEXT,createTime TEXT,owner_id INTEGER NOT NULL )");
    
    // let time = new Date()
    // let createTime =time.getFullYear()+'/'+time.getMonth()+1+'/'+time.getDate()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()
    // console.log(createTime)


    //新增資料
    // var sql01 = "INSERT INTO todos(todo,createTime) VALUES (?,?)";
    // db.run(sql01,["代辦事項1",Date()]);
    // db.run(sql01,["代辦事項2",Date()]);
    // db.run(sql01,["代辦事項3",Date()]);
    // db.run(sql01,["代辦事項4",Date()]);
    let now = new Date()
    let createTime = date.format(now,'YYYY/MM/DD HH:mm:ss')
    // var sql01 = "INSERT INTO users(email,username,password,createTime) VALUES (?,?,?,?)";
    // db.run(sql01,["example@example.com","Tiffany","123", createTime]);
    var sql01 = "INSERT INTO todos_user(todo,createTime,owner_id) VALUES (?,?,?)";
    db.run(sql01,["餵魚", createTime,"4"]);

    //查詢資料
    // var sql02 = "SELECT rowid AS id, name,remark FROM table01";
    // db.each(sql02, function(err, row) {
    // console.log(row.id + ": " + row.name);
    // });

    //更新資料
    // var sql03="update table01 set name=? where name=?" ;
    // db.run(sql03,["LuLu","Kevin"]);

    //查詢更新後的資料
    // var sql03_1 = "SELECT rowid AS id, name,remark FROM table01 where name=?";
    // db.each(sql03_1,"LuLu", function(err, row) {
    // console.log(row.id + ": " + row.name);
    // });

    //刪除資料
    // var sql04 = "delete from table01";
    // db.run(sql04);

});

db.close();