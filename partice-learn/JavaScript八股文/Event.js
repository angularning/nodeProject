class EventEmiter {
    constructor(){
        this.catchList = {}
    }
    emit(name, once = false, ...arg){
        if(this.catchList[name]){
            const task = this.catchList[name].slice()
            for(let fn of task){
                fn(...arg)
            }
            if(once){
                delete this.catchList[name]
            }
        }
    }
    on(name, fn){
        if(this.catchList[name]){
            this.catchList[name].push(fn)
        } else {
            this.catchList[name] = [fn]
        }
    }
    off(name, fn){
        const task = this.catchList[name].slice()
        if(task){
            const index = task.findIndex(f=> f === fn || f.callback === fn)
            if(index > 0 ){
                task.splice(index, 1)
            }
        }
    }
}
export default EventEmiter