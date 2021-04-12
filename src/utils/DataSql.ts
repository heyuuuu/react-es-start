interface Shine {
	task: DataSql.Task
	subject: DataSql.Subject
	developer: DataSql.Developer
	producter: DataSql.Producter
}

const DB_NAME = "mysql"
const DB_TABLE_TASK: keyof Shine = "task"
const DB_TABLE_SUBJECT: keyof Shine = "subject"
const DB_TABLE_DEVELOPER: keyof Shine = "developer"
const DB_TABLE_PRODUCTER: keyof Shine = "producter"

function openData(onupgradeneeded?: (target: IDBOpenDBRequest, event: IDBVersionChangeEvent) => void, version?: number) {
	return new Promise<{target: IDBOpenDBRequest, event: any}>((resolve, reject)=>{
		const request = window.indexedDB.open(DB_NAME, version)
		request.onsuccess = event => {
			resolve({target: request, event})
		}
		request.onerror = event => {
			reject(event)
		}
		request.onupgradeneeded = event => {
			onupgradeneeded instanceof Function && onupgradeneeded(request, event)
		}
	})
}

function InitTable(name: keyof Shine, keys: Array<string>, version?: number) {
	openData(target => {
		const table = target.result
		if(table.objectStoreNames.contains(name) === false){
			console.log("InitTable")
			const task = table.createObjectStore(name, {autoIncrement: true, keyPath: "id"})
			keys.map(name => task.createIndex(name, name))
		}
		// table.transaction(name,"readwrite").objectStore(name).createIndex(name,name)
	}, version).then(console.log)
}


// window.indexedDB.deleteDatabase(DB_NAME);
// InitTable("developer",["name"])
// InitTable("producter",["name"])
// InitTable("task",["subject","describe","producter","testTime","formalTime","developer","status","comment"],4)

// 获取数据
function GetData<T extends keyof Shine>(name: T) {
	return new Promise<Array<Shine[T]>>((resolve, reject) => {
		openData().then(res => {
			const main = res.target.result.transaction([name]).objectStore(name).getAll()
			main.onsuccess = event => resolve(main.result)
		}, reject)
	})
}

// 写入数据
function Write<T extends keyof Shine>(name: T, data: Shine[T]) {
	return new Promise((resolve, reject) => {
		openData().then(res => {
			const main = res.target.result.transaction(name, "readwrite").objectStore(name).add(data)
			main.onsuccess = resolve
			main.onerror = reject
		}).catch(reject)
	})
}

// 更新数据
function Update<T extends keyof Shine>(name: T, data: Shine[T]) {
	return new Promise((resolve, reject) => {
		openData().then(res => {
			const main = res.target.result.transaction([name], "readwrite").objectStore(name).put(data)
			main.onsuccess = resolve
			main.onerror = event => reject
		}).catch(reject)
	})
}

// 删除数据
function Delete(name: keyof Shine, id: number) {
	return new Promise((resolve, reject) => {
		openData().then(res => {
			const main = res.target.result.transaction([name], "readwrite").objectStore(name).delete(id)
			main.onsuccess = resolve
			main.onerror = reject
		}, reject).catch(reject)
	})
}

// 查询数据
function Query(name: keyof Shine, id: number) {
	return new Promise((resolve, reject) => {
		openData().then(res => {
			const main = res.target.result.transaction([name], "readwrite").objectStore(name).get(id)
			main.onsuccess = res => resolve(main.result)
			main.onerror = reject
		}, reject).catch(reject)
	})
}

export default {
	Query,
	Write,
	Delete,
	Update,
	GetData,
	DB_TABLE_TASK,
	DB_TABLE_SUBJECT,
	DB_TABLE_DEVELOPER,
	DB_TABLE_PRODUCTER
}