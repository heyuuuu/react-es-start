// 观察者
interface DataProps {
	task: OBJ
	subject: OBJ
	developer: OBJ
	producter: OBJ
}

type NameType = keyof DataProps

interface PublishModelProps<T = unknown> {
	data: T
	pointer: number
}

interface SubscribeModelProps {
	uid: number
	name: NameType
	pointer: number
	callback: FUNC
}

type WrapPublishModelProps= {
	[key in NameType]?: PublishModelProps<DataProps[key]>
}

let pointIndex = 0
let uid = 0
const publishModel: WrapPublishModelProps = {}
let subscribeModel: Array<SubscribeModelProps> = []

function dispatch() {
	subscribeModel.map(item => {
		const { pointer, data } = publishModel[item.name]
		if(item.pointer < pointer){
			item.callback(data)
			item.pointer = pointer
		}
	})
}

function publish<T extends NameType>(name: T, data?: DataProps[T]) {
	publishModel[name] = {
		data,
		pointer: pointIndex ++
	}
	dispatch()
}

function subscribe<T extends NameType>(name: T, callback: (data: DataProps[T]) => void): number {
	const data = {
		uid: uid ++,
		name,
		pointer: 0,
		callback
	}
	subscribeModel.push(data)
	dispatch()
	return data.uid
}

function unsubscribe(uid: number) {
	subscribeModel = subscribeModel.filter(item => item.uid != uid)
}

export default {
	publish,
	subscribe,
	unsubscribe
}