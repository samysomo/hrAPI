//const empleado = require("../../../routes/empleado");

let token;
let headers = {};
let url = "http://localhost:3000";
const urlParams = new URLSearchParams(window.location.search);
const id_empleado = urlParams.get("id");


if (!localStorage.getItem("id_empleado")){
    window.onload = init;
} else {
    alert("Empleado actualizado correctamente");
    localStorage.removeItem("id_empleado");
    window.location.href = "index.html";
}

function init(){
    if(localStorage.getItem("token")){
        token = localStorage.getItem("token");
        headers = {
            headers: {
                "Authorization": "bearer " + localStorage.getItem("token")
            }
        }

        if (id_empleado){
            //Obtener los valores ya ingresados en la base datos para no tener que reescribir todos si no es necesario
            axios.get(url + `/empleado/${id_empleado}`, headers)
            .then(function(res){
            console.log(res)
            const empleado = res.data.message;

            let nombre = document.getElementById("nombre");
            let apellido = document.getElementById("apellido");
            let correo = document.getElementById("correo");
            let telefono = document.getElementById("telefono");
            let direccion = document.getElementById("direccion");

            for (let e of empleado){
                nombre.value = e.nombre;
                apellido.value = e.apellido;
                correo.value = e.correo;
                telefono.value = e.telefono;
                direccion.value = e.direccion;
                let id = e.id_empleados;
                localStorage.setItem("id_empleado", id);
            }

            }).catch(function(err){
            console.log(err)
            });

            let enviar = document.querySelector(".boton-verde")
            enviar.addEventListener("click", () =>{
                editarEmpleado();
            });
        }
        
    } else{
        window.location.href = "login.html"
    }
}

//Obtner los nuevos valores y PUT request
function editarEmpleado(){
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let correo = document.getElementById("correo").value;
    let telefono = document.getElementById("telefono").value;
    let direccion = document.getElementById("direccion").value;
    let id = localStorage.getItem("id_empleado");

    axios({
        headers: {"Authorization": "Bearer " + token},
        method: "put",
        url: `http://localhost:3000/empleado/${id}`,
        data: {
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            telefono: telefono,
            direccion: direccion
        }
    }).then(function(res){
        console.log(res);
        alert("Empleado actualizado correctamente");
        localStorage.removeItem("id_empleado");
        window.location.href = "index.html";
    }).catch(function(err){
        console.log(err);
    })

}