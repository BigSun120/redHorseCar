export const breadcrumbs: any = {
  //key(路径名):value（当前路径对应的面包屑导航数据）
  "/home": [{ title: "系统首页" }],
  "/system/user": [{ title: "系统首页", link: "/home" }, { title: "系统管理", link: "/system/user" }, { title: "用户管理" }],
  "/system/role": [{ title: "系统首页", link: "/home" }, { title: "系统管理", link: "/system/user" }, { title: "角色管理" }],
  "/system/dict": [{ title: "系统首页", link: "/home" }, { title: "系统管理", link: "/system/user" }, { title: "字典管理" }],
  "/system/menu": [{ title: "系统首页", link: "/home" }, { title: "系统管理", link: "/system/user" }, { title: "菜单管理" }],
}