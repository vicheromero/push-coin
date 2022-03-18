const api = require("../util/api");

const PREFIJO ="/api/equipos";

function getId(id){
    return api.get(`${PREFIJO}/${id}`);
}


module.exports = {getId};
