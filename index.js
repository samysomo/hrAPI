const express = require("express");
const app = express();
const morgan = require("morgan");

//Routers
const empleado = require("./routes/empleado");

//Middleware
const auth = require("./middleware/auth");
const notFound = require("./middleware/notFound");
const index = require("./middleware/index");
const cors = require("./middleware/cors");

app.use(cors);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Inicio de la aplicaccion
app.get("/", index);

//Ruta de empleados
app.use("/empleado", empleado);

//Autenticacion
app.use(auth);

//Ruta notFound
app.use(notFound);

app.listen(process.env.PORT || 3000, () =>{
    console.log("Server is running")
})