const { promisePool } = require('../config/database');
class SchoolModel {
    static async create(schoolData) {
        const { name, address, latitude, longitude } = schoolData;
        const [result] = await promisePool.execute(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );
        return {
            id: result.insertId,
            name,
            address,
            latitude,
            longitude
        };
    }
    static async getAll() {
        const [rows] = await promisePool.execute(
            'SELECT id, name, address, latitude, longitude FROM schools ORDER BY name'
        );
        return rows;
    }
    static async getById(id) {
        const [rows] = await promisePool.execute(
            'SELECT id, name, address, latitude, longitude FROM schools WHERE id = ?',
            [id]
        );
        return rows[0] || null;
    }
}
module.exports = SchoolModel;