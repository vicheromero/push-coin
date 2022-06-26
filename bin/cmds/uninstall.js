const constantes = require("../../util/const");
const {deleteFileService} = require("../../util/files");
const {printInfo, spinner, ejectCommand} = require("../../util/config");
const lng = require("../../util/en");
exports.command = 'uninstall'
exports.desc = 'Uninstall push service'
exports.handler = function () {
    spinner.info(printInfo("Desinstalando"));
    spinner.start();
    ejectCommand('sudo systemctl stop '+ constantes.appName).then(()=>{
        deleteFileService().then(()=>{
            ejectCommand('sudo systemctl daemon-reload').then(()=>{
                spinner.succeed(printInfo("Servicio desistalado"));
            })
        })
    })
}
