const express = require('express')
const appRoutes = require('./routes')

const app = express()

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); // Parse URL-encoded bodies using query-string library

const PORT = 4000

// Connection with Mysql Database


// CHhecking the database connection


app.use("/", appRoutes)
// Create Some data to Table



// USER Model
// class User extends Model {}

// User.init({
//   // parameters, columns, schema
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   email: {
//     type: Sequelize.STRING,
//   },
//   rollNo: {
//     type: Sequelize.INTEGER
//   },
//   status: {
//     type: Sequelize.ENUM("1", "0"),
//     defaultValue: "1"
//   },
// }, {
//   timestamps: false,
//   modelName: 'tbl_users',
//   sequelize
// })

// // BOOK Model:
// class Book extends Model {}

// Book.init({
//   // parameters, columns, schema
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   amount: {
//     type: Sequelize.INTEGER,
//   },
//   status: {
//     type: Sequelize.ENUM("1", "0"),
//     defaultValue: "1"
//   },
// }, {
//   timestamps: false,
//   modelName: 'tbl_books',
//   sequelize
// })

// Book.sync()
// sequelize.sync()



app.listen(PORT, function(){
    console.log('Application is Running'+ PORT)
})