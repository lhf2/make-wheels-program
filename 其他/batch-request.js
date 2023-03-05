/**
 * 实现一个批量请求函数 batchRequest(urls, limit)，要求最大并发数 limit，
 * 每当有一个请求返回，就留下一个空位，可以增加新的请求，
 * 所有请求完成后，结果按照 urls 里面的顺序依次打出。
 */
function batchRequest(urls, limit) {
    return new Promise((resolve, reject) => {
        let counter = 0
        let result = []
        const startRequest = () => {
            if(urls.length === 0) return
            const task = urls.shift()
            if (task) {
                fetch(task).then(res => {
                    result[counter] = res
                    if(counter === urls.length - 1){
                        // 最后一个任务
                        resolve(result)
                    }else{
                        // 启动下一个任务
                        counter++
                        // 递归
                        startRequest()
                    }
                })
            }
        }

        while (limit > 0) {
            startRequest()
            limit -= 1
        }
    })
}