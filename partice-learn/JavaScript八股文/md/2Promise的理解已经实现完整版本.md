### 一步一步实现一个Promise

- 在使用new Promise()的时候传入的是一个执行器executor，executor接受两个参数
  resolve，reject，并且立即执行。
- 我们都知道的Promise有三个状态
  pending
  fulfilled
  rejected
  状态只能从 pending =》fulfilled
         pending =》rejected

- Promise有一个then方法，接受两个参数，成功的回调(onFulfilled)，失败的回调(onRejected)
  如果onFulfilled不是函数则忽略，如果onRejected不是函数忽略
  如果onFulfilled是函数，则在状态由pending转变为fulfilled的时候执行一次，第一个参数是执行的结果传入。
  如果onRejected是函数，则第一个参数是失败的原因，函数执行一次。

```js
class _Promise {
  constructor(executor){
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined
    let resolve = value => {
      if(this.status === 'pending'){
        this.status = 'fulfilled'
        this.value = value
      }
    }
    let reject = reason => {
      if(this.status === 'pending'){
        this.status = 'rejected'
        this.reason = reason
      }
    }
    try{
      executor(resolve,reject)
    }catch(err){
      reject(err)
    }
  }
  then(onFulfilled,onRejected){
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null
    onRejected = typeof onRejected === 'function' ? onRejected : null
    if(this.status === 'fulfilled'){
      onFulfilled(this.value)
    }
    if(this.status === 'rejected'){
      onRejected(this.reason)
    }
  }
  resolve(value){
    if(value instanceof _Promise){
      return value
    } else {
      return new _Promise(resolve=> resolve(value))
    }
  }
  reject(value){
    return new _Promise((resolve, reject)=> {
      reject(value)
    })
  }
}
测试：
const p1 = new _Promise((resolve,reject) => {
  resolve(1)
})
p1.then(item=> {
  console.log(item)  // 1
})

const p2 = new _Promise((resolve, reject) => {
  setTimeout(()=> {
    resolve(2)
  })
})
p2.then(item=> {
  console.log(item)
})
const p3 = new _Promise((resolve, reject) => {
  reject('err p3')
})
p3.then(item=> {
  console.log(item)
}).catch(err=> {
  console.log(err)
})
```

以上代码只是实现基础的一些功能，如果有异步操作呢比如setTimeout, then的链式调用

```js
class _Promise {
  constructor(executor){
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined
    this.fulfilledList = []
    this.rejectedList = []
    let resolve = (value) => {
        if(this.status === 'pending'){
          this.fulfilledList.map(fn=>fn())
          this.value = value
          this.status = 'fulfilled'
    		}
    }
    let reject = reason => {
      if(this.status === 'pending'){
        this.rejectedList.map(fn=> fn())
        this.reason = reason
        this.status = 'rejected'
      }
    }
    try{
      executor(resolve,reject)
    }catch(e){
      reject(e)
    }
  }
  then(onFulfilled, onRejected){
    return new _Promise((resolve, reject)=> {
      if(this.status === 'pending'){
        this.fulfilledList.push(()=> {
          setTimeout(()=> {
            try{
              let x = onFulfilled(this.value)
              x instanceof _Promise ? x.then(resolve,reject) : resolve(x)
            }catch(e){
              reject(e)
            }
          })
        })
      }
      if(this.status === 'fulfilled'){
        this.fulfilledList.push(()=> {
          setTimeout(()=> {
            try{
              let x = onFulfilled(this.value)
              x instanceof _Promise ? x.then(resolve,reject) : resolve(x)
            }catch(e){
              reject(e)
            }
          })
        })
      }
      
      if(this.status === 'rejected'){
        this.rejectedList.push(()=> {
          setTimeout(()=> {
            try{
              let x = onRejected(this.reason)
              x instanceof _Promise ? x.then(resolve,reject) : resolve(x)
            }catch(e){
              reject(e)
            }
          })
        })
      }
    })
  }
  catch(onRejected){
    this.then(null, onRejected)
  }
  resolve(value){
    this.status = 'fulfilled'
    if(value instanceof _Promise){
      return value
    } else {
      return new _Promise(resolve=>resolve(value))
    }
  }
  reject(value){
    this.status = 'rejected'
    return new _Promise((resolve, reject)=> reject(value))
  }
  static all(promises){
    let count = 0, result = []
    return new _Promise((resolve, reject)=> {
      promises.forEach((p, i)=> {
        _Promise.resolve(p).then(item=> {
          count+=1
          if(count === promises.length){
            result[i] = item
            resolve(result)
          }
        }, err=> {
          reject(err)
        })
      })
    })
  }
  static race(promises){
    return new _Promise((resolve,reject) => {
      promises.forEach((p, i)=> {
        _Promise.resolve(p).then(resolve).catch(reject)
      })
    })
  }
  static any(promises){
    let count = 0;
    return new _Promise((resolve, reject) => {
      promises.forEach((p, i) => {
        _Promise.resolve(p).then(item=> {
          resolve(item)
        }, err => {
          count+=1;
          if(count === promises.length){
            return new AggregateError('all promise err')
          }
        })
      })
    })
  }
  static allSettled(promises){
    let count = 0, result = [];
    return new _Promise((resolve, reject)=> {
      promises.forEach((p, i)=> {
        _Promise.resolve(p).then(item=> {
          count += 1
          result[i] = {
            value: item,
            status: 'fulfilled'
          }
          if(count === promises.length){
            resolve(result)
          }
        }, err => {
          count += 1
          result[i] = {
            reason: err,
            status: 'fulfilled'
          }
          if(count === promises.length){
            resolve(result)
          }
        })
      })
    })
  }
  
}
```



Promise还有很多API，all，any，race，allSettled

```js
关于promise的一些知识：

```
