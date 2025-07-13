import { db } from '../config/db.js'
import bcrypt from 'bcryptjs'

export const User = {
    async create(user) {
        const password = await bcrypt.hash(user.password, 10)
        const [id] = await db("users").insert({ ...user, password })
        return this.findByID(id)
    },

    findByID(id) {
        return db("users").where({ id: id }).select("id", "email", "first_name", "balance").first();
    },
    findByEmail(email) {
        return db("users").where({ email: email }).first();
    },
    async updateBalance(id, amount) {
        return db("users").where({ id: id }).increment("balance", amount)
    }
}