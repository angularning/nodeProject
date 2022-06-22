#### instanceof用来判断数据类型

```js
举例：
console.log([1,2] instanceof Array)
const Person = function (name){
  return this.name
}
const xP = new Person()
console.log(xP instanceof Person)
```

代码实现

```js
const _instanceof1 = (value, type) => {
        let left = value.__proto__;
        let right = type.prototype;
        while (true){
            if(left === null){
                return false
            }
            if(left === right){
                return true
            }
            left = left.__proto__
        }
 }
```

