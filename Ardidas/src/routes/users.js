const express = require('express');
const router = express.Router();
const {formRegister, register, formLogin, login} = require('../controllers/usersControllers');
const uploadFile = require("../validations/imageUser")
const registerValidation = require('../validation/validationRegister');
const loginValidation = require('../validation/validationLogin')


router

.get('/register', formRegister)
.post("/register", uploadFile.single("image"),registerValidation, register)

.get('/login', formLogin)
.post("/login", loginValidation, login)

//Dashboard de Usurios
.get('/dashboard', UsersDashboard)

//Edicion de usuarios
.get('/update/:id', usersEdit )
.put('/update/:id', usersUpdate)



module.exports = router;
