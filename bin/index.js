#!/usr/bin/env node
const {labels} = require("../util/en");
const yargs = require('yargs/yargs');

yargs(process.argv.slice(2))
    .usage(`\n${labels.index.usage}`)
    .example(labels.index.example1, labels.index.example2)
    .strict()
    .commandDir('cmds', {recursive: false})
    .demandCommand()
    .help()
    .check((argv) => {
        if (argv) {
            return true;
        }
        throw new Error(labels.index.error);
    })
    .fail(function (msg, err, yargs) {
        console.log("\n " + msg);
        yargs.showHelp();
        process.exit(1);
    })
    .describe(labels.index.describe1, labels.index.describe2)
    .describe(labels.index.describe3, labels.index.describe4)
    .epilog(labels.index.epilog)
    .argv;
