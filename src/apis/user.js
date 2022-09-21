import request from "../utils/request";

export const registApi = (body) => {
  return request('/regist', {
    method: 'post',
    body
  })
}

export const loginApi = (body) => {
  return request('/login', {
    method: 'post',
    body
  })
}

// 获取用户菜单
export const routersApi = (query) => {
  return request(`/menu/${query}`)
}

// 获取用户信息
export const getUserMsg = () => {
  return request(`/user`)
}

// by Id
export const getUserMsgById = (query) => {
  return request(`/user/${query}`)
}

//  切换头像
export const changeAvatarApi = (body) => {
  return request('/user/avatar', {
    method: 'PUT',
    body
  })
}

