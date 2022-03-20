const Pusher = require("pusher-js");
const {exec} = require("child_process");
const api = require("../../util/api");
const {getKey, printInfo, spinner, printError} = require("../../util/config");
const {equipos} = require("../../services");
const {createFileorOpen, addLine, createFileOverwrite, readJsonKey} = require("../../util/files");
const lng = require("../../util/en");

let errorLog = createFileorOpen('in', 'log');


exports.command = 'install [path]'
exports.aliases = ['i']
exports.describe = 'Install push service with config file'
exports.builder = {
    path: {
        default: './wfg.cfg'
    }
}
exports.handler = function (argv) {
    console.log(printInfo(lng.install.file,argv.path));
    const idDevice = getKey(argv.path, "ID");
    if(idDevice){
        spinner.info(printInfo(lng.install.start,idDevice));
        spinner.start(printInfo(lng.steps.start));
        api.defaults.baseURL = getKey(argv.path, "URL_API");
        equipos.getId(idDevice).then((response) => {
            spinner.succeed(printInfo(lng.steps.down));
            createFileOverwrite(JSON.stringify(response), 'config', 'json').then(()=>{
                subscribePush(response.config, idDevice)
            });
        }).catch((e)=>{
            spinner.fail(printError(lng.steps.startEr,e));
        });
    }else{

    }
}

function reportError(data, error) {
    addLine(errorLog, new Date() + "\n" + data + "\n" + error + "\n\n");
}

function subscribePush(config, deviceId) {
    const pusher = new Pusher(config.key, {
        cluster: config.cluster
    });
    spinner.succeed(printInfo(lng.push.config));
    let channel = pusher.subscribe(config.channel);
    spinner.succeed(printInfo(lng.push.sub));
    channel.bind(deviceId, function (data) {
        try {
            exec(data, (error, stdout, stderr) => {
                if (error) {
                    reportError(data, error);
                    return;
                }
                if (stderr) {
                    reportError(data, error);
                    return;
                }
                console.log(`stdout:\n${stdout}`);
            });
        } catch (e) {
            reportError(data, e);
        }
    });
    spinner.succeed(printInfo(lng.push.succes));
    spinner.stop();
}
