const pool = require('../dbconfig')


exports.getProducts = async (start = 1, limit = 10, orderCol = '', order = '') => {
    let con
    try {
        con = await pool.getConnection()
        let query = 'select count(*) as total from product';
        let result = await con.query(query)
        let recordsTotal = result[0].total

        query = `select count(*) as total from product
        left join category on product.categoryId=category.id`;
        result = await con.query(query)
        let recordsFiltered = result[0].total

        query = `select product.id,product.name as productName,category.name as category,category.id as categoryId from product
        left join category on product.categoryId=category.id limit ${start},${limit}`;
        result = await con.query(query);
        delete result['meta']
        if (result.length > 0) {
            return { success: true, data: result, recordsTotal, recordsFiltered }
        }
        return { success: false, reason: 'Product not added' }
    } catch (error) {
        throw error
    } finally {
        if (con) con.end()
    }
}

exports.addProduct = async (name, categoryId) => {
    let con
    try {
        con = await pool.getConnection()
        let result = await con.query('insert into product(name,categoryId) values(?,?)', [name, categoryId])
        if (result.affectedRows > 0) {
            return { success: true, reason: 'Product Added' }
        }
        return { success: false, reason: 'Product not added' }
    } catch (error) {
        throw error
    } finally {
        if (con) con.end()
    }
}

exports.updateProduct = async (id, name, categoryId) => {
    let con
    try {
        con = await pool.getConnection()
        let result = await con.query('update product set name=?,categoryId=? where id=?', [name, categoryId, id])
        if (result.affectedRows > 0) {
            return { success: true, reason: 'Product updated' }
        }
        return { success: false, reason: 'Product not updated' }
    } catch (error) {
        throw error
    } finally {
        if (con) con.end()
    }
}

exports.deleteProduct = async (id) => {
    let con
    try {
        con = await pool.getConnection()
        let result = await con.query('delete from product where id=?', [id])
        if (result.affectedRows > 0) {
            return { success: true, reason: 'Product is deleted' }
        }
        return { success: false, reason: 'Product not deleted' }
    } catch (error) {
        throw error
    } finally {
        if (con) con.end()
    }
}