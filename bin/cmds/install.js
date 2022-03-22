const api = require("../../util/api");
const {getKey, printInfo, spinner, printError} = require("../../util/config");
const {equipos, comandos} = require("../../services");
const {createFileOverwrite, createFileService} = require("../../util/files");
const lng = require("../../util/en");
const constantes = require("../../util/const");
const {exec} = require("child_process");
const constates = require("../../util/const");


exports.command = 'install [path]'
exports.aliases = ['i']
exports.describe = 'Install push service with config file'
exports.builder = {
    path: {
        default: './wfg.cfg'
    }
}
exports.handler = function (argv) {
    console.log(printInfo(lng.install.file, argv.path));
    spinner.start();
    const idDevice = getKey(argv.path, "ID");
    if (idDevice) {
        spinner.info(printInfo(lng.install.start, idDevice));
        api.defaults.baseURL = getKey(argv.path, "URL_API");
        spinner.info(printInfo(lng.steps.start));
        equipos.getId(idDevice).then((response) => {
            spinner.succeed(printInfo(lng.steps.down));
            createFileOverwrite(JSON.stringify(response), constantes.jsonFileConfig, 'json').then(() => {
                createFileService(argv.path).then((fileService) => {
                    exec('chmod 644 ' + fileService, (error, stdout, stderr) => {
                        if (error) {
                            spinner.fail(printError("Error al dar permisos al servicio", error));
                            return;
                        }
                        if (stderr) {
                            spinner.fail(printError("Error al dar permisos al servicio 2", stderr));
                            return;
                        }
                        spinner.succeed(printInfo("Se dio permisos al archivo del servicio"));
                        exec('sudo systemctl daemon-reload', (error, stdout, stderr) => {
                            if (error) {
                                spinner.fail(printError("Error al recargar servicios", error));
                                return;
                            }
                            if (stderr) {
                                spinner.fail(printError("Error al recargar servicios 2", stderr));
                                return;
                            }
                            spinner.succeed(printInfo("Se recargo los servicios creados"));
                            exec('sudo systemctl enable ' + constates.appName, (error, stdout, stderr) => {
                                if (error) {
                                    spinner.fail(printError("Error al activar servicio", error));
                                    return;
                                }
                                spinner.succeed(printInfo("Se activo el servicio " + constates.appName));
                                exec('sudo systemctl start ' + constates.appName, (error, stdout, stderr) => {
                                    if (error) {
                                        spinner.fail(printError("Error al empezar servicio", error));
                                        return;
                                    }
                                    spinner.succeed(printInfo("Se inicio el servicio " + constates.appName));
                                });
                            });
                        });
                    });
                });
            });
        }).catch((e) => {
            spinner.fail(printError(lng.steps.startEr, e));
        });
    } else {
        spinner.fail(printError(lng.steps.startEr, e));
    }
}
