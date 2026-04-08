import jwt from "jsonwebtoken";

const secretkey = "miclave123";
const key = jwt.sign({ id: 321 }, secretkey, {
    expiresIn: "1h"
});

console.log("ver clave", key);

const claves = [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIxLCJpYXQiOjE3NzU1MTQyNjQsImV4cCI6MTc3NTUxNDMwNH0.OmMucDsE8tXNqeQrtX9KQZU7VQLLch9eHBb0lP4W6dA",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIxLCJpYXQiOjE3NzU1MTM2NDEsImV4cCI6MTc3NTUxNzI0MX0.UB5TMuuiuOXhyGke8X7YdH36b16MfKZJmjf_2Hts8K0"
]

jwt.verify(claves[1], secretkey, (error, decodificado) => {
    if (error) {
        console.log("Token invalido");
        
    }
    /*console.log("decodificado", decodificado);*/
    
})
