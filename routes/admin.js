const express = require("express");
const admin = express.Router();
const jwt = require("jsonwebtoken");

//Database
const db = require("../config/database")

admin.post("/signin", async (req, res, next) =>{
    const {nombre, apellido, correo, password}= req.body;
    if (nombre && apellido && correo){
        const query = `INSERT INTO admin (nombre, apellido, correo, password) VALUES ('${nombre}', '${apellido}', '${correo}', '${password}')`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Usuario insertado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

//Autenticacion de usuario
admin.post("/login", async(req, res, next) =>{
    console.log(req.body);
    const {correo, password} = req.body;
    const query = `SELECT * FROM admin WHERE correo = '${correo}' AND password = '${password}'`;
    const rows = await db.query(query);

    if(correo && password){
        if (rows.length == 1){
            const token = jwt.sign({
                id_admin: rows[0].id_admin,
                correo: rows[0].correo
            }, "debugkey");
            return res.status(200).json({code: 200, message: token});
        } else{
            return res.status(200).json({code: 401, message: "Usuario y/o contraseña incorrectos"});
        }
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

admin.get("/", async (req, res, next) =>{

});

module.exports = admin;