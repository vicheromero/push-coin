const {getKey, printInfo, spinner, printError} = require("../../util/config");
const {createFileOverwrite, createFileService} = require("../../util/files");
const constantes = require("../../util/const");
const {equipos} = require("../../services");
const {exec} = require("child_process");
const api = require("../../util/api");
const lng = require("../../util/en");


exports.command = 'install <path>'
exports.aliases = ['i']
exports.describe = lng.labels.install.describe
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
        spinner.start();
        equipos.getId(idDevice).then((response) => {
            spinner.succeed(printInfo(lng.steps.down));
            spinner.start();
            createFileOverwrite(JSON.stringify(response), constantes.jsonFileConfig, 'json').then(() => {
                spinner.start();
                createFileService(argv.path).then((fileService) => {
                    spinner.start();
                    exec('chmod 644 ' + fileService, (error, stdout, stderr) => {
                        if (error) {
                            spinner.fail(printError(lng.install.permisos, error));
                            return;
                        }
                        if (stderr) {
                            spinner.fail(printError(lng.install.permisos, stderr));
                            return;
                        }
                        spinner.succeed(printInfo(lng.install.permisosSuc));
                        spinner.start();
                        exec('sudo systemctl daemon-reload', (error, stdout, stderr) => {
                            if (error) {
                                spinner.fail(printError(lng.install.reloadE, error));
                                return;
                            }
                            if (stderr) {
                                spinner.fail(printError(lng.install.reloadE, stderr));
                                return;
                            }
                            spinner.succeed(printInfo(lng.install.reload));
                            spinner.start();
                            exec('sudo systemctl enable ' + constates.appName, (error, stdout, stderr) => {
                                if (error) {
                                    spinner.fail(printError(lng.install.activeE, error));
                                    return;
                                }
                                spinner.succeed(printInfo(lng.install.activeE));
                                spinner.start();
                                exec('sudo systemctl start ' + constates.appName, (error, stdout, stderr) => {
                                    if (error) {
                                        spinner.fail(printError(lng.install.inie, error));
                                        return;
                                    }
                                    spinner.succeed(printInfo(lng.install.active));
                                    spinner.warn(printError(lng.install.alert,argv.path));
                                    spinner.stop();
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
        spinner.fail(printError(lng.steps.startEr,"no ID on config file."));
    }
}
