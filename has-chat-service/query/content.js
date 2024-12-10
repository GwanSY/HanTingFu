const { info, db } = require('../config');

// 获取用户的聊天内容
exports.getContentBySendId = function (sendId, pageIndex, pageSize) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`select * from content where SendId ="${sendId}" or ReciverId ="${sendId}" LIMIT  ${(pageIndex - 1) * pageSize},${(pageSize)}`, (err, content) => {
        if (err) {
          reject(info.error("查询聊天内容失败"))
        } else {
          resolve(info.sucess(content, "成功"))
        }
      })
    } catch {
      reject(info.error("查询聊天内容异常"))
    }
  })
}

// 插入内容
exports.insertContent = function (data) {
  return new Promise((resolve, reject) => {
    try {
      let sql = `insert into content (SendId,ReciverId,Content,Type,State,NoCode,CreateDateUtc,ReadFlag,Avatar,Description) values(${data.SendId},${data.ReciverId},'${data.Content}',${data.Type},${data.State},"${data.NoCode}","${data.CreateDateUtc}",${data.ReadFlag},"${data.Avatar}","${data.Description}")`;
      db.query(sql, (err, result) => {
        if (err) {
          reject(info.error("插入聊天内容失败"))
        } else {
          resolve(info.sucess(null, "成功"))
        }
      })
    } catch {
      reject(info.error("插入聊天内容异常"))
    }
  })
}

// 获取用户未读信息
exports.getUnReadContent = function (sendId, reciverId) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`select * from content where SendId ="${sendId}" and ReciverId ="${reciverId}" and ReadFlag = false`, (err, content) => {
        if (err) {
          reject(info.error("获取用户未读信息失败"))
        } else {
          resolve(info.sucess(content, "成功"))
        }
      })
    } catch {
      reject(info.error("获取用户未读信息异常"))
    }
  })
}

// 更新聊天内容阅读状态
exports.updateContentReadFlagById = function (id) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`update content set ReadFlag = 1 where Id ="${id}"`, (err, content) => {
        if (err) {
          reject(info.error("更新聊天内容阅读状态失败"))
        } else {
          resolve(info.sucess(content, "成功"))
        }
      })
    } catch {
      reject(info.error("更新聊天内容阅读状态异常"))
    }
  })
}