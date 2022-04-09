/* sql */
const file = "./test.db"
const sqlite3 = require("sqlite3").verbose()
const date = require('date-and-time')


module.exports={
    getTodos:(req,res)=>{
        let db = new sqlite3.Database(file)
        let sql = "SELECT id, todo,createTime FROM todos"


        db.all(sql,function(err,row){
            if(err){
                throw err
            }
            res.render('index', {row: row })
        })
        db.close()
    },
    addTodos:(req,res)=>{
        if(req.body.addtodo ==""){
            res.redirect('/users')

        }else{

            let db = new sqlite3.Database(file)
            let sql_add =  "INSERT INTO todos_user(todo,createTime,owner_id) VALUES (?,?,?)"
            //time format
            let now = new Date()
            let createTime = date.format(now,'YYYY/MM/DD HH:mm:ss')
            
            //db
            db.run(sql_add,[req.body.addtodo,createTime,req.params.user_id]);
            db.close()
            res.redirect('/users')
        }
        

    },
    deleteTodos:(req,res)=>{
        let db = new sqlite3.Database(file)
        let delete_id = req.params.id
        
        var sql_delete = "DELETE from todos_user WHERE id=?"
        db.run(sql_delete,delete_id);
        db.close()
        res.redirect('/users')
    },
    editTodos_getID:(req,res)=>{
        res.render('edit', { edit_id:req.params.id })
    },
    editTodos:(req,res)=>{
        let db = new sqlite3.Database(file)
        let edit_id=req.body.id
        let edit_content=req.body.edit_content
        //time format
        let now = new Date()
        let createTime = date.format(now,'YYYY/MM/DD HH:mm:ss')

        var sql_edit = "UPDATE todos_user set todo=?,createTime=? where id=?"
        db.run(sql_edit,[edit_content,createTime,edit_id])
        db.close()
        res.redirect('/users')
        
    }
}