import { History } from "history"
import Qs from "qs"

let ReactHistory: History
const ReactRoutes: Object = {}

// 注入路由配置
export function NavigationInject(_ReactHistory: History,_Routes: Array<RouteItem>){
    ReactHistory = _ReactHistory
    _Routes.map(item => {
        if(ReactRoutes.hasOwnProperty(item.name)){
            console.error("route-name有重复，请重命名")
        }else{
            ReactRoutes[item.name] = item.path
        }
    })
}

// 生成路由
function createPath(name: string,params = {}): string | void{
    const path = ReactRoutes[name]
    if(path){
        return path.replace(/\/:(\w+)/g,(fk,k) => params[k] ? '/' + params[k] : '' )
    }else{
        console.error(`没有找到${name}路由`)
    }
}

// 生成完整路径
function createFullPath(name: string,params = {},search = {}){
    const fullpath = createPath(name,params)
    if(fullpath){
        return ReactHistory.createHref({pathname: fullpath,search: Qs.stringify(search)})
    }
}

function push(){
    // ReactHistory.push(createFullPath('homes',{id: "xxx"}))
}

export default {
    createFullPath,
    push
}