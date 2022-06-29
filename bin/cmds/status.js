const constantes = require("../../util/const");
const {printError, ejectCommand} = require("../../util/config");
exports.command = 'status'
exports.builder = {
    path: {
        default: './wfg.cfg'
    }
}
exports.desc = 'Check status of push service'
exports.handler = function () {
    ejectCommand('systemctl status ' + constantes.appName).then((response)=>{
        console.log(response);
    }).catch(e=>{
        console.log(printError(e));
    });
}
