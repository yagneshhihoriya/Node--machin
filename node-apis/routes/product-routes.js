const router = require("express").Router();
const productCtrl = require('../controllers/product-controller');

router.post('/', (req, res) => {
    return productCtrl.getProducts(req, res)
})

router.post('/add', (req, res) => {
    return productCtrl.addProduct(req, res)
})

router.put('/update', (req, res) => {
    return productCtrl.updateProduct(req, res)
})

router.delete('/delete/:id', (req, res) => {
    return productCtrl.deleteProduct(req, res)
})
module.exports = router
