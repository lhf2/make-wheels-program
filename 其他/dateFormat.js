// 实现日期格式化函数
function dateFormat(dateInput, format){
    const year = dateInput.getFullYear()
    const month = dateInput.getMonth() + 1
    const day = dateInput.getDate()
    return format.replace('yyyy', year).replace('MM', addZero(month)).replace('dd', addZero(day))
}

function addZero(val){
    return val < 10 ? `0${val}`: val
}

console.log(dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd')) // 2020/12/01
console.log(dateFormat(new Date('2020-04-01'), 'yyyy/MM/dd')) // 2020/04/01
console.log(dateFormat(new Date('2020-04-01'), 'yyyy年MM月dd日')) // 2020年04月01日