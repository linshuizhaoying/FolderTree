var assert = require('assert');
var folderFactory = require('../lib/folderFactory')
/*
  TDD驱动开发测试
  模块划分
  folderFactory:
    listFolder(level,folderName)
  	  接受指定层级和指定相对路径进行罗列

    writeFile(fileName | default:README.md)
  	  将获取到的目录及文件名格式化写入到文件
    
		watchFolder
		  监听指定目录，文件或者目录有修改动态更新，接受



 */
describe('folderFactory Test', function() {
    // describe('.listFolder(level,folderName)', function() {
    //     it('listFolder(null,"./") 应该返回给定路径以下所有目录与文件名', function() {
    //         assert(folderFactory.listFolder(null, './')[0], 'success');
    //     });
    // });

    describe('.listFolder(level,folderName)', function() {
        it('应该返回给定路径以下目录层级为2的所有目录与文件名', function() {
            assert(folderFactory.listFolder(4, './')[0], '4');
        });
    });

});
