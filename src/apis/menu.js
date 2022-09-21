import request from "../utils/request";

// 根据用户名获取权限菜单
export const getMenuByUNameApi = (username) => {
  return request(`/menu/${username}`)
}

// 修改菜单
export const changeMenuApi = (body) => {
  return request(`/menu`, {
    method: 'put',
    body
  })
}

// 根据 ID 删除菜单
export const delMenuByIdApi = (id) => {
  return request(`/menu/${id}`, {
    method: 'delete'
  })
}

// 获取菜单数据
export const getMenuApi = (query) => {
  return request(`/menu`, {
    method: 'get',
    query
  })
}

// 新增菜单
export const addMenuApi = (body) => {
  return request(`/menu`, {
    method: 'post',
    body
  })
}

