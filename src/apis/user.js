import request from "../utils/request";

export const registApi = (body) => {
  return request('/regist', {
    method: 'post',
    body
  })
}

export const loginApi = (body) => {
  return request('/login', {
    method: 'POST',
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
  // const { username } = JSON.parse(localStorage.user)
  // if (username) {
  //   return routersApi(username);
  // }
}
