const connect = require('../dataBase/db')
const { check } = require("express-validator");
const bcrypt = require("bcrypt")

// add trim and escape mb
const regValidator = [
    check('email')
        .notEmpty()
        .withMessage('Введите email')
        .isLength({min: 3})
        .withMessage('Минимальная длинна - 3 символа')
        .isEmail()
        .withMessage('Некорректный email'),
    check('email')
        .custom(async (email) => {
            const existingUser = 
                await connect.query("SELECT `email` FROM `user` WHERE email = ?",[email])
            
            if (existingUser[0].length !== 0) {
                throw new Error('Пользователь с такой почтой уже существует');
            }
        }),
    check('pass_1')
        .notEmpty()
        .withMessage('Введите пароль')
        .isLength({min: 8})
        .withMessage('Минимальная длинна - 10 символов'),
    check('pass_2')
        .notEmpty()
        .withMessage('Введите пароль повторно')
        .isLength({min: 8})
        .withMessage('Минимальная длинна - 10 символов'),
    check('pass_2')
        .custom(async (typedDeclaration, {req}) => {
            const declaration = req.body.pass_1
            if( typedDeclaration !== declaration){
                throw new Error('Пароли не совпадают')
            }
        })
]

const regUser = function(req, res) { 
    bcrypt.hash(req.body.pass_1, 10)
        .then(hash => {
            connect.execute("INSERT INTO `user`(`email`, `password`, `role_id`) VALUES (?,?,2)",[req.body.email, hash])
                .then(result =>{
                    console.log(result[0]);
                    return JSON.stringify(result)
                })
                .then(()=>{
                    console.log("Querry is sucesfull");
                })
                .catch(function(err) {
                    console.log(err.message);
                });
            return JSON.stringify(res)
    })
    .catch(err => console.error(err.message))
}

const getAllUsers = async (req,res) => {
    res = await connect.query("SELECT * FROM user")
    return JSON.stringify(res[0])
}
const getUser = async (req,res) => {
    console.log(req);
    res = await connect.query("SELECT * FROM user WHERE _id = ?",[req])
    return JSON.stringify(res[0])
}

module.exports = {
    regValidator,
    regUser,
    getAllUsers,
    getUser,
}