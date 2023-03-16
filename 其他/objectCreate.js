// 实现 Object.create 
// Object.create() 方法用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype）

// 工厂模式
function create(obj){
    function F(){}
    F.prototype = obj
    return new F()
}

// 不太妥写法（每次都要创建一个新的对象，需要下方使用工厂模式）
// function create(obj){
//     let o = {}
//     o.prototype = obj
//     return o
// }
// let obj = {a:1}
// let obj1 = create(obj)
// let obj2 = create(obj)
// console.log(obj === obj2) // false



