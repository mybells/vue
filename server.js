var fs = require('fs');
var path = require('path');//解析需要遍历的文件夹
var filePath = path.resolve('./src');

var obj={};
var ss=[];
//调用文件遍历方法
fileDisplay(filePath);
//文件遍历方法
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    var dirname=filePath.split('\\').reverse()[0];

    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            if(dirname)
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                var stats=fs.statSync(filedir);
                var isFile = stats.isFile();//是文件
                var isDir = stats.isDirectory();//是文件夹
                if(isDir){
                    ss[filename]=[]
                    // obj[filename]={};
                    fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                }
                if(isFile){
                    // obj[filename]=[];
                    // 读取文件内容
                    var content = fs.readFileSync(filedir, 'utf-8');
                    // var importArr=content.match(/import([\S\s]*?)from \'([\S\s]*?)\'/g)
                    // if(importArr){
                    //     importArr.map(item=>{
                    //         var importPath=item.match(/\'[\d\D]*\'$/);
                    //         if(importPath){
                    //             obj[filename].push(importPath[0]);
                    //         }
                    //     })
                    // }
                }
            });
            console.log(obj);
        }
    });
}