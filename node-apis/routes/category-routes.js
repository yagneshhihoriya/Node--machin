const router = require("express").Router();
const categoryCtrl = require('../controllers/category-controller');

router.post('/', (req, res) => {
    return categoryCtrl.getCategorys(req, res)
})

router.post('/add', (req, res) => {
    return categoryCtrl.addCategory(req, res)
})

router.put('/update', (req, res) => {
    return categoryCtrl.updateCategory(req, res)
})

router.delete('/delete/:id', (req, res) => {
    return categoryCtrl.deleteCategory(req, res)
})
module.exports = router
