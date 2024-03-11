const fs = require("fs")
const path = require("path")

/**
 * 加载vue打包文件内容
 * @param dirname {String} __dirname
 * @param dist {String} 打包文件入口，如xx/dist/index.html，相对__dirname的路径
 * @param encoding {BufferEncoding}
 * @return {*}
 */
const loadDist = (dirname, dist, encoding = "utf8") => {
    const buffer = fs.readFileSync(path.join(dirname, dist))
    return replaceDistStatics(buffer.toString(encoding), dirname, dist)
}

/**
 * 替换静态文件路径
 * @param s {String}
 * @param dirname {String}
 * @param dist {String}
 * @return {String}
 */
const replaceDistStatics = (s, dirname, dist) => {
    // const matches = s.matchAll(/\/(js|css|(\w+(\w|\d)*))\/[\w-]+\.(\w+\.)?(js|css)/g)
    const matches = s.matchAll(/(\/[\w\d]+)+([\w\d]+\.)+(js|css|ico)/g)
    const distRoot = path.dirname(path.join(dirname, dist))
    for (let m of matches) {
        if(m) {
            const file = m[0]
            const f = path.join(distRoot, file);
            s = s.replace(file, f);
        }
    }
    return s;
}

module.exports = {
    loadDist,
    replaceDistStatics
}
