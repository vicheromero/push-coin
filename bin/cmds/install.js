const Pusher = require("pusher-js");
const {exec} = require("child_process");
const api = require("../../util/api");
const {getKey} = require("../../util/config");
const {equipos} = require("../../services");
const {createFileorOpen, addLine, createFileOverwrite, readJsonKey} = require("../../util/files");

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
    const idDevice = getKey(argv.path, "ID");
    api.defaults.baseURL = getKey(argv.path, "URL_API");
    equipos.getId(idDevice).then((response) => {
        createFileOverwrite(JSON.stringify(response), 'config', 'json');
        subscribePush(response.config, idDevice)
    }).catch(()=>{

    });
}

function reportError(data, error) {
    addLine(errorLog, new Date() + "\n" + data + "\n" + error + "\n\n", "UTF8");
}

function subscribePush(config, deviceId) {
    const pusher = new Pusher(config.key, {
        cluster: config.cluster
    });
    let channel = pusher.subscribe(config.channel);
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
}
