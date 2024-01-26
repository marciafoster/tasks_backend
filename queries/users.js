const db = require('../db/dbConfig')
// Import library to hash passwords
const bcrypt = require('bcrypt')

// Create a new user
const createUser = async (user) => {
    try {
        const { username, email, password_hash } = user
        const salt = 10
        const hash = await bcrypt.hash(password_hash, salt)
        const newUser = await db.one("INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *", [username, email, hash])
        return newUser
    } catch (error) {
        return error
    }
}

//GET all users (for development purposes)
const getUsers = async () => {
    try {
        const users = await db.many("SELECT * FROM users")
        return users
    } catch (error) {
        return error
    }
}

const logInUser = async (user) => {
    try {
        const loggedInUser = await db.one("SELECT * FROM users WHERE username = $1", user.username)

        if(!loggedInUser){
            return false
        }

        const passwordMatch = await bcrypt.compare(user.password_hash, loggedInUser.password_hash)

        if(!passwordMatch){
            return false
    } 
    return loggedInUser
    
    } catch (error) {
        return error
    }
}

module.exports = { createUser, getUsers, logInUser }