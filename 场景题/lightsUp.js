// 下面来看一道比较典型的问题，通过这个问题来对比几种异步编程方法：
// 红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？
function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}


// 1. 回调函数解法
function task(light, time, cb) {
    setTimeout(() => {
        if (light === 'red') {
            red()
        } else if (light === 'green') {
            green()
        } else {
            yellow()
        }
        cb && cb()
    }, time)
}


const step = () => {
    task('red', 3000, () => {
        task('yellow', 2000, () => {
            // 递归实现交替亮灯
            task('green', 1000, step)
        })
    })
}
step()


// 2. promise
const task = (light, time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (light === 'red') {
                red()
            } else if (light === 'green') {
                green()
            } else {
                yellow()
            }
            resolve()
        }, time)
    })
}

const step = () => {
    task('red', 3000)
        .then(() => task('yellow', 2000))
        .then(() => task('green', 1000))
        .then(step)
}
step()


// 3. async/await
const taskRunner = async () => {
    await task('red', 3000)
    await task('yellow', 2000)
    await task('green', 1000)
    await taskRunner()
}
taskRunner()