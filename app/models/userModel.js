const connect = require('../dataBase/db')
const { check } = require("express-validator");

const regValidator = [
    check('email')
        .notEmpty()
        .withMessage('Введите email')
        .isLength({min: 3})
        .withMessage('Минимальная длинна - 3 символа')
        .isEmail()
        .withMessage('Некорректный email')
        .custom(async (email) => {
            try {
                connect.query("SELECT `email` FROM `user` WHERE email = ?",[email])
                    .then(result => {
                        console.log(result)
                        if (result) {
                            return Promise.reject('Такой email уже существует')
                        }
                    })
            } catch (e) {
                console.log(e);
            }
        }),
    check('pass_1')
        .notEmpty()
        .withMessage('Введите пароль')
        .isLength({min: 10})
        .withMessage('Минимальная длинна - 10 символов'),
    check('pass_2')
        .notEmpty()
        .withMessage('Введите пароль повторно')
        .isLength({min: 10})
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