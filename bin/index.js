#!/usr/bin/env node
const chalk = require("chalk");
const boxen = require("boxen");
const loading =  require('loading-cli');
const validator = require("validator");

require('yargs/yargs')(process.argv.slice(2))
    .usage("\nUsage: command --path optional")
    .example("install wfg.cfg","Installs the push service based on the settings in the cfg file.")
    .strict()
    .commandDir('cmds',{recursive:false})
    .demandCommand()
    .help()
    .check((argv) => {
        if (argv) {
            return true;
        }
        throw new Error('Argument check failed: filepath is not a readable file');
    })
    .fail(function (msg, err, yargs) {
        console.log("\n "+msg);
        yargs.showHelp();
        process.exit(1);
    })
    .describe("help", "Show help.") // Override --help usage message.
    .describe("version", "Show version number.") // Override --version usage message.
    .epilog("Copyright 2022")
    .argv;

// const load = loading("Welcome to Push Events on nodeJS").start()
//
// setTimeout(function(){
//     load.color = 'yellow';
//     load.text = ' Loading rainbows';
// },2000)
//
// // stop
// setTimeout(function(){
//     load.stop()
// },3000)
