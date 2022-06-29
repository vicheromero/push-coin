const fs = require('fs');
const path = require('path');
const {spinner, printInfo, printError} = require("./config");
const lng = require("./en");
const constates = require("./const");
const {platform} = require("process");

const servicesPath = '/lib/systemd/system';
const ext = 'service';

function createFileorOpen(name = 'file-name', ext = 'txt') {
    return fs.createWriteStream(`${name}.${ext}`, {
        flags: 'a'
    });
}

function createFileOverwrite(text = '', name = 'file-name', ext = 'txt') {
    return new Promise(function (resolve, reject) {
        fs.writeFile(`${name}.${ext}`, text, (e) => {
            if (e) {
                spinner.fail(printError(lng.file.error, e));
                reject(e);
            } else {
                spinner.succeed(printInfo(lng.file.create));
                resolve(true);
            }
        });
    });
}

function createFileService(configFile) {
    const appName = constates.appName;
    const pathWork = path.resolve();
    return new Promise(function (resolve, reject) {
        const text = "[Unit]\n" +
            "Description=" + appName + " service" + "\n" +
            "After=multi-user.target\n" +
            "\n" +
            "[Service]\n" +
            "Restart=always\n" +
            "User=nobody\n" +
            "Group=nogroup\n" +
            "ExecStart=push-coin-service configure " + configFile + "\n" +
            "WorkingDirectory=" + pathWork + "\n" +
            "\n" +
            "[Install]\n" +
            "WantedBy=multi-user.target";
        if (platform === 'linux') {
            fs.writeFile(`${servicesPath}/${appName}.${ext}`, text, (e) => {
                if (e) {
                    spinner.fail(printError(lng.install.serviceE, e));
                    reject(e);
                } else {
                    spinner.succeed(printInfo(lng.install.service, configFile));
                    resolve(`${servicesPath}/${appName}.${ext}`);
                }
            });
        } else {
            spinner.fail(printError(lng.install.serviceOS));
            reject(lng.install.serviceOS);
        }
    });
}

function deleteFileService() {
    const appName = constates.appName;
    return new Promise(function (resolve, reject) {
        if (platform === 'linux') {
            fs.unlink(`${servicesPath}/${appName}.${ext}`,e=>{
                if (e) {
                    spinner.fail(printError(e));
                    reject(e);
                } else {
                    spinner.succeed(printInfo("Eliminado"));
                    resolve(`${servicesPath}/${appName}.${ext}`);
                }
            });
        } else {
            spinner.fail(printError(lng.install.serviceOS));
            reject(lng.install.serviceOS);
        }
    });
}

function addLine(varFile, text = '') {
    try {
        varFile.write(text, "UTF8");
    } catch (e) {
        console.log(printError(lng.file.write));
    }
}

function readJsonKey(file, key) {
    const filePath = path.resolve(file);
    let data = fs.readFileSync(filePath + '.json', 'utf8');
    data = JSON.parse(data);
    return data[key];
}

function closeFile(varFile) {
    varFile.end();
}

module.exports = {createFileorOpen, createFileOverwrite, addLine, closeFile, readJsonKey, createFileService, deleteFileService};
