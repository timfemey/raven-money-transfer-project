import { db } from '../config/db.js'
import bcrypt from 'bcryptjs'

export const User = {
    async create(user) {
        const password = await bcrypt.hash(user.password, 10)
        const [id] = await db("users").insert({ ...user, password })
        return this.findByID(id)
    },
    /**
         * 
         * @param {number} id
         * @returns 
    */
    findByID(id) {
        return db("users").where({ id: id }).select("id", "email", "name").first();
    },
    /**
     * 
     * @param {string} email 
     * @returns 
     */
    findByEmail(email) {
        return db("users").where({ email: email }).first();
    },
    /**
     * 
     * @param {string} email 
     * @returns 
     */
    async userExist(email) {
        if (this.findByEmail(email)) {
            return true
        }
        return false
    }
}