const pool = require('../dbconfig')


exports.getCategorys = async (start = 1, limit = 10, orderCol = '', order = '') => {
    let con
    try {
        con = await pool.getConnection()
        let query = 'select count(*) as total from category';
        let result = await con.query(query)
        let recordsTotal = result[0].total

        query = `select count(*) as total from category`;
        result = await con.query(query)
        let recordsFiltered = result[0].total

        query = `select * from category`;
        result = await con.query(query);
        delete result['meta']
        if (result.length > 0) {
            return { success: true, data: result, recordsTotal, recordsFiltered }
        }
        return { success: false, reason: 'Database error' }
    } catch (error) {
        throw error
    } finally {
        if (con) con.end()
    }
}

exports.addCategory = async (name) => {
    let con
    try {
        con = await pool.getConnection()
        let result = await con.query('insert into category (name) values(?)', [name])
        if (result.affectedRows > 0) {
            return { success: true, reason: 'Category Added' }
        }
        return { success: false, reason: 'Category not added' }
    } catch (error) {
        throw error
    } finally {
        if (con) con.end()
    }
}

exports.updateCategory = async (id, name) => {
    let con
    try {
        con = await pool.getConnection()
        let result = await con.query('update category set name=? where id=?', [name, id])
        if (result.affectedRows > 0) {
            return { success: true, reason: 'Categpry updated' }
        }
        return { success: false, reason: 'Categpry not updated' }
    } catch (error) {
        throw error
    } finally {
        if (con) con.end()
    }
}

exports.deleteCategory = async (id) => {
    let con
    try {
        con = await pool.getConnection()
        let result = await con.query('delete from category where id=?', [id])
        if (result.affectedRows > 0) {
            return { success: true, reason: 'Category is deleted' }
        }
        return { success: false, reason: 'Category not deleted' }
    } catch (error) {
        throw error
    } finally {
        if (con) con.end()
    }
}