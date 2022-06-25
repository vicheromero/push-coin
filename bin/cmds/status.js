const constantes = require("../../util/const");
const {spinner, printError} = require("../../util/config");
const lng = require("../../util/en");
exports.command = 'status'
exports.builder = {
    path: {
        default: './wfg.cfg'
    }
}
exports.desc = 'Check status of push service'
exports.handler = function () {
    console.log('Status');
    exec('systemctl status ' + constantes.appName, (error, stdout, stderr) => {
        if (error) {
            spinner.fail(printError(error));
            return;
        }
        if (stderr) {
            spinner.fail(printError(stderr));
            return;
        }
        console.log(stdout);
    })
}
