exports.command = 'status'
exports.builder = {
    path: {
        default: './wfg.cfg'
    }
}
exports.desc = 'Check status of push service'
exports.handler = function () {
    console.log('Status')
}
