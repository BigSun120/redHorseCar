import request from "../utils/request";
import requestFile from "../utils/requestFile";

// 获取部门数据 // keyy=0&valuee=1&tableName（搜索框）
export const getDictApi = (query) => request('/dict', { query })

// 新增
//keyy: 333 valuee: 333 tableName: 333 fieldName: 333
export const addDictApi = (body) => {
  return request(`/dict`, {
    method: 'post',
    body
  })
}

// 根据 ID 删除dict
export const delDictByIdApi = (id) => {
  return request(`/dict/${id}`, {
    method: 'delete'
  })
}

// 改 keyy: 0 valuee: 男 tableName: t_user fieldName: ssex dictId: 1
export const changeDictApi = (body) => {
  return request(`/dict`, {
    method: 'put',
    body
  })
}

// 下载excel表
export const downloadApi = (body) => {
  return requestFile('/dict/excel', {
    method: 'POST',
    body
  })
}


