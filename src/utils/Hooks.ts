function useRef(defaultValue: string){
    const wrap = {
        up: () => wrap.key = Math.random(),
        set: val => wrap.value = val,
        key: Math.random(),
        value: defaultValue,
        reset: () => wrap.value = defaultValue
    }
    return wrap
}

export default {
    useRef
}