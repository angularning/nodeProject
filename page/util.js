/**
 * 时间戳转化为年月日时分秒
 * @param value 传入的时间戳，如果长度不登录10或者13直接原值返回
 * */
function transformDateTime(value){
    if(String(value).length === 10 || String(value).length === 13){
        const date = new Date(Number(String(value).length === 10 ? value * 1000 : value)); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear() + "-";
        const M =
            (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
        const D =
            (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
        const h =
            (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
            ":";
        const m =
            (date.getMinutes() < 10
                ? "0" + date.getMinutes()
                : date.getMinutes()) + ":";
        const s =
            date.getSeconds() < 10
                ? "0" + date.getSeconds()
                : date.getSeconds();
        return Y + M + D + h + m + s;
    } else {
        return value
    }
}
/**
 * 获取当前时间或传入 年月日时分秒
 * 根据传入的年月日时分秒转为时间戳
 * @param time 传入时间，空则是当前时间
 * */
function getNowDate(time){
    const date = time ? new Date(time) : new Date()
    const Y = date.getFullYear() + "-";
    const M =
        (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
    const D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    const h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
        ":";
    const m =
        (date.getMinutes() < 10
            ? "0" + date.getMinutes()
            : date.getMinutes()) + ":";
    const s =
        date.getSeconds() < 10
            ? "0" + date.getSeconds()
            : date.getSeconds();
    return Y + M + D + h + m + s;
}

/**
 * 年月日时间转化为时间戳
 * @param time 传入时间 空返回当前时间的时间戳
 * */
function getTimeStamp(time){
    return time ? new Date(time).getTime() : new Date().getTime()
}
/**
 * @param time 传入当前的时间格式为年月日时分秒
 * @param day 可以是正或者负整数
 * 获取当前时间或传入时间往后n天，年月日时分秒
 * */
function getTimeNDay(time, day){
    const num = day * 24 * 60 * 60 * 1000
    return transformDateTime(getTimeStamp(time) + num)
}

/**
 * 时间一分一秒的走
 * */
function timerRun(){
    let timer = null
    let time = new Date();
    timer = setInterval(()=> {
        time = new Date();
        console.log(getNowDate(time))
    }, 1000)
    // if('卸载'){
    //  timer = null
    // }
}

// 数组列表转话为树形结构
const treeList = [
    {
        name: '亚洲',
        parentId: null,
        id: 1,
        children: [
            {
                name: '中国',
                parentId: 1,
                id: 2,
                children: [
                    {
                        name: '上海',
                        parentId: 2,
                        id: 4
                    }
                ]
            },
            {
                name: '韩国',
                parentId: 1,
                id: 3,
                children: []
            },
        ]
    }
]
const list = [
    {
        name: '亚洲',
        parentId: null,
        id: 1,
    },
    {
        name: '中国',
        parentId: 1,
        id: 2,
    },
    {
        name: '上海',
        parentId: 2,
        id: 4,
    },
    {
        name: '韩国',
        parentId: 1,
        id: 3,
        children: []
    },
]
/**
 * 数组列表转化为树结构
 * @param data 数组列表
 * @param key 子元素的key值，默认children
 * @param id 子元素的id，默认id
 * @param parentId 父元素于子元素的关联key，默认parentId
 * */
const listToTree = (data, key = "children",id="id", parentId= "parentId") => {
    return data.filter(item=> {
        item[key] = data.filter(item1=> {
            return item.id === item1[parentId]
        })
        return item.parentId === null
    })
}
// console.log(list)
// console.log(listToTree(list))
/**
* @param data 转化的数组
* @param name 按照某个key去转化
 * */
const treeToList = (data, name = 'children')=> {
    return data&&data.reduce((pre, cur)=> {
        return cur[name] ? pre.concat([cur], treeToList(cur[name])) : pre.concat([cur])
    }, [])
}
// console.log(treeList)
// console.log(treeToList(treeList))
const arrHasObject = [
    1,2,1,
    {
        name: 1,
        id: 1
    },
    {
        id: 1,
        name: 2
    },
    {
        id: 2,
        name: 1
    }
]
const testArr1= [1,2,3,'2',1]
/**
 * 数组去重，中间有对象按照对象的key
 * @param arr 处理数据
 * @param param 处理参数 {key: 'name'} 默认id
 * */
const uniqueArr = (arr, param = {key: 'id'}) => {
    if (arr.find(item=> typeof item ==='object')){
        let obj = {};
        return arr.reduce((perv, cur) => {
            obj[cur[param.key]]
                ? ''
                : (obj[cur[param.key]] = perv.push(cur));
            return perv;
        }, []);
    } else {
        return [...new Set(arr)]
    }
}
// console.log(uniqueArr(arrHasObject, {key: 'id'}))

/**
 * Promise的作用
 * （1）用来处理异步回调。
 * 实现的思路
 * （1）Promise是一个构造函数
 * （2）有三种状态，pending,onFulfilled,onRejected,且状态只能由pending=>onFulfilled,pending=>onRejected
 * （3）可以处理异步任务比如setTimeout
 *  ---- 通过一个数组收集每次执行难
 * （4）能够链式调用比如.then().then().catch()
 * */
class Promise1 {
    constructor(executor) {
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined
        this.fulfilledList = []
        this.rejectedList = []
        let resolve = value => {
            if(this.status === 'pending'){
                this.status = 'fulfilled'
                this.value = value
                this.fulfilledList.forEach(fn=> fn())
            }
        }
        let reject = reason => {
            if(this.status === 'pending'){
                this.status = 'rejected'
                this.reason = reason
                this.rejectedList.forEach(fn=> fn())
            }
        }
        try {
            executor(resolve,reject)
        }catch (err){
            reject(err)
        }
    }
    then(onFulfilled, onRejected){
        // 实现链式调用则需要返回的是一个Promise，同时判断
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value=> value
        onRejected = typeof onRejected === 'function' ? onRejected : err=> { throw Error(err)}
        return new Promise1((resolve, reject)=> {
            if(this.status === 'pending'){
                this.fulfilledList.push(()=> {
                    setTimeout(()=> {
                        try {
                            let x = onFulfilled(this.value)
                            x instanceof Promise1 ? x.then(resolve, reject) : resolve(x)
                        }
                        catch (err){
                            reject(err)
                        }
                    })
                })
                this.rejectedList.push(()=> {
                    setTimeout(()=> {
                        try {
                            let x = onRejected(this.reason)
                            typeof x instanceof Promise1 ? x.then(resolve,reject) : resolve(x)
                        }catch (err){
                            reject(err)
                        }
                    })
                })
            }
            if(this.status === 'fulfilled'){
                setTimeout(()=> {
                    try {
                        let x = onFulfilled(this.value)
                        x instanceof Promise1 ? x.then(resolve,reject) : resolve(x)
                    }catch (err){
                        reject(err)
                    }
                })
            }
            if(this.status === 'rejected'){
                setTimeout(()=> {
                    try {
                        let x = onRejected(this.reason)
                        x instanceof Promise1 ? x.then(resolve, reject) : resolve(x)
                    }catch (err){
                        reject(err)
                    }
                })
            }
        })
    }
    catch(onRejected){
        this.then(null, onRejected)
    }
    static resolve(value){
        if(value instanceof Promise1 ){
            return value
        } else {
            return new Promise1((resolve,reject)=> resolve(value))
        }
    }
    static reject(reason){
        return new Promise1((resolve, reject)=> reject(reason))
    }
    static finally(callback){
        return new Promise1(()=> {}).then(res=> {
            return Promise1.resolve(callback()).then(()=> res)
        }, err=> {
            return Promise1.resolve(callback()).then(()=> err)
        })
    }
    // 返回先成功的，或者所有的都失败后返回 AggregateError
    static any(promises){
        let errs = []
        let len = promises.length
        if(len === 0) return new AggregateError(errs)
        return new Promise1((resolve, reject)=> {
            promises.forEach((p, i)=> {
                Promise1.resolve(p).then(res=> {
                    resolve(res)
                } ,err=> {
                    len--
                    if(len === 0){
                        errs.push(err)
                        reject(new AggregateError(errs))
                    }
                })
            })
        })

    }
    // 等待搜有的promise都成功，或者有一个失败的则返回
    static all(promises){
        let result = []
        let count = 0;
        if(promises.length === 0) return Promise1.resolve([])
        return new Promise1((resolve,reject)=> {
            promises.forEach((p, i)=> {
                Promise1.resolve(p).then(item=> {
                    count += 1
                    result[i] = item
                    if(promises.length === count){
                       resolve(result)
                    }
                }).catch(reject)
            })
        })
    }
    // 返回最先执行的promise
    static race(promises){
        if(promises.length === 0) return Promise1.resolve([])
        return new Promise1((resolve, reject)=> {
            promises.forEach(p=> {
                Promise1.resolve(p).then(resolve).catch(reject)
            })
        })
    }
    // 执行所有的promise ，分别对应 status ，成功的value，失败的reason
    static allSettled(promises){
        // value
        // reason
        // status
        if(promises.length === 0) return Promise1.resolve([])
        let result = [], count = 0;
        return new Promise1((resolve, reject)=> {
            promises.forEach((p, i)=> {
                Promise1.resolve(p).then(res=> {
                    count++
                    result[i] = {
                        status: 'fulfilled',
                        value: res
                    }
                    if(count === promises.length){
                        resolve(result)
                    }
                }, err=> {
                   count++
                    result[i] = {
                       status: 'rejected',
                        reason: err
                    }
                    if(count === promises){
                        resolve(result)
                    }
                })
            })
        })
    }
}
//
// const p1 = new Promise1((resolve,reject)=> {
//     setTimeout(()=> {
//         resolve(1)
//     }, 1000)
//     setTimeout(()=> {
//         reject(2)
//     },100)
// })
// // p1.then(item=> {
// //     console.log(item)
// // }).catch(err=> {
// //     console.log(err)
// // })
// const p2 = new Promise1(resolve=> resolve('p2'))
// Promise1.any([p1, p2]).then(item=> {
//     console.log(item)
// }).catch(err=> {
//     console.log(err)
// })

/**
 * 浅拷贝
 * @param data 传入的拷贝数据
 * */
const shallowClone = data => {
    if(data===null) return null
    const result = Array.isArray(data) ? [] : {}
    for(let i in data){
        if(data.hasOwnProperty(i)){
            result[i] = data[i]
        }
    }
    return result
}
/**
 * 深拷贝 一般用来拷贝对象或者数组
 * @param data 要拷贝的数据
 * */
const deepClone = (data, maps = new WeakMap()) => {
    if(data===null) return null
    if(maps.get(data)){
        return data
    }
    const result = Array.isArray(data) ? [] : {}
    maps.set(data, true)
    for(let i in data){
        if(data.hasOwnProperty(i)){
            result[i] = typeof data[i] === 'object' ? deepClone(data[i],maps) : data[i]
        }
    }
    return result
}

// let obj = {
//     name: 1
// }
// console.log(obj)
// let objCopy = shallowClone(obj)
// obj.name = 222
// console.log(objCopy)

/**
 * 图片懒加载
 * @param imgList 懒加载的img NodeList <img data-src="真实地址">
 * */
const lazyLoadImgList = imgList => {
    imgList.forEach((item, i)=> {
        const tempRect = item.getBoundingClientRect()
        if(tempRect.top < window.innerHeight){
            tempRect.src = tempRect.dataset.src
        }
    })
}

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays1 = function(nums1, nums2) {
    if(nums1.length> nums2.length){
        let temp = nums1;
        nums1 = nums2;
        nums2 = temp;
    }
    let m = nums1.length;
    let n = nums2.length;
    // 分割线左边的数量等于 (m + n + 1) / 2
    let totalLeft = ((m + n + 1) / 2);
    // 满足以下条件：在 num1的区间中 [0, m]
    // 交叉小于等于， i - 1 代表 左边
    // nums1[i - 1] <=nums2[j] && nums2[j-1] <= nums1[i]
    let left = 0;
    let right = m;
    while(left < right){
        // 二分查找的思路就是在区间里任意查找一个位置，检测目标元素在这个位置的左边还是右边。
        // 选取了一个left => right 中间位置的下标。
        let i = (left + (right - left +1) / 2)
        let j = totalLeft - i;
        console.log(i)
        // 分割线在左边数组
        if(nums1[i-1] > nums2[j]){
            right = i - 1
        } else {
            left  = i
        }
    }
    let i = left;
    let j = totalLeft - i
    let nums1LeftMax = i === 0 ? Infinity: nums1[i-1];
    let num1RightMin = i === m ? -Infinity: nums1[i];
    let nums2LeftMax = j === 0 ? Infinity : nums2[j-1];
    let nums2RightMin = j ===n ? -Infinity :nums2[j];
    if((m+n) % 2 === 1){
        return Math.max(nums1LeftMax, nums2LeftMax)
    } else {
        return ((Math.max(nums1LeftMax, nums2LeftMax) + Math.min(num1RightMin, nums2RightMin))/2).toFixed(5)
    }
};
var findMedianSortedArrays = (nums1, nums2) => {
    let len1 = nums1.length, len2 = nums2.length
    if (len1 > len2) return findMedianSortedArrays(nums2, nums1)//对nums1和nums2中长度较小的二分
    console.log(nums1)
    let len = len1 + len2//总长
    let start = 0, end = len1 //进行二分的开始和结束位置
    let partLen1, partLen2

    while (start <= end) {
        partLen1 = (start + end) >> 1//nums1二分的位置
        partLen2 = ((len + 1) >> 1) - partLen1//nums2二分的位置
        //L1:nums1二分之后左边的位置，L2，nums1二分之后右边的位置
        //R1:nums2二分之后左边的位置，R2，nums2二分之后右边的位置

        //如果左边没字符了，就定义成-Infinity，让所有数都大于它，否则就是nums1二分的位置左边一个
        let L1 = partLen1 === 0 ? -Infinity : nums1[partLen1 - 1]
        //如果左边没字符了，就定义成-Infinity，让所有数都大于它，否则就是nums2二分的位置左边一个
        let L2 = partLen2 === 0 ? -Infinity : nums2[partLen2 - 1]
        //如果右边没字符了，就定义成Infinity，让所有数都小于它，否则就是nums1二分的位置
        let R1 = partLen1 === len1 ? Infinity : nums1[partLen1]
        //如果右边没字符了，就定义成Infinity，让所有数都小于它，否则就是nums1二分的位置
        let R2 = partLen2 === len2 ? Infinity : nums2[partLen2]

        if (L1 > R2) {//不符合交叉小于等于 继续二分
            end = partLen1 - 1
        } else if (L2 > R1) {//不符合交叉小于等于 继续二分
            start = partLen1 + 1
        } else { // L1 <= R2 && L2 <= R1 符合交叉小于等于
            return len % 2 === 0 ?
                (Math.max(L1, L2) + Math.min(R1, R2)) / 2 : //长度为偶数返回作左侧较大者和右边较小者和的一半
                Math.max(L1, L2)	//长度为奇数返回作左侧较大者
        }
    }
}
console.log(findMedianSortedArrays([0,0,1], [0,0]))
