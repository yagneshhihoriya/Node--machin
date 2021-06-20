const httpcodes = require('http-status-codes')
const productHelper = require('../helpers/product-helper')

exports.getProducts = async (req, res) => {
    let { length, start } = req.body
    let response = await productHelper.getProducts(start, length)
    return res.status(httpcodes.OK).json(response)
}

exports.addProduct = async (req, res) => {
    let { name, categoryId } = req.body
    let response = await productHelper.addProduct(name, categoryId)
    return res.status(httpcodes.OK).json(response)
}

exports.updateProduct = async (req, res) => {
    let { id, name, categoryId } = req.body
    let response = await productHelper.updateProduct(id, name, categoryId)
    return res.status(httpcodes.OK).json(response)
}

exports.deleteProduct = async (req, res) => {
    let id = req.params.id
    let response = await productHelper.deleteProduct(id)
    return res.status(httpcodes.OK).json(response)
}