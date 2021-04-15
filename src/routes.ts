import React from "react"
import { InjectNavRoutes } from "react-router-nav"
import { RouteItem , RouteProp } from "TYPES"

// 登录页面
const Login: RouteItem = {name: "login", path: "/login", component: React.lazy(() => import("src/pages/Login"))}

// 功能页面
const List: Array<RouteItem> = [
	{name: "home", path: "/home", component: React.lazy(() => import("src/pages/Manager"))},
	{name: "setting", path: "/setting", component: React.lazy(() => import("src/pages/Setting"))},
	{name: "progress", path: "/progress", component: React.lazy(() => import("src/pages/Progress"))},
]

// 主页
const Home: RouteProp = {path: List.map(item => item.path), component: React.lazy(() => import("src/pages/Home"))}

// 错误页面
const Error: RouteItem = {name: "error", path: "/error", component: React.lazy(() => import("src/pages/Error"))}

InjectNavRoutes([Login,...List,Error])

export default {
	List,
	Home,
	Login,
	Error,
}