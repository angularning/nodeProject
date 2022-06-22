class Observer {
    constructor(value) {
        this.value = value
        if (Array.isArray(value)){

        } else {
            this.walk(value)
        }
    }
    walk(obj){
        const keys = Object.keys(obj);
        for(let i=0;i<keys.length;i++){
            defineReactive(obj, keys[i])
        }
    }
}

function defineReactive(obj, key, val){
    if (arguments.length === 2) {
        val = obj[key]
    }
    if (typeof val === 'object'){
        new Observer(val)
    }
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            console.log(`${key}被读取了`)
            return val
        },
        set(v) {
            if(v=== val){
                return
            }
            console.log(`${key}被修改了`)
            val = v
        }
    })
 }
