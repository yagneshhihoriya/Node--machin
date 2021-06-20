const httpcodes = require('http-status-codes')
const categoryHelper = require('../helpers/category-helper')

exports.getCategorys = async (req, res) => {
    let { length, start } = req.body
    let response = await categoryHelper.getCategorys(start, length)
    return res.status(httpcodes.OK).json(response)
}

exports.addCategory = async (req, res) => {
    let { name, categoryId } = req.body
    let response = await categoryHelper.addCategory(name, categoryId)
    return res.status(httpcodes.OK).json(response)
}

exports.updateCategory = async (req, res) => {
    let { id, name, categoryId } = req.body
    let response = await categoryHelper.updateCategory(id, name, categoryId)
    return res.status(httpcodes.OK).json(response)
}

exports.deleteCategory = async (req, res) => {
    let id = req.params.id
    let response = await categoryHelper.deleteCategory(id)
    return res.status(httpcodes.OK).json(response)
}