/**
 * @description res model
 * @author 双越老师
 */

/**
 * 基础模型，包括 code data 和 message
 */
class BaseRes {
    constructor({ code, data, message }) {
        this.code = code
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

/**
 * 执行失败的数据模型
 */
class ErrorRes extends BaseRes {
    constructor({ code = -1, message = '', data }, addMessage = '') {
        super({
            code,
            message: addMessage
                ? `${message} - ${addMessage}` // 有追加信息
                : message,
            data,
        })
    }
}

/**
 * 执行成功的数据模型
 */
class SuccessRes extends BaseRes {
    constructor(data = {}) {
        super({
            code: 0,
            data,
            message: '成功'
        })
    }
}

module.exports = {
    ErrorRes,
    SuccessRes,
}
