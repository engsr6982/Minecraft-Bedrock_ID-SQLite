//调用模块
const express = require('express');
const fs = require('fs');
const cors = require("cors");//cors中间件
const schedule = require('node-schedule');//定时任务
const api = express();
//注册模块
api.use(cors()); //使用cors中间件

const Config = require('./Config.json');
const logger = require('./lib/log').logger;

/**===========================
 *      缓存MCID数据
 * ===========================
 */
let MCID;//存储ID数据
if (MCID == null) {//判断数据是否为空
    fs.readFile(Config.Data_Path + 'mcid.json', (err, dt) => {
        if (err) {
            logger.error('读取MCID数据文件失败！');
            return
        };
        let dtt = JSON.parse(dt);
        MCID = dtt.mcid;
        logger.warn(`已读取MCID数据数据`);
    });
};

/**===========================
 *        存储访问量
 * ===========================
 */
let VIEW;//访问量
let WEB_API;//WEB检索量
let SERACH_API;//API请求量
//判断数据是否为空
if (VIEW == null || WEB_API == null || SERACH_API == null) {
    fs.readFile(Config.Data_Path + 'data.json', (err, dt) => {
        if (err) {
            logger.error('读取访问量失败!');
            return
        };
        let tmp = JSON.parse(dt);
        VIEW = tmp.view;
        WEB_API = tmp.web_api;
        SERACH_API = tmp.serach_api;
        logger.warn('已读取访问量数据')
    });
};
//每5分钟保存一次数据
const job = schedule.scheduleJob('*/5 * * * *', function () {
    let VIEW_DATA = {
        "view": VIEW,
        "web_api": WEB_API,
        "serach_api": SERACH_API
    };
    fs.writeFile(Config.Data_Path + 'data.json', JSON.stringify(VIEW_DATA), (err) => {
        if (err) {
            logger.error('保存访问量数据失败！')
            return
        };
        logger.info('已保存访问量数据')
    });
});

/**===========================
 *          Token鉴权
 * ===========================
 */
let Token_data;//声明变量
if (Token_data == null) {
    fs.readFile(Config.Data_Path + 'Token.json', (err, dt) => {
        if (err) {
            logger.error('读取Token文件失败！');
        };
        let tmp = JSON.parse(dt);
        Token_data = tmp;
        logger.warn('已读取Token数据')
    })
}
//权限判断
function Token_JUDGMENT(tk) {
    if (Token_data.indexOf(tk) !== -1) {
        return true
    }
    else {
        return false
    }
}

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})


/**===========================
 *          API接口
 * ===========================
 */
//访问量API  0仅获取数据 1网站访问量
api.get(Config.API_Path[1], (req, res) => {
    let get_id = req.query.id;//获取请求ID
    if (get_id == undefined) { get_id = 0 };//未提交ID指定为0
    if (get_id == 1) { VIEW++; }//对数据执行+1
    logger.info(`${req.ip} ${req.method} ${res.statusCode} ${req.originalUrl}`);
    //返回请求
    let VIEW_DATA = {
        "view": VIEW,
        "web_api": WEB_API,
        "serach_api": SERACH_API
    };
    res.json({
        code: 200,
        message: '请求完成',
        data: [VIEW_DATA]
    });
});

//WEB模糊搜索API
api.get(Config.API_Path[0], (req, res) => {
    let name = req.query.name;//获取请求的名称
    let tok = req.query.token;//获取Token
    // 判断是否有Token
    if (Token_JUDGMENT(tok)) { } else {
        return res.status(401).json({
            code: 401,
            message: "ERROR"
        });
    };
    // 判断是否空请求
    if (name == '' || name == null) {
        return res.status(400).json({
            code: 400,
            message: '未发送有效载荷'
        });
    };
    let res_tmp = []//存储待发送的数据
    for (let i = 0; i < MCID.length; i++) {
        if (MCID[i].name.indexOf(name) > -1) {
            //模糊匹配请求的名称
            res_tmp.push(MCID[i]);//将匹配的结果添加进数组
        };
    };
    if (res_tmp.length == 0) {
        return res.status(404).json({
            code: 404,
            message: `未查询到请求${name}`
        });
    };
    WEB_API++;//对检索量+1
    logger.info(`${req.ip} ${req.method} ${res.statusCode} ${req.originalUrl}`);
    res.json({
        code: 200,
        message: '查询完成',
        data: res_tmp
    });
});

//开发者API搜索
api.get(Config.API_Path[2], (req, res) => {
    let id = req.query.id//获取请求的id
    let dv = req.query.dv//获取请求的dv
    let result;//记录匹配的数组位置
    //绝对匹配id和dv
    for (let i = 0; i < MCID.length; i++) {
        if (MCID[i].id == id && MCID[i].dv == dv) {
            result = i;
        };
    };
    if (result == null) {
        return res.status(404).json({
            code: 404,
            message: '未查询到请求的内容'
        });
    }
    SERACH_API++;//对搜索API+1
    logger.info(`${req.ip} ${req.method} ${res.statusCode} ${req.originalUrl}`);
    res.json({
        code: 200,
        message: '查询完成',
        data: [MCID[result]]
    });
});

//启动到设置的端口
api.listen(Config.Port);
logger.info(`启动完成，监听端口${Config.Port}`);

process.on('uncaughtException', (err) => {
    logger.error(`Caught exception: ${err}`);
});