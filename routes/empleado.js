const express = require("express");
const empleado = express.Router();

//Base de datos
const db = require("../config/database");

//Crear un nuevo empleado
empleado.post("/", async (req, res, next) =>{
    const {nombre, apellido, correo, telefono, direccion} = req.body;
    if (nombre && apellido && correo && telefono && direccion){
        const query = `INSERT INTO empleados (nombre, apellido, correo, telefono, direccion) VALUES ('${nombre}', '${apellido}', '${correo}', '${telefono}', '${direccion}')`;
        const rows = await db.query(query);
         if (rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Empleado ingresado correctamente"});
         }
         return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

//Borrar un empleado
empleado.delete("/:id([0-9]{1,3})", async (req, res, next) =>{
    let id = req.params.id;
    const query = `DELETE FROM empleados WHERE id_empleado = ${id}`;
    const emp = await db.query(query);
    if(emp.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Empleado eliminado correctamente"});
    } else{
        return res.status(404).json({code: 404, message: "Empleado no encontrado"});
    }
});

//Actualizar un empleado entero
empleado.put("/:id([0-9]{1,3})", async (req, res, next) =>{
    let id = req.body.id;
    const {nombre, apellido, correo, telefono, direccion} = req.body;
    if(nombre && apellido && correo && telefono && direccion){
        const query = `UPDATE empleados SET nombre = '${nombre}', apellido = '${apellido}', correo = '${correo}', telefono = '${telefono}', direccion = '${direccion}' WHERE id_empleado = ${id}`;
        const rows = await db.query(query);
        if(rows.affectedRows == 1){
            return res.status(200).json({code: 200, message: "Empleado actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

module.exports =  empleado;