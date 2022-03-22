const api = require("../util/api");

const PREFIJO = "/api/comandos";

function update(id, salida, exito = false) {
    return api.put(`${PREFIJO}/${id}`, {
        out: salida,
        success: exito ? 1 : 0
    });
}


module.exports = {update};
