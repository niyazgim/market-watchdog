const connect = require('../dataBase/db')
const { check } = require("express-validator");

const regValidator = [
    check('email')
        .notEmpty()
        .withMessage('Введите email')
        .isLength({min: 3})
        .withMessage('Минимальная длинна - 3 символа')
        .isEmail()
        .withMessage('Некорректный email'),
    check('email', 'Email already exists')
        .custom(async (email) => {
            const existingUser = 
                await connect.query("SELECT `email` FROM `user` WHERE email = ?",[email])
            if (existingUser) {
                throw new Error('Email already in use')
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
        .withMessage('Минимальная длинна - 10 символов')
]

const regUser = async (req, res) => {
    connect.execute("INSERT INTO `user`(`email`, `pass`, `role_id`) VALUES (?,?,2)",[req.email,req.pass_1])
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
}

module.exports = {
    regUser,
    regValidator,
}