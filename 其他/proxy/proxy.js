const input = document.getElementById('input') 
const text = document.getElementById('text') 
const list = document.getElementById('list') 
const btn = document.getElementById('btn')
let render
const inputObj = new Proxy({}, { 
    get (target, key, receiver) { 
        return Reflect.get(target, key, receiver) 
    },
    set (target, key, value, receiver) { 
        if (key === 'text') { 
            input.value = value 
            text.innerHTML = value 
        }
        return Reflect.set(target, key, value, receiver) 
    } 
})
class Render { 
    constructor (arr) { 
        this.arr = arr 
    }
    init () { 
        const fragment = document.createDocumentFragment() 
        for (let i = 0; i < this.arr.length; i++) { 
            const li = document.createElement('li')
            li.textContent = this.arr[i] 
            fragment.appendChild(li) 
        }
        list.appendChild(fragment) 
    }
    addList (val) { 
        const li = document.createElement('li') 
        li.textContent = val 
        list.appendChild(li) 
    } 
}
const todoList = new Proxy([], { 
    get (target, key, receiver) { 
        return Reflect.get(target, key, receiver) 
    },
    set (target, key, value, receiver) { 
        if (key !== 'length') { 
            render.addList(value) 
        }
        return Reflect.set(target, key, value, receiver) 
    } 
})
window.onload = () => { 
    render = new Render([]) 
    render.init() 
}
input.addEventListener('keyup', e => { 
    inputObj.text = e.target.value 
})
btn.addEventListener('click', () => { 
    todoList.push(inputObj.text) 
    inputObj.text = '' 
})