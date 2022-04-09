var express = require('express')
var router = express.Router()
const indexController = require('../controllers/index')



/* GET home page. */
router.get(['/','/index'],indexController.getTodos)

router.post('/add/:user_id',indexController.addTodos)

router.get('/delete/:id',indexController.deleteTodos)

router.get('/edit/:id',indexController.editTodos_getID)
router.post('/edit',indexController.editTodos)




module.exports = router

