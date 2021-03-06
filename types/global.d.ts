/// <reference path="types.d.ts" />
/// <reference path="module.d.ts" />

// 环境变量
declare const BRANCH_ENV: "dev" | "pro"
// 环境配置
declare const BRANCH_CONFIG: {
	tuDomain: string
}

declare type OBJ = Record<string, any>
declare type FUNC = (...arg: any[]) => unknown

declare namespace DataSql {
	export interface Developer {
		id?: number
		name: string
	}
	export interface Producter{
		id?: number
		name: string
	}
	export interface Subject {
		id?: number
		name: string
		git: string //git地址
		domain: string // 正式环境域名
	}
	export interface Task {
		id?: number
		subject: number // 项目
		title: string // 迭代目标
		describe: string // 需求描述
		producter: number // 产品
		testTime: number // 提测时间节点
		formalTime: number // 正式时间节点
		developer: Array<string> // 开发者
		status: boolean // 状态
		comment: string // 备注
	}
	export type Shine = "task" | "subject" | "developer" | "producter"
}