#### new用来

```
在new一个对象的时候都干了什么事情。
--创建一个空对象
--把空对象的__proto__绑定到构造函数的prototype
--绑定this
--返回结果：判断返回是在对象的原型上否
```

```js
const _new = fn => {
  let arg = [...arguments].slice(1)
  let obj = {}
  obj.__proto = fn.prototype
  let result = fn.apply(this, arg);
  return result instanceof Object ? result : obj
}
```

