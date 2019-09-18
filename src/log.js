/* global require, module*/
const chalk = require('chalk');

const log = (msg, type) => {
    let chalkType = null;

    switch (type && type.toUpperCase()) {
        case 'INFO':
            chalkType = chalk.green;
            break;
        case 'DATA':
            chalkType = chalk.green.inverse;
            break;
        case 'WARN':
            chalkType = chalk.yellow;
            break;
        case 'ERROR':
            chalkType = chalk.red;
            break;
        default:
            chalkType = chalk.default;
    }
    // eslint-disable-next-line no-console
    console.log(chalkType(msg));
};

module.exports = log;