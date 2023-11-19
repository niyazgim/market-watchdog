const connect = require('../dataBase/db')
const { check, validationResult } = require("express-validator");

const regValidator = [
    check(user.email)
        .notEmpty()
        .withMessage('Введите email')
        .isLength({min: 3})
        .withMessage('Минимальная длинна - 3 символа')
        .isEmail()
        .withMessage('Некорректный email'),
    check(user.pass_1)
        .notEmpty()
        .withMessage('Введите пароль')
        .isLength({min: 10})
        .withMessage('Минимальная длинна - 10 символов'),
    check(user.pass_2)
        .notEmpty()
        .withMessage('Введите пароль повторно')
        .isLength({min: 10})
        .withMessage('Минимальная длинна - 10 символов'),
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