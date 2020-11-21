// 环境变量
declare const BRANCH_ENV: "dev" | "pro"
// 环境配置
declare const BRANCH_CONFIG: {
	tuDomain: string
}

// 路由配置
interface RouteItem {
	name: string
	path: string
	component: React.LazyExoticComponent<React.ComponentClass>
}