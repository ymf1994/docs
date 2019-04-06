const Client = require('ssh2').Client
const fs = require('fs')
const path = require('path')

/**
 * 连接服务后，shell创建文件
 * @param {*} conn 
 * @param {*} cmd 执行的shell脚本
 */
const remoteShell = (conn, cmd) => {
    return new Promise((resolve, reject) => {
        conn.shell(function (err, stream) {
            if (err) {
                reject(err);
            } else { // end of if
                var buf = "";
                // console.log(stream);                                                                                                
                stream.on('close', function () {
                    resolve();
                }).on('data', function (data) {
                    buf += data;
                    // console.log('buf', buf);
                })
                stream.on('exit', function(){
                    resolve();
                })
                stream.on('error', function(err){
                    reject(err);
                })
                stream.end(cmd);
            }
        });
    })
}
/**
 * 连接服务后，上传文件
 * @param {*} sftp 
 * @param {*} file 上传文件目录
 */
const putFile = (sftp, file) => {
    return new Promise((resolve, reject) => {
        sftp.fastPut(
            file.absolutePath,
            `../../home/public/kkl-docs/${file.relativePath}`, {
                step: (transfered, chunk, total) => {
                    // console.log(`uploaded: ${transfered} bytes/ total: ${total} bytes`);
                }
            },
            (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            }
        )
    })
}

/**
 *  new Client()、连接服务
 */
const getConn = () => {
    let conn = new Client();
    conn.connect({
        host: '10.0.0.141',
        port: 22,
        username: 'root',
        password: 'vmikuko@123'
    });
    return conn;
}
/**
 * gitbook build 之后链接服务 先创建文件，再上传文件
 */
const uploadAllFile = () => {
    
    let conn = getConn();
    conn.on('ready', function () {
        console.log('SFTP-Client :: Ready')
        let fileTree = getDirSubJsFileList(path.join(__dirname, '..', '_book'))
        console.log('fileTree', fileTree.length);
    
        async function upload() {
            await createAllFileDir();
            conn.sftp(async (err, sftp) => {
                console.log('SFTP-Client :: uploadFile start');
                for (file of fileTree) {
                    await putFile(sftp, file);
                }
                console.log('SFTP-Client :: uploadFile end');
                conn.end();
            })
        }
        fs.readdir(path.resolve(__dirname, '../_book'), (err, files) => {
            if (err) {
                throw err
            }
            upload()
        })
    })
}


// 获取某一路径下的所有js文件路径以及名称
const getDirSubJsFileList = (Path) => {
    let filesList = [];
    let jsFileList = [];
    let pathLength = Path.length + 1;
    // console.log(Path);
    const getFileList = (pPath) => {
        var files = fs.readdirSync(pPath);
        files.forEach(item => {
            let curPath = `${pPath}/${item}`;
            var stat = fs.statSync(curPath);
            if (stat.isDirectory()) {
                //递归读取文件
                getFileList(curPath);
                return;
            }
            if (stat.isFile()) {
                var obj = {}; //定义一个对象存放文件的路径和名字
                obj.path = `${pPath}/${item}`; //路径
                obj.filename = item //名字
                filesList.push(obj);
            }

        })
    }
    getFileList(Path);
    jsFileList = filesList.map(file => {
        let relativePath = file.path.slice(pathLength);
        // console.log(relativePath);
        return {
            relativePath,
            absolutePath: file.path,
            filename: file.filename
        }
    });
    // console.log(jsFileList);
    return jsFileList;
}

/**
 * 创建文件
 */
const createAllFileDir = () => {
    return new Promise(async (resolve, reject) => {
        console.log('SHELL-Client :: createAllFileDir start');
        let allFile = getDirSubJsFileList(path.join(__dirname, '..', '_book'));
        let allDirMap = {};
        allFile.forEach(file => {
            let ph = `/home/public/kkl-docs/${file.relativePath}`;
            ph = ph.slice(0, ph.lastIndexOf("/"));
            if(ph){
                allDirMap[ph] = 1;
            }
        });
        let conn = getConn();
        conn.on('ready', async () => {
            let cmd = '';
            Object.keys(allDirMap).forEach(ph => {
                cmd += `mkdir -p ${ph} \n`;
            });
            cmd += 'exit \n';
            try{
                await remoteShell(conn, cmd);
                conn.end();
                console.log('SHELL-Client :: createAllFileDir end');
                resolve();
            }catch(err){
                reject(err);
            }
        })
    })

}

uploadAllFile();