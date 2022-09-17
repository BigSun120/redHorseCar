import request from "../utils/request";

// export const registApi = (body) => {
//   return request('/regist', {
//     method: 'post',
//     body
//   })
// }

export const getRoleApi = (query) => {
  return request('/role', {
    method: 'get',
    query
  })
}
