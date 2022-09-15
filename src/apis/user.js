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

// export function loginApi(body) {
//   return request('/login', {
//     method: 'POST',
//     body
//   })
// }