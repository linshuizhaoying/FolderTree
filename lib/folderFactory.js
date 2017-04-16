'use strict'
/*
   Level 目录层级控制
 */

const fs = require('fs')
const path = require('path')

module.exports = {
    /**
     * [listFolder 输出列表]
     * @param  {[type]} level      [限制层级]
     * @param  {[type]} folderName [目标目录]
     * @return {[type]}            [返回一个目录结构]
     */
    listFolder: function(level, folderName, exceptArr) {
        let listArr = []
            // 设置max目录层数
        let _level = level == null ? 99 : level
            // console.log(_level)
            // 判断目录是否存在
        if (fs.existsSync(folderName) && fs.lstatSync(folderName).isDirectory()) {
            console.log(folderName);
        } else {
            console.log(folderName, '[error opening folderName]');
            return null
        }

        listArr.push(_level)
        listArr.push(this._getFolderStruct(folderName, exceptArr))

        // console.log(listArr[1][0])
        this._showList(listArr[1], _level)

        return listArr
    },
    _showList(obj, level, exceptArr) {
        let sourceStruct = obj[0]
        let dirCount = 0
        let fileCount = 0
            // 字符集
        let charSet = {
            'node': '├── ', //节点
            'pipe': '│   ', // 上下链接
            'last': '└── ', // 最后的file或folder需要回勾
            'indent': '    ' // 缩进
        };

        function log(file, depth, parentHasNextSibling) {
            // console.log("log:")
            if (!parentHasNextSibling && depth.length > 1) {
                // Replace a pipe with an indent if the parent does not have a next sibling.
                depth[depth.length - 2] = charSet.indent;
            }
            if (file.lastIndexOf('/') > -1) {
                file = file.substring(file.lastIndexOf('/') + 1)
            }
            console.log(depth.join('') + file);
        }

        // 由于已经有缓存数据了，因此对数据进行遍历搜索
        // 如果type 是file 就不需要继续
        // 如果type 是directory 对临时数组
        function walk(path, depth, parentHasNextSibling) {
            //  console.log(path)

            let childrenLen = path.length - 1
                // console.log(childrenLen)
            let loop = true

            if (depth.length >= level) {
                loop = false
            }
            if (loop) {
                path.forEach(function walkChildren(child, index) {
                    let newdepth = !!depth ? depth.slice(0) : []
                    let isLast = (index >= childrenLen)

                    if (isLast) {
                        newdepth.push(charSet.last)
                    } else {
                        newdepth.push(charSet.node)
                    }
                    if (child.type == "file") {
                        log(child.name, newdepth, parentHasNextSibling)
                    } else {
                        log(child.path, newdepth, parentHasNextSibling)

                    }

                    if (child.type == "directory") {
                        let childPath = child.children
                        if (!isLast) {
                            newdepth.pop()
                            newdepth.push(charSet.pipe)
                        }
                        walk(childPath, newdepth, !isLast)
                    }

                })
                loop = !loop
            }

        }

        walk(sourceStruct.children, [])
            //console.log(sourceStruct)
        console.log('level:' + level)
        console.log("\n")
        console.log('目录及文件罗列完毕')

    },
    _getFolderStruct: function(dir, exceptArr) {


        let filesNameArr = []
            // 用个hash队列保存每个目录的深度
        let mapDeep = {}
        mapDeep[dir] = 0
            // 先遍历一遍给其建立深度索引
        function getMap(dir, curIndex) {
            let files = fs.readdirSync(dir) //同步拿到文件目录下的所有文件名
            files.map(function(file) {
                //let subPath = path.resolve(dir, file) //拼接为绝对路径
                let subPath = path.join(dir, file) //拼接为相对路径
                let stats
                // 目录过深可能会造成获取文件信息失败的情况，这个时候应该跳过。
                try {
                    stats = fs.statSync(subPath) //拿到文件信息对象
                    mapDeep[file] = curIndex + 1
                    if (stats.isDirectory()) { //判断是否为文件夹类型
                        return getMap(subPath, mapDeep[file]) //递归读取文件夹
                    }
                 // console.log('it exists');
                }
                catch(err) {
                    console.log('扫描目录出错,已跳过');
                }

                //console.log(subPath)
            })

        }
        getMap(dir, mapDeep[dir])
            //console.log(mapDeep)

        function readdirs(dir, folderName, myroot) {
            let result = { //构造文件夹数据
                path: dir,
                name: path.basename(path),
                type: 'directory',
                deep: mapDeep[folderName]
            }
            let files = fs.readdirSync(dir) //同步拿到文件目录下的所有文件名
            files = files.filter(function(file) {
                return exceptArr.indexOf(file) == -1
            })
            result.children = files.map(function(file) {
                //let subPath = path.resolve(dir, file) //拼接为绝对路径
                let subPath = path.join(dir, file) //拼接为相对路径
                let stats = fs.statSync(subPath) //拿到文件信息对象
                if (stats.isDirectory()) { //判断是否为文件夹类型
                    // console.log(mapDeep[file])
                    return readdirs(subPath, file, file) //递归读取文件夹
                }
                return { //构造文件数据
                    path: subPath,
                    name: file,
                    type: 'file'
                }
            })

            return result //返回数据
        }

        filesNameArr.push(readdirs(dir, dir))
        return filesNameArr


    },
    _getFileName: function(dir) {
        return fs.readdirSync(dir)
            .filter(file => fs.statSync(path.join(dir, file)).isFile())
    },
    _getDirectories: function(dir) {
        return fs.readdirSync(dir)
            .filter(file => fs.statSync(path.join(dir, file)).isDirectory())
    },
    _watcher: function() {


    }


};
