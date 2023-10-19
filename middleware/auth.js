const jwt = require("jsonwebtoken");

//toekn de autenticacion
module.exports = (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded_token = jwt.verify(token, "debugkey");
        next.user = decoded_token;
        next(); 
    } catch (error) {
        return res.status(401).json({code: 401, message: "No cuentas con la autorización para acceder"});
    }
}