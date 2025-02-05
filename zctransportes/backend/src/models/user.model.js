const db = require('../config/db.config');
const bcrypt = require('bcrypt');

class User {
    static async findByUsername(nomUser) {
        try {
            const [rows] = await db.execute('SELECT * FROM zcusuarios WHERE nomUser = ?', [nomUser]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async validatePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}

module.exports = User;