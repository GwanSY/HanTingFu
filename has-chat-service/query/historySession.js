const { info, db } = require('../config');

// 新增历史会话
exports.insertHistorySession = function (historySession) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`insert into history_session (FormId,Name,NickName,PersonalitySign,Mobile,Region,Avatar,Email,ById) values("${historySession.FormId}","${historySession.Name}","${historySession.NickName}","${historySession.PersonalitySign}","${historySession.Mobile}","${historySession.Region}","${historySession.Avatar}","${historySession.Email}","${historySession.ById}");`, (err, result) => {
        if (err) {
          reject(info.error("新增历史会话失败"))
        } else {
          resolve(info.sucess(null, "成功"))
        }
      })
    } catch {
      reject(info.error("新增历史会话异常"))
    }
  })
}

// 获取历史会话列表
exports.getHistorySession = function (id, pageIndex, pageSize) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`select * from history_session where ById ="${id}" LIMIT  ${(pageIndex - 1) * pageSize},${(pageSize)}`, (err, user) => {
        if (err) {
          reject(info.error("查询历史会话列表失败"))
        } else {
          resolve(info.sucess(user, "成功"))
        }
      })
    } catch (err) {
      console.log(err);
      reject(info.error("查询历史会话列表异常"))
    }
  })
}

// 获取历史会话
exports.getOneHistorySession = function (byId, formId) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`select * from history_session where ById ="${byId}" and FormId = "${formId}"`, (err, user) => {
        if (err) {
          reject(info.error("查询历史会话失败"))
        } else {
          resolve(info.sucess(user, "成功"))
        }
      })
    } catch (err) {
      console.log(err);
      reject(info.error("查询历史会话异常"))
    }
  })
}