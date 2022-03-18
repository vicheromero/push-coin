const fs = require('fs')

function getKey(path, key) {
    let value = undefined;
    try {
        const data = fs.readFileSync(path, 'utf8').split('\r').map(i => i.replace("\n", '')).filter(i => i !== '');
        const valueArr = data.filter(j => j.includes(key));
        if (valueArr.length === 1) {
            value = valueArr[0].split(':');
            value.shift();
            value = value.join(':');
        } else {
            value = undefined;
        }
        return value;
    } catch (err) {
        return value;
    }
}

module.exports = {getKey};
