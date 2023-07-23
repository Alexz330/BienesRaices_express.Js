import bcrpyt from "bcrypt"

const usuarios = [{
    nombre:"Alexis",
    email:"juan@juan.com",
    confirmado:1,
    password:bcrpyt.hashSync("password",10),

}]

export default usuarios