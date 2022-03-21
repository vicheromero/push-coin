const api = require("../util/api");

const PREFIJO = "http://127.0.0.1:8000/api/comandos";

function update(id, salida, exito = false) {
    return api.put(`${PREFIJO}/${id}`, {
        out: salida,
        success: exito
    });
}


module.exports = {update};
