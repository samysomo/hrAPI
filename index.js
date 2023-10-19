const express = require("express");
const app = express();

//Middleware
const admin = require("./routes/admin");
const empleado = require("./routes/empleado");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Inicio de la aplicaccion
app.get("/", index);

//Ruta de administradores
app.use("/admin", admin);

//Autenticacion
app.use(auth);

//Ruta de empleados
app.use("/empleado", empleado);

//Ruta notFound
app.use(notFound);

app.listen(process.env.PORT || 3000, () =>{
    console.log("Server is running")
})