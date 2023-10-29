window.onload = init;
let token;

function init(){
    if(localStorage.getItem("token")){
        token = localStorage.getItem("token");

        document.querySelector(".boton-verde").addEventListener("click", crearEmpleado);
    } else{
        window.location.href = "login.html"
    }
}

//Obtener los datos ingresados en el formulario y post request para insertarlo en la base de datos
function crearEmpleado(){
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let correo = document.getElementById("correo").value;
    let telefono = document.getElementById("telefono").value;
    let direccion = document.getElementById("direccion").value;

    console.log(nombre)
    axios({
        headers: {"Authorization": "Bearer " + token},
        method: "post",
        url: "http://localhost:3000/empleado",
        data: {
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            telefono: telefono,
            direccion: direccion
        }
    }).then(function(res){
        console.log(res);
        alert("Empleado ingresado correctamente");
        window.location.href = "login.html";
    }).catch(function(err){
        console.log(err);
    })

}