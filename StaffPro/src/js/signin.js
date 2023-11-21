window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        document.querySelector(".boton-amarillo").addEventListener("click", () =>{
            window.location.href = "login.html"
        });
    
        document.querySelector(".boton-verde").addEventListener("click", signin);
    } else{
        window.location.href = "index.html"
    }
    
}

function signin(){
    let name = document.getElementById("input_name").value;
    let lastname = document.getElementById("input_lastname").value;
    let mail = document.getElementById("input_mail").value;
    let direccion = document.getElementById("input_direccion").value;
    let telefono = document.getElementById("input_telefono").value;
    let pass = document.getElementById("input_password").value;

    axios({
        method: "post",
        url: "http://localhost:3000/empleado",
        data: {
            nombre: name,
            apellido: lastname,
            correo: mail,
            telefono: telefono,
            direccion: direccion,
            tipo: "user",
            password: pass
        }
    }).then(function(res){
        alert("Usuario ingresado correctamente");
        window.location.href = "login.html";
    }).catch(function(err){
        console.log(err);
    })
}