import React from 'react'

// 确定 按钮的状态
export const showOrDisable = {
  showOrHide: "showOrHide",
  disableOrOpen: "disableOrOpen"
}

// 后台给的权限
export const permissionsType = {
  add_shop: "add_shop",
  add_account: "add_account",
  del_account: "del_account",
}

export default function AuthComponent({
  auth,
  children,
  type = permissionsType.disableOrOpen,
  ...rest
}) {
  const permissions = JSON.parse(localStorage.permissions);

  // 如果没有权限 需要隐藏 permissions.includes(auth) 为 false 
  if (type === showOrDisable.showOrHide) {
    return permissions.includes(auth) ? children : null
    // 没有权限的 禁用
  } else if (type === showOrDisable.disableOrOpen) {
    // 克隆节点
    return React.cloneElement(children, {
      // 第二个参数 可以添加属性
      disabled: !permissions.includes(auth),
      title: !permissions.includes(auth) ? '对不起，不准用~' : null,
      // 其余参数，不传的话 按钮可能会丢失某些功能或参数 
      ...rest
    })
  }
} 