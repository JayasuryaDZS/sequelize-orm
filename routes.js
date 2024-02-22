const express = require('express')
const Sequelize = require('sequelize')

const router = express.Router()

const sequelize = new Sequelize('node_orm', 'root', 'Mysql@123', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(function(res) {
    console.log('Successfully Connected to the database')
}).catch(err => {
    console.log("We Have some error with connecting with database", err)
})

//Creating Modal:
const User = sequelize.define('tbl_users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING
    },
    rollNo: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.ENUM('1','0'),
        defaultValue: '1'
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    modelName: 'User',
    timestamps: false
})

// // Sync model
sequelize.sync()

router.get('/', function(req, res) {
    res.status(200).json({
        status: 1,
        message: 'Welcome to HOme Page'
    })
})

// Raw Query to select data:
router.get('/user-raw', function(req, res) {
    //Select
    sequelize.query("SELECT * FROM tbl_users", {
        type: sequelize.QueryTypes.SELECT
    }).then((response) => {
        res.status(200).json({
            status: 1,
            message: 'Users Found',
            data: response
        })
    }).catch(err => {
        console.log(err)
    })
})

// Raw query for POST data:
router.post('/user-post-raw', async function(req, res) {
    sequelize.query('INSERT INTO tbl_users (name, email, rollNo, status) VALUES(:name, :email, :rollNo, :status)', {
        replacements: {
            name: req.body.name,
            email: req.body.email,
            rollNo: req.body.rollNo,
            status: req.body.status
        },
        type: sequelize.QueryTypes.POST
    }).then(async response => {
        const data = await User.findAll()
        res.status(200).json({
            status: 1,
            data
        })
    }).catch(err => {
        console.log(err)
    })
})

//raw query to update data:
router.put('/user-update-raw', function(req, res) {
    sequelize.query('UPDATE tbl_users SET name =:name, email = :email WHERE id=:id', {
        replacements: {
            name: req.body.name,
            email: req.body.email,
            id: req.body.id
        },
        type: sequelize.QueryTypes.UPDATE 
    }).then(response => {
        res.status(200).json({
            status: 1,
            message: 'User Updated successfully',
            // data: response
        })
    }).catch(err => {
        console.log(err)
    })
})

//raw query for delete
router.delete('/user-delete-raw/:id', function(req, res) {
    sequelize.query('DELETE FROM tbl_users WHERE id =:id', {
        replacements: {
            id: req.params.id
        },
        type: sequelize.QueryTypes.DELETE
    }).then(response => {
        res.status(200).json({
            status: 1,
            message: 'User Deleted successfully'
        }).catch(err => {
            console.log(err)
        })
    })
})

// Delete Api Method
router.delete('/user/:id', function(req, res) {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then((data) => {
        res.status(200).json({
            status: 1,
            message: 'User has been deleted successfully'
        })
    }).catch(err => {
        res.status(500).json({
            status: 0,
            message: 'Failed to delete User',
            data: err
        })
    })
})

// Bluk Create Method
router.post('/bulk-user', function(req, res) {
    User.bulkCreate([
        {
            name: 'User 1',
            email: 'User1@gmail.com',
            rollNo: 12,
            status: "0"
        },
        {
            name: 'User 2',
            email: 'User2@gmail.com',
            rollNo: 91,
            status: "0"
        },
        {
            name: 'User 3',
            email: 'User3@gmail.com',
            rollNo: 14,
            status: "0"
        },
        {
            name: 'User 4',
            email: 'User4@gmail.com',
            rollNo: 8,
            status: "1"
        },
    ]).then(function(response) {
        res.status(200).json({
            status: 1,
            message: 'User has been created'
        })
    }).catch(function(err) {
        console.log(err)
    })
});

// Update api method
router.put("/user", function(req, res) {
    User.update({
        name: req.body.name,
        email: req.body.email,
        roleNo: req.body.roleNo
    }, {
        where: {
            id: req.body.id
        }
    }).then(function(response) {
        res.status(200).json({
            status: 1,
            message: "User has been updated successfully"
        })
    }).catch(function(err) {
        res.status(500).json({
            status: 0,
            message: 'Failed to Update User',
            data: err
        })
    });
})

// GEt All Users:
router.get("/users", function(res, res) {
    User.findAll({
        where: {
            status: '0'
        }
    }).then(function(response) {
        res.status(200).json({
            status: 1,
            message: 'Users Found',
            data: response
        })
    }).catch(function(err) {
        console.log(err)
    })
})

router.post('/user', function(req, res) {
    // console.log(req.body)
    // return
    // User.create({
    //     name: 'Jayasurya',
    //     email: 'Jayasurya.d@gmail.com',
    //     rollNo: 9,
    //     status: 1
    // }).then(function(response) {
    //     res.status(200).json({
    //         status: 1,
    //         message: 'User Has been created successfully'
    //     })
    // }).catch(function(err) {
    //     console.log(err)
    // })
    User.create(req.body).then(function(response) {
        res.status(200).json({
            status: 1,
            message: 'User has been created'
        })
    }).catch(function(err) {
        console.log(err)
    })
})

module.exports = router