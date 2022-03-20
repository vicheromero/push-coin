const fs = require('fs');
const path = require('path');
const {spinner, printInfo, printError} = require("./config");
const lng = require("./en");

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

function addLine(varFile, text = '') {
    try {
        varFile.write(text, "UTF8");
    } catch (e) {
        console.log("Error al escribir el archivo " + e);
    }
}

function readJsonKey(file, key) {
    const filePath = path.resolve(__dirname, '..', file);
    let data = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(data);
    return data[key];
}

function closeFile(varFile) {
    varFile.end();
}

module.exports = {createFileorOpen, createFileOverwrite, addLine, closeFile, readJsonKey};
