const { info, db } = require('../config');

// 获取用户列表
exports.getUSerList = function (id, pageIndex, pageSize) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`select * from user where Id !="${id}" LIMIT  ${(pageIndex - 1) * pageSize},${(pageSize)}`, (err, user) => {
        if (err) {
          reject(info.error("查询用户列表失败"))
        } else {
          resolve(info.sucess(user, "成功"))
        }
      })
    } catch {
      reject(info.error("查询用户列表异常"))
    }
  })
}

// 根据Id获取用户信息
exports.getUserById = function (id) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`select * from user where Id = "${id}"`, (err, user) => {
        if (err) {
          reject(info.error("查询用户信息失败"))
        } else {
          resolve(info.sucess(user, "成功"))
        }
      })
    } catch {
      reject(info.error("查询用户信息异常"))
    }
  })
}

// 随机获取一位用户
exports.getRandomUser = function () {
  return new Promise((resolve, reject) => {
    try {
      db.query(`select * from user ORDER BY RAND() LIMIT 1`, (err, user) => {
        if (err) {
          reject(info.error("随机获取一位用户失败"))
        } else {
          resolve(info.sucess(user, "成功"))
        }
      })
    } catch {
      reject(info.error("随机获取一位用户异常"))
    }
  })
}

// 根据email获取用户信息
exports.getUserByEmail = function (email) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`select * from user where Email = "${email}"`, (err, user) => {
        if (err) {
          reject(info.error("根据email获取用户信息失败"))
        } else {
          resolve(info.sucess(user, "成功"))
        }
      })
    } catch {
      reject(info.error("根据email获取用户信息异常"))
    }
  })
}

// 新增用户
exports.insertUser = function (user) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`insert into user (Name,NickName,Email,Password,Avatar) values("${user.name}","${user.nickName}","${user.email}","${user.password}","${user.avatar}");`, (err, result) => {
        if (err) {
          reject(info.error("新增用户失败"))
        } else {
          resolve(info.sucess(null, "成功"))
        }
      })
    } catch {
      reject(info.error("新增用户异常"))
    }
  })
}

// 根据Id更新用户的socket.id
exports.updateUserOutTradeNoById = function (id, outTradeNo) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`update user set OutTradeNo = "${outTradeNo}" where Id = "${id}"`, (err, result) => {
        if (err) {
          reject(info.error("更新用户socket.id失败"))
        } else {
          resolve(info.sucess(null, "成功"))
        }
      })
    } catch {
      reject(info.error("更新用户socket.id异常"))
    }
  })
}

// 根据Id更新用户的在线状态
exports.updateUserOnlineStateById = function (id, onlineState) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`update user set OnlineState = ${onlineState} where Id = "${id}"`, (err, result) => {
        if (err) {
          reject(info.error("更新在线状态失败"))
        } else {
          resolve(info.sucess(null, "成功"))
        }
      })
    } catch {
      reject(info.error("更新在线状态异常"))
    }
  })
}

// 根据Id更新用户的历史会话列表
exports.updateHistorySessionListById = function (historySessionList, id) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`update user set HistorySessionList = '${historySessionList}' where Id = ${id}`, (err, result) => {
        if (err) {
          reject(info.error("更新历史会话列表失败"))
        } else {
          resolve(info.sucess(null, "成功"))
        }
      })
    } catch {
      reject(info.error("更新历史会话列表异常"))
    }
  })
}

// 根据socket.id获取用户信息
exports.getUserByOutTradeNo = function (outTradeNo) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`select * from user where OutTradeNo = "${outTradeNo}"`, (err, user) => {
        if (err) {
          reject(info.error("根据socket.id获取用户信息失败"))
        } else {
          resolve(info.sucess(user, "成功"))
        }
      })
    } catch {
      reject(info.error("根据socket.id获取用户信息异常"))
    }
  })
}

// 根据Id更新用户的时间戳
exports.updateUserNoCodeById = function (id, noCode) {
  return new Promise((resolve, reject) => {
    try {
      let sql = `update user set NoCode = ${noCode} where Id = "${id}"`;
      db.query(sql, (err, result) => {
        if (err) {
          reject(info.error("更新用户时间戳失败"))
        } else {
          resolve(info.sucess(null, "成功"))
        }
      })
    } catch {
      reject(info.error("更新用户时间戳异常"))
    }
  })
}