const constantes = require("../../util/const");
const {printInfo, spinner} = require("../../util/config");
const lng = require("../../util/en");
exports.command = 'uninstall'
exports.desc = 'Uninstall push service'
exports.handler = function () {
    console.log('uninstall');
    spinner.info(printInfo("Desinstalando"));
    spinner.start();
    exec('sudo systemctl '+ constantes.appName, (error, stdout, stderr) => {

    });

}
