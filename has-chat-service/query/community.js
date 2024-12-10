const { info, db } = require('../config');
// 新增社区内容
exports.insertCommunity = function (community) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`insert into community (PublishId,AvatarUrl,PublishName,Content,ImgList,CreateDateUtc) values(${community.PublishId},"${community.AvatarUrl}","${community.PublishName}","${community.Content}",'${community.ImgList}',"${community.CreateDateUtc}");`, (err, result) => {
        if (err) {
          reject(info.error("新增社区内容失败"))
        } else {
          resolve(info.sucess(null, "新增社区内容成功"))
        }
      })
    } catch {
      reject(info.error("新增社区内容异常"))
    }
  })
}

// 获取社区内容
exports.getCommunityList = function (query) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`select * from community order by Id desc limit ${(query.pageIndex - 1) * query.pageSize},${query.pageSize}`, (err, communityList) => {
        if (err) {
          reject(info.error("查询社区内容失败"))
        } else {
          resolve(info.sucess(communityList, "查询社区内容成功"))
        }
      })
    } catch {
      reject(info.error("查询社区内容异常"))
    }
  })
}

// 获取社区喜爱记录
exports.getCommunityLikeRecord = function (model) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`select * from community_like_record where UserId =  ${model.userId} and CommunityId = ${model.communityId}`, (err, result) => {
        if (err) {
          console.log(err);
          reject(info.error("查询社区喜爱记录失败"))
        } else {
          resolve(info.sucess(result, "查询社区喜爱记录成功"))
        }
      })
    } catch {
      reject(info.error("查询社区喜爱记录异常"))
    }
  })
}

// 新增社区喜爱
exports.insertCommunityLikeRecord = function (model) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`insert into community_like_record (UserId,CommunityId) values(${model.userId},"${model.communityId}");`, (err, result) => {
        if (err) {
          reject(info.error("点赞失败"))
        } else {
          resolve(info.sucess(null, "点赞成功"))
        }
      })
    } catch {
      reject(info.error("点赞异常"))
    }
  })
}

// 删除社区喜爱
exports.deleteCommunityLikeRecord = function (model) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`delete from community_like_record where UserId = ${model.userId} and CommunityId = ${model.communityId};`, (err, result) => {
        if (err) {
          reject(info.error("取消失败"))
        } else {
          resolve(info.sucess(null, "取消成功"))
        }
      })
    } catch {
      reject(info.error("取消异常"))
    }
  })
}

// 获取社区喜爱数量
exports.getCommunityLikeCount = function (model) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`select * from community_like_record where CommunityId = ${model.communityId}`, (err, result) => {
        if (err) {
          reject(info.error("查询社区喜爱总数失败"))
        } else {
          resolve(info.sucess(result, "查询社区喜爱总数成功"))
        }
      })
    } catch {
      reject(info.error("查询社区喜爱总数异常"))
    }
  })
}

// 新增社区评论
exports.insertCommunityComment = function (model) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`insert into community_comment (CommunityId,SendId,Type,SendName,ReceiverId,ReceiverName,AvatarUrl,Content,CreateDateUtc,CommunityImg,CommunityContent) values(${model.communityId},${model.sendId},${model.type},"${model.sendName}",${model.receiverId},"${model.receiverName}","${model.avatarUrl}","${model.content}","${model.createDateUtc}","${model.communityImg}","${model.communityContent}");`, (err, result) => {
        if (err) {
          console.log(err);
          reject(info.error("新增社区评论失败"))
        } else {
          resolve(info.sucess(null, "新增社区评论成功"))
        }
      })
    } catch {
      reject(info.error("新增社区评论异常"))
    }
  })
}

// 获取社区评论
exports.getCommunityCommentList = function (model) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`select * from community_comment where CommunityId = ${model.communityId}`, (err, result) => {
        if (err) {
          reject(info.error("查询社区评论失败"))
        } else {
          resolve(info.sucess(result, "查询社区评论成功"))
        }
      })
    } catch {
      reject(info.error("查询社区评论异常"))
    }
  })
}

// 删除社区评论
exports.deleteCommunityComment = function (model) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`delete from community_comment where Id = ${model.id};`, (err, result) => {
        if (err) {
          reject(info.error("删除社区评论失败"))
        } else {
          resolve(info.sucess(null, "删除社区评论成功"))
        }
      })
    } catch {
      reject(info.error("删除社区评论异常"))
    }
  })
}

// 查询用户未读信息
exports.getUnreadCommunityList = function (model) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`select * from community_comment where ReceiverId = ${model.receiverId} and SendId != ${model.receiverId} and Status = 0`, (err, result) => {
        if (err) {
          reject(info.error("查询用户未读信息失败"))
        } else {
          resolve(info.sucess(result, "查询用户未读信息成功"))
        }
      })
    } catch {
      reject(info.error("查询用户未读信息异常"))
    }
  })
}

// 查询用户消息列表
exports.getCommunityMessageList = function (model) {
  return new Promise((resolve, reject) => {
    try {
      let sql = '';
      if (model.pageIndex && model.pageSize) {
        sql = `select * from community_comment where ReceiverId = ${model.receiverId} and SendId != ${model.receiverId} and Status = ${model.status} order by Id desc limit ${(model.pageIndex - 1) * model.pageSize + model.extra},${model.pageSize}`
      } else {
        sql = `select * from community_comment where ReceiverId = ${model.receiverId} and SendId != ${model.receiverId} and Status = ${model.status} order by Id desc`
      }
      db.query(sql, (err, result) => {
        if (err) {
          reject(info.error("查询消息失败"))
        } else {
          resolve(info.sucess(result, "查询用户消息成功"))
        }
      })
    } catch (err) {
      console.log(err);
      reject(info.error("查询用户消息异常"))
    }
  })
}

// 根据Id更新用户的消息阅读状态
exports.updateCommunityContentStateById = function (model) {
  return new Promise((resolve, reject) => {
    try {
      db.query(`update community_comment set Status = ${model.status} where ReceiverId = ${model.receiverId}`, (err, result) => {
        if (err) {
          reject(info.error("更新用户的消息阅读状态失败"))
        } else {
          resolve(info.sucess(null, "成功"))
        }
      })
    } catch {
      reject(info.error("更新用户的消息阅读状态异常"))
    }
  })
}