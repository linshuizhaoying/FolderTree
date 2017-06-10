#!/usr/bin/env node

const fs = require('fs');
const yargs = require('yargs');
const folderFactory = require('../lib/folderFactory')
var argv = require('yargs')
    .option('f', {
        alias: 'folderName',
        describe: 'folderName(目录名)',
        default: './',
        //  type: 'string'
    })
    .option('w', {
        alias: 'fileName',
        // type: 'string',
        default: 'README.md',
        describe: '输出文件名'
    })
    .option('l', {
        alias: 'level',
        // type: 'string',
        default: '2',
        describe: '限制目录层级'
    })
    .option('e', {
        alias: 'except',
        // type: 'string',
        default: 'node_modules,.git',
        describe: '隔离根目录指定文件夹/文件,如果需要一个列表，用逗号隔开'
    })
    .usage('Usage: folderTree [options]')
    .example('folderTree -f your folderName')
    .example('folderTree -l level(Number)')
    .example('folderTree -w README.md')
    .example('folderTree -e fodlerA,fileB.txt,folderC ')
    .help('h', false, false)
    .alias('h', 'help')
    .epilog('Author:Linshuizhaoying')
    .argv;

if (!argv.f) {
    console.log('准备监听: ', argv.f);
} else {
    //console.log('准备监听目录: ', argv.f);
    // console.log(process)
    var level = null || argv.l
    var exceptArr = []
    var list = argv.e == "node_modules" || argv.e.length == undefined ? "node_modules" : argv.e.split(',')
    exceptArr = list
        //console.log(exceptArr)
    if (argv.w) {
        folderFactory.listFolder(level, argv.f, exceptArr)
        folderFactory._watcher(argv.f, argv.w)
    } else {
        folderFactory.listFolder(level, argv.f, exceptArr)

    }
    // console.log('目录结构:')
    // console.log(struct)
} 
