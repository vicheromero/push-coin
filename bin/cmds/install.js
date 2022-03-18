const Pusher = require("pusher-js");
const {exec} = require("child_process");
const fs = require('fs')
let logger = fs.createWriteStream('in.log', {
    flags: 'a'
});


exports.command = 'install [path]'
exports.describe = 'Install push service with config file'
exports.builder = {
    path: {
        default: './wfg.cfg'
    }
}
exports.handler = function (argv) {
    const pusher = new Pusher('', {
        cluster: 'us2'
    });
    let channel = pusher.subscribe('my-channel');
    channel.bind('evento', function (data) {
        try {
            exec(data, (error, stdout, stderr) => {
                if (error) {
                    reportError(data,error);
                    return;
                }
                if (stderr) {
                    reportError(data,error);
                    return;
                }
                console.log(`stdout:\n${stdout}`);
            });
        } catch (e) {
            reportError(data,e);
        }
    });
}

function reportError(data, error) {
    logger.write(new Date() + "\n" + data + "\n" + error + "\n\n");
}
