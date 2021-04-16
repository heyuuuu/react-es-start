import React from "react"
import { InjectNavRoutes } from "react-router-nav"
import { RouteItem, RouteProp } from "TYPES"
import HomeList from "src/pages/Home/routes"

// 登录页面
const Login: RouteItem = {name: "login", path: "/login", component: React.lazy(() => import("src/pages/Login"))}

// 主页
const Home: RouteProp = {path: "/", component: React.lazy(() => import("src/pages/Home"))}

// 错误页面
const Error: RouteItem = {name: "error", path: "/error", component: React.lazy(() => import("src/pages/Error"))}

InjectNavRoutes([Login, ...HomeList, Error])

export default {
	Home,
	Login,
	Error,
}