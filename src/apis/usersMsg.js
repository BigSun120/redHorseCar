import request from "../utils/request";

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
    // data: 'username=qi123&password=123123&email=123@qq.com&mobile=12312312311&roleId=2&deptId=4&status=1&ssex=0'
    // body: s
  })
}

// 根据用户 ID 删除用户
export const delUserApi = (userId) => {
  return request(`/user/${userId}`, { method: 'delete' })
}