//const empleado = require("../../../routes/empleado");

window.onload = init;
let headers = {};
let url = "http://localhost:3000";

//Autorizacion del usuario por medio de JWT
function init(){
    if(localStorage.getItem("token")){
        token = localStorage.getItem("token");
        headers = {
            headers: {
                "Authorization": "bearer " + localStorage.getItem("token")
            }
        }
        if (localStorage.getItem("id_empleado")){
            localStorage.removeItem("id_empleado");
        }

        loadEmployee();
        const buscar = document.querySelector(".boton-verde");

        // Evento para la barra de busqueda
        buscar.addEventListener("click", function(){
            let emp = document.getElementById("input_barra").value;
            loadEmployee(emp);
        });

    
       
    } else{
        window.location.href = "login.html";
    }
}
// Peticiones a la base de datos para buscar empleados
function loadEmployee(emp){
    if (!emp){
        axios.get(url + `/empleado`, headers)
        .then(function(res){
        console.log(res)
        displayEmployee(res.data.message);
        }).catch(function(err){
        console.log(err)
        })

    }else{
        console.log(emp)
        axios.get(url + `/empleado/${emp}`, headers)
        .then(function(res){
        console.log(res)
        displayEmployee(res.data.message);
        }).catch(function(err){
        console.log(err)
        })
    }
    
}

// Mostrar los empleados en una tabla en la interfaz
function displayEmployee(emp){
    let tabla = document.querySelector(".cuerpo_tabla");
    tabla.innerHTML = "";
    for (let e of emp){
        let tr = document.createElement("tr");

        let ID_emp = document.createElement("td");
        ID_emp.innerHTML = e.id_empleados;
        tr.appendChild(ID_emp);

        let nombre_emp = document.createElement("td");
        nombre_emp.innerHTML = e.nombre;
        tr.appendChild(nombre_emp);

        let apellido_emp = document.createElement("td");
        apellido_emp.innerHTML = e.apellido;
        tr.appendChild(apellido_emp);

        let cargo_emp = document.createElement("td");
        cargo_emp.innerHTML = e.cargo;
        tr.appendChild(cargo_emp);

        let telefono_emp = document.createElement("td");
        telefono_emp.innerHTML = e.telefono;
        tr.appendChild(telefono_emp);

        tr.addEventListener("click", function(){
            window.location.href = `empleado.html?id=${e.id_empleados}`;
        });

        tabla.appendChild(tr);

    }
}
