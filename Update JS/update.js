const fs = require('fs');
const path = require('path');
// 处理命令行参数
const args = process.argv.slice(2); // 去掉前两个元素
const options = {
    source: '',
    target: '',
    output: 'ok.json',
};
for (let i = 0; i < args.length; i += 2) {
    const option = args[i];
    const value = args[i + 1];
    switch (option) {
        case '-i':
            options.source = value;
            break;
        case '-m':
            options.target = value;
            break;
        case '-o':
            options.output = value;
            break;
        default:
            console.error(`未知的选项：${option}\n正确的命令格式为：node update.js -i <待更新源文件> -m <目标文件> [-o <输出文件>]\n或者：npm run start -- -i <待更新源文件> -m <目标文件> [-o <输出文件>]`);
            process.exit(1);
    }
}
// 检查输入的文件是否存在
if (!fs.existsSync(options.source)) {
    console.error(`源文件不存在：${options.source}\n正确的命令格式为：node update.js -i <待更新源文件> -m <目标文件> [-o <输出文件>]\n或者：npm run start -- -i <待更新源文件> -m <目标文件> [-o <输出文件>]`);
    process.exit(1);
}
if (!fs.existsSync(options.target)) {
    console.error(`源文件不存在：${options.target}\n正确的命令格式为：node update.js -i <待更新源文件> -m <目标文件> [-o <输出文件>]\n或者：npm run start -- -i <待更新源文件> -m <目标文件> [-o <输出文件>]`);
    process.exit(1);
}
// 读取源文件和目标文件
const source = require(path.resolve(options.source));
const target = require(path.resolve(options.target));
// 遍历并更新源文件
for (const itemOld of target.mcid) {
    for (const item of source.id) {
        if (itemOld.id === item.id && itemOld.dv === item.dv) {
            item.path = itemOld.path;
        }
    }
}
// 写入输出文件
fs.writeFile(path.resolve(options.output), JSON.stringify(source, null, '\t'), (err) => {
    if (err) throw err;
    console.log('更新成功');
});