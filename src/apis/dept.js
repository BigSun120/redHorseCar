import request from "../utils/request";
import requestFile from "../utils/requestFile";

// 获取部门数据 // keyy=0&valuee=1&tableName（搜索框）
export const getDeptApi = (query) => request('/dept', { query })

// 新增
// deptName: qwe parentId: 5 orderNum: 66
export const addDeptApi = (body) => {
  return request(`/dept`, {
    method: 'post',
    body
  })
}

// 根据 ID 删除dept
export const delDeptByIdApi = (id) => {
  return request(`/dept/${id}`, {
    method: 'delete'
  })
}

// 修改  deptName: cccc parentId: 19 deptId: 30
export const changeDeptApi = (body) => {
  return request(`/dept`, {
    method: 'put',
    body
  })
}

// 下载excel表
export const downloadApi = (body) => {
  return requestFile('/dept/excel', {
    method: 'POST',
    body
  })
}


