function query(target: OBJ | Array<OBJ>, name: string, val: string | number | Array<string|number>): Array<OBJ> {
	const factor = (val instanceof Array ? val : [val]).map(String)
	const result = []
	if(target instanceof Array){
		target.map(item => {
			const val = String(item[name])
			if(factor.indexOf(val) != -1){
				result.push(item)
			}
		})
	}else{
		console.log
	}
	return result
}

export default {
	query
}