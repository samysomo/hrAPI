window.onload = init;
let headers = {};
let url = "http://localhost:3000";
const urlParams = new URLSearchParams(window.location.search);
const id_empleado = urlParams.get("id");

function init(){
    if(localStorage.getItem("token")){
        token = localStorage.getItem("token");
        headers = {
            headers: {
                "Authorization": "bearer " + localStorage.getItem("token")
            }
        }
        loadEmployee();
        const boton_borrar = document.getElementById("eliminar")
        boton_borrar.addEventListener("click", eliminarEmpleado);

        const boton_editar = document.getElementById("editar")
        boton_editar.addEventListener("click", function(){
            window.location.href = `editar_empleado.html?id=${id_empleado}`;
        });
    } else{
        window.location.href = "login.html";
    }
}

function loadEmployee(){
    axios.get(url + `/empleado/${id_empleado}`, headers)
    .then(function(res){
        console.log(res)
        displayEmployee(res.data.message);
    }).catch(function(err){
        console.log(err)
    })
}

function displayEmployee(emp){
    let nombre = document.querySelector(".nombre_empleado");
    let correo = document.querySelector(".correo_empleado");
    let telefono = document.querySelector(".telefono_empleado");
    
    for (let e of emp){
        nombre.textContent = e.nombre;
        correo.textContent = e.correo;
        telefono.textContent = e.telefono;
    }
}

function eliminarEmpleado(){
    axios.delete(url + `/empleado/${id_empleado}`, headers)
    .then(function(res){
        console.log(res)
        alert("Empleado eliminado correctamente");
        window.location.href = "index.html";
    }).catch(function(err){
        console.log(err)
    })
}

