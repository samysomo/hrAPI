window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        document.querySelector(".boton-amarillo").addEventListener("click", () =>{
            window.location.href = "signin.html"
        });
    
        document.querySelector(".boton-verde").addEventListener("click", login);
    } else{
        window.location.href = "index.html"
    }
    
}

function login(){
    let mail = document.getElementById("input_mail").value;
    let pass = document.getElementById("input_password").value;

    axios({
        method: "post",
        url: "http://localhost:3000/empleado/login",
        data: {
            correo: mail,
            password: pass
        }
    }).then(function(res){
        console.log(res);
        if(res.data.code === 200){
            localStorage.setItem("token", res.data.message);
            if(res.data.user_type === "admin"){
                window.location.href = "index.html"
            } else if (res.data.user_type === "user"){
                window.location.href = `user.html?id=${res.data.user_id}`
            }
            
        } else{
            alert("Usuario y/o contraaseña incorrectos")
        }
    }).catch(function(err){
        console.log(err);
    })
}