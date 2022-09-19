import request from "../utils/request";


// 获取角色数据
export const getRoleApi = (query) => {
  return request('/role', {
    method: 'get',
    query
  })
}

// 角色对应菜单
export const getRoleMenuApi = (roleID) => {
  return request(`role/menu/${roleID}`)
}

// 根据 ID 删除角色
export const delRoleByIdApi = (roleID) => {
  return request(`role/menu/${roleID}`, {
    method: 'delete'
  })
}

// 新增角色
export const addRoleApi = (body) => {
  return request('/role', {
    method: 'post',
    body
  })
}

// 修改角色信息
export const changeRoleMsgApi = (body) => {
  return request('/role', {
    method: 'put',
    body
  })
}

// 获取 权限菜单
export const getAllRolesMenuApi = () => {
  return request('/menu')
}