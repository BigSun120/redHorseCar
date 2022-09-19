import { message } from "antd";
import request from "../utils/request";
import requestFile from "../utils/requestFile";

// 获取用户数据
export const getUsersApi = (query) => {
  return request('/user', {
    query
  })
}

// 修改用户数据
export const changeUserApi = (body) => {
  return request('/user', {
    method: 'put',
    body
  })
}

// 获取用户类型和状态
export const getUserStateApi = (username, password) => {
  return request(`tUser/shop/getUserTypeAndStatus/${username}/${password}`)
}

// 新增用户
export const addUserApi = (body) => {
  // let s = '';
  // Object.keys(body).map(a => {
  //   s += (a + '=' + body[a] + '&')
  // })
  // console.log(s);
  return request('/user', {
    method: 'post',
    body
  })
}

// 根据用户 ID 删除用户
export const delUserApi = (userId) => {
  message.success('假装删除成功')
  // return request(`/user/${userId}`, { method: 'delete' })
}

// 重置密码 user/password/reset usernames: qwe123
export const resetPwdApi = (body) => {
  return request('/user/password/reset', {
    method: 'PUT',
    body
  })
}

// 下载excel表
export const downloadExcelApi = (body) => {
  return requestFile('/user/excel', {
    method: 'POST',
    body
  })
}