const log4js = require('log4js');

// 启动日志配置
log4js.configure({
    appenders: {
        cheese: {
            type: 'dateFile', // 日志类型
            filename: './logs/log', // 输出的文件名
            pattern: 'yyyy-MM-dd.log', // 文件名增加后缀
            alwaysIncludePattern: true // 是否总是有后缀名
        },
        out: {
            type: 'console'
        }
    },
    categories: {
        default: {
            appenders: ['cheese', 'out'],
            level: 'info'
        }
    }
});
// 获取 logger
const logger = log4js.getLogger('MCID_API');

exports.logger = logger;