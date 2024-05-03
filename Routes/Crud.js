const express = require('express')
const router = express.Router()
const { Sequelize } = require('sequelize')
const { User } = require('../Models/User')
//db sync
const sequelize = new Sequelize('srcrud', 'ivan', 'mamageor28', {
    host: "localhost",
    dialect: "mysql"
})

//hash algorytm
const bcrypt = require('bcrypt')


//get all users
router.get('/users', async (_req, res) => {
    try {
        const usersInstance = await User.findAll()
        return res.status(200).json(usersInstance)
    } catch (error) {
        return res.status(500).send("INTERNAL SERVER ERROR")
    }
})

//get user by pk
router.get('/users/:id', async (req, res) => {
    const pk = req.params.id
    if (!pk) {
        return res.status(400).send("Need to provide a valid ID")
    }
    try {
        const userInstance = await User.findByPk(pk)
        if (!userInstance) {
            return res.status(404).send("User not found or invalid ID")
        }
        return res.status(200).json(userInstance)
    } catch (error) {
        console.error(error)
        return res.status(500).send("INTERNAL SERVER ERROR")
    }
})

//delete user
router.delete('/users/:id', async (req, res) => {
    const pk = req.params.id
    if (!pk) {
        return res.status(400).send("Need to provide a valid ID")
    }
    try {
        const userInstance = await User.findByPk(pk)
        userInstance.destroy()
        return res.status(200).send("User deleted succesfully!")
    } catch (error) {
        console.error(error)
        return res.status(500).send("INTERNAL SERVER ERROR")
    }
})

//update password
router.patch("/users/:id", async (req, res) => {
    const regex = /^[^A-Z0-9]*$/;
    const pk = req.params.id
    const {password} = req.body
    if (!pk || !password) {
        return res.status(400).send("Need to provide a valid ID and password")
    }
    if(!regex.test(password)){
        return res.status(400).send("password must be contain numbers and uppercases")
    }
    try {
        const hashedPassword = bcrypt.hash(password, 10)
        const userInstance = await User.update({Password: hashedPassword })
        return res.status(200).send("Password updated succesfully!")
    } catch (error) {
        console.error(error)
        return res.status(500).send("INTERAL SERVER ERROR")
    }
})

//create user
router.post("/users", async (req, res) => {
    const { username, password, age, image } = req.body
    if (!username || !password) {
        return res.status(400).send("Username and password are obligatory")
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const userInstance = await User.create({ Username: username, Password: hashedPassword, Age: age, Image: image })
        return res.status(201).send("User created succesfully!")
    } catch (error) {
        console.error(error)
        return res.status(500).send("INTERNAL SERVER ERROR")
    }
})

module.exports = router