# Update Log
解决缓存目录深度过度问题。

---- 2017-6-11 ----
添加写入功能

# Install with Global

chmod 755 ./bin/folderTree.js

npm link


# FolderTree Beta1.0

## FolderTree Command Example:

### List Folder

```
Defalut:  
folder : ./
input: folderTree

output:

./
├── .DS_Store
├── .babelrc
├── .gitignore
├── README.MD
├── bin
│   ├── .DS_Store
│   └── folderTree.js
├── lib
│   ├── .DS_Store
│   └── folderFactory.js
├── package.json
└── test
    ├── .DS_Store
    └── index.js



```


### Get Help

```

input: folderTree -h

Usage: folderTree [options]

选项：
  -f, --folderName  folderName(目录名)                            [默认值: "./"]
  -w, --fileName    输出文件名                             [默认值: "README.md"]
  -l, --level       限制目录层级                                   [默认值: "2"]
  -e, --except      隔离根目录指定文件夹/文件,如果需要一个列表，用逗号隔开
                                                        [默认值: "node_modules"]
  -h, --help        显示帮助信息                                          [布尔]

示例：
  folderTree -f your folderName
  folderTree -l level(Number)
  folderTree -w README.md
  folderTree -e fodlerA,fileB.txt,folderC


Author:Linshuizhaoying


```

### Isolate the specify root directory
origin:

```

folderTree (if node_modules folder existed will display the folder)

├── .DS_Store
├── .babelrc
├── .gitignore
├── README.MD
├── bin
│   ├── .DS_Store
│   └── folderTree.js
├── lib
│   ├── .DS_Store
│   └── folderFactory.js
├── package.json
└── test
    ├── .DS_Store
    └── index.js
level:2

```

new:

```

folderTree -e README.MD,bin,node_modules

./
├── .DS_Store
├── .babelrc
├── .gitignore
├── lib
│   ├── .DS_Store
│   └── folderFactory.js
├── package.json
└── test
    ├── .DS_Store
    └── index.js
level:2


目录及文件罗列完毕

```

### Write File

folderTree -w result.md



