const express = require("express");
const empleado = express.Router();
const jwt = require("jsonwebtoken");

//Base de datos
const db = require("../config/database");


//Crear un nuevo empleado
empleado.post("/", async (req, res, next) =>{
    const {nombre, apellido, correo, telefono, direccion, tipo, password, cargo, fecha_contratacion, salario} = req.body;
    console.log(nombre, apellido, correo, direccion, tipo, password, cargo, fecha_contratacion, salario)
    if (nombre && apellido && correo && telefono && direccion && tipo && password && cargo && fecha_contratacion && salario){
        const query = `INSERT INTO empleados (nombre, apellido, correo, telefono, direccion, tipo, password, cargo, fecha_contratacion, salario_mes) VALUES ('${nombre}', '${apellido}', '${correo}', '${telefono}', '${direccion}', '${tipo}', '${password}', '${cargo}', '${fecha_contratacion}', ${salario})`;
        const rows = await db.query(query);
         if (rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Empleado ingresado correctamente"});
         }
         return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

//Autenticacion de usuario
empleado.post("/login", async(req, res, next) =>{
    console.log(req.body);
    const {correo, password} = req.body;
    const query = `SELECT * FROM empleados WHERE correo = '${correo}' AND password = '${password}'`;
    const rows = await db.query(query);

    if(correo && password){
        if (rows.length == 1){
            const token = jwt.sign({
                id_empleados: rows[0].id_empleados,
                correo: rows[0].correo
            }, "debugkey");
            return res.status(200).json({code: 200, message: token, user_type: rows[0].tipo, user_id: rows[0].id_empleados});
        } else{
            return res.status(200).json({code: 401, message: "Usuario y/o contraseña incorrectos"});
        }
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

//Borrar un empleado por su id
empleado.delete("/:id([0-9]{1,3})", async (req, res, next) =>{
    let id = req.params.id;
    const query = `DELETE FROM empleados WHERE id_empleados = ${id}`;
    const emp = await db.query(query);
    if(emp.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Empleado eliminado correctamente"});
    } else{
        return res.status(404).json({code: 404, message: "Empleado no encontrado"});
    }
});

//Actualizar un empleado entero
empleado.put("/:id([0-9]{1,3})", async (req, res, next) =>{
    let id = req.params.id;
    const {nombre, apellido, correo, telefono, direccion, password, cargo, fecha_contratacion, salario} = req.body;
    if(nombre && apellido && correo && telefono && direccion && password && cargo && fecha_contratacion && salario){
        const query = `UPDATE empleados SET nombre = '${nombre}', apellido = '${apellido}', correo = '${correo}', telefono = '${telefono}', direccion = '${direccion}', password = '${password}', cargo = '${cargo}', fecha_contratacion = '${fecha_contratacion}', salario_mes = '${salario}' WHERE id_empleados = ${id}`;
        const rows = await db.query(query);
        if(rows.affectedRows == 1){
            return res.status(200).json({code: 200, message: "Empleado actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

//Obtener todos los empleados
empleado.get("/", async (req, res, next) =>{
    const emp = await db.query("SELECT * FROM empleados");
    return res.status(200).json({code: 200, message: emp});
});

//Obtener un empleado por su id
empleado.get("/:id([0-9]{1,3})", async (req, res, next) =>{
    const id = req.params.id;
    const emp = await db.query(`SELECT * FROM empleados WHERE id_empleados = ${id}`);
    if (emp.length > 0) {
        return res.status(200).json({code: 200, message: emp});
    } else {
        return res.status(404).json({code: 404, message: "Empleado no encontrado"});
    }
});

//Obtener un empleado por su nombre
empleado.get("/:name([A-Za-z]+)", async(req, res, next) => {
    const name =  req.params.name;
    console.log(name);
    const emp = await db.query(`SELECT * FROM empleados WHERE nombre = '${name}'`);
    if (emp.length > 0) {
        return res.status(200).json({code: 200, message: emp});;
    } else {
        return res.status(404).json({code: 404, message: "Empleado no encontrado"});
    }
});





module.exports =  empleado;