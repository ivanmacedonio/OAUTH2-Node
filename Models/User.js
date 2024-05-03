const express = require('express')
const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize('srcrud', 'ivan', 'mamageor28', {
    host: "localhost",
    dialect: "mysql"
})

const User = sequelize.define(
    'User', 
    {
        UserID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }, 
        Username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Password :{
            type: DataTypes.STRING,
            allowNull: false
        },
        Age: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        Image: {
            type: DataTypes.STRING,
            allowNull:false,
        }
    },
    {
        createdAt: false,
        updatedAt: false,
        timestamps: false
    }
)

module.exports = {User}