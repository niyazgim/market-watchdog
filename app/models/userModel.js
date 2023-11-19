const connect = require('../dataBase/db')

const regUser = async (req,res) => {
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
}