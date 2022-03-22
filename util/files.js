const fs = require('fs');
const path = require('path');
const {spinner, printInfo, printError} = require("./config");
const lng = require("./en");
const constates = require("./const");
const {platform} = require("process");

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
    const servicesPath = '/lib/systemd/system';
    const ext = 'service';
    const pathWork = path.resolve(__dirname,'..')
    return new Promise(function (resolve, reject) {
        const text = "[Unit]\n" +
            "Description="+appName+" service"+"\n" +
            "After=multi-user.target\n" +
            "\n" +
            "[Service]\n" +
            "Restart=always\n" +
            "User=nobody\n" +
            "Group=nogroup\n" +
            "ExecStart=push-coin-service configure "+configFile+"\n" +
            "WorkingDirectory="+pathWork+"\n" +
            "\n" +
            "[Install]\n" +
            "WantedBy=multi-user.target";
        if(platform==='linux'){
            fs.writeFile(`${servicesPath}/${appName}.${ext}`, text, (e) => {
                if (e) {
                    spinner.fail(printError(lng.file.error, e));
                    reject(e);
                } else {
                    spinner.succeed(printInfo(lng.file.create));
                    resolve(`${servicesPath}/${appName}.${ext}`);
                }
            });
        }else{
            console.log(text)
        }
    });
}

function addLine(varFile, text = '') {
    try {
        varFile.write(text, "UTF8");
    } catch (e) {
        console.log("Error al escribir el archivo " + e);
    }
}

function readJsonKey(file, key) {
    const filePath = path.resolve(__dirname, '..', file);
    let data = fs.readFileSync(filePath+'.json', 'utf8');
    data = JSON.parse(data);
    return data[key];
}

function closeFile(varFile) {
    varFile.end();
}

module.exports = {createFileorOpen, createFileOverwrite, addLine, closeFile, readJsonKey, createFileService};
