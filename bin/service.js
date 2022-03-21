#!/usr/bin/env node
const Pusher = require("pusher-js");
const {spinner, printInfo, getKey} = require("../util/config");
const lng = require("../util/en");
const {comandos, equipos} = require("../services");
const constates = require("../util/const");
const {createFileOverwrite, readJsonKey} = require("../util/files");
const {platform} = require("process");
const {exec} = require("child_process");
const constantes = require("../util/const");
const api = require("../util/api");
const yargs = require('yargs');

function subscribePush(config, deviceId) {
    const pusher = new Pusher(config.key, {
        cluster: config.cluster
    });
    api.defaults.baseURL = getKey(argv.path, "URL_API");
    spinner.succeed(printInfo(lng.push.config));
    let channel = pusher.subscribe(deviceId);
    spinner.succeed(printInfo(lng.push.sub));
    channel.bind(constates.eventCommand, function (data) {
        let cmd = platform === 'win32' ? 'chcp 65001 |' + data.cmd : data.cmd;
        try {
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    comandos.update(data.id, error, false);
                    return;
                }
                if (stderr) {
                    comandos.update(data.id, stderr, false);
                    return;
                }
                comandos.update(data.id, stdout, true);
            });
        } catch (e) {
            comandos.update(data.id, e, false);
        }
    });
    channel.bind(constates.eventConfig, function () {
        equipos.getId(deviceId).then((response) => {
            createFileOverwrite(JSON.stringify(response), constantes.jsonFileConfig, 'json')
        });
    });
    spinner.succeed(printInfo(lng.push.succes));
    spinner.stop();
}

const argv = yargs(process.argv.splice(2))
    .command('path', 'path of file configuration', () => {},)
    .strict()
    .argv;

subscribePush(readJsonKey(constantes.jsonFileConfig,'config'),readJsonKey(constantes.jsonFileConfig,'id_eq'))
